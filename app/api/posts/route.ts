// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// --- HANDLER UNTUK GET REQUEST (Mengambil Feed) ---
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Baca query parameter 'feed'
    const { searchParams } = request.nextUrl;
    const feedType = searchParams.get("feed");

    let whereClause = {};

    // Jika user login dan memilih tab 'following'
    if (feedType === "following" && userId) {
      // 1. Dapatkan ID user yang di-follow
      const followedUsers = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      });
      const followedUserIds = followedUsers.map(
        (f: { followingId: string }) => f.followingId
      );

      // Jika user tidak follow siapa pun, kembalikan array kosong
      if (followedUserIds.length === 0) {
        return NextResponse.json([]);
      }

      // 2. Filter post berdasarkan ID user yang di-follow
      whereClause = {
        authorId: {
          in: followedUserIds,
        },
      };
    }
    // Untuk feed 'for-you' atau jika user tidak login, kita tidak perlu filter khusus

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        // Gunakan `select` untuk efisiensi dan keamanan
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            jobTitle: true,
            company: true,
          },
        },
        // Include relasi lain sesuai kebutuhan frontend
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            // content: true, // Removed because 'content' does not exist in the Comment model
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
        project: {
          include: {
            technologies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// --- HANDLER UNTUK POST REQUEST (Membuat Postingan Baru) ---

// Schema validasi menggunakan Zod
const createPostSchema = z.object({
  type: z.enum(["TEXT", "PHOTO", "PROJECT"]),
  textContent: z.string().max(1000).optional().nullable(),
  caption: z.string().max(1000).optional().nullable(),
  imageUrls: z.array(z.string().url()).optional(),
  projectId: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    // 1. Dapatkan sesi user untuk otentikasi & otorisasi
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }
    const authorId = session.user.id;

    // 2. Parse dan validasi body request
    const body = await request.json();
    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input.", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { type, textContent, caption, imageUrls, projectId } =
      validation.data;

    // 3. Siapkan data berdasarkan tipe post
    const data: {
      type: "TEXT" | "PHOTO" | "PROJECT";
      authorId: string;
      textContent?: string | null;
      caption?: string | null;
      imageUrls?: string[];
      projectId?: string | null;
    } = {
      type,
      authorId: authorId,
    };

    switch (type) {
      case "TEXT":
        if (!textContent || textContent.trim() === "") {
          return NextResponse.json(
            { error: "Text content is required for text posts." },
            { status: 400 }
          );
        }
        data.textContent = textContent;
        break;

      case "PHOTO":
        if (!imageUrls || imageUrls.length === 0) {
          return NextResponse.json(
            { error: "Photo posts must include at least one image." },
            { status: 400 }
          );
        }
        data.caption = caption || null;
        data.imageUrls = imageUrls;
        break;

      case "PROJECT":
        if (!projectId) {
          return NextResponse.json(
            { error: "Project ID is required for project posts." },
            { status: 400 }
          );
        }

        // Verifikasi bahwa project milik user yang sedang login
        const project = await prisma.project.findFirst({
          where: {
            id: projectId,
            authorId: authorId,
          },
        });

        if (!project) {
          return NextResponse.json(
            {
              error:
                "Project not found or you don't have permission to share it.",
            },
            { status: 404 }
          );
        }

        data.projectId = projectId;
        data.caption = caption || null;
        break;

      default:
        return NextResponse.json(
          { error: "Invalid post type" },
          { status: 400 }
        );
    }

    // 4. Buat post di database
    const newPost = await prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            jobTitle: true,
            company: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
        project: {
          include: {
            technologies: true,
          },
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while creating the post." },
      { status: 500 }
    );
  }
}

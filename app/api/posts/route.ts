// app/api/posts/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust import based on your prisma setup

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        project: true,
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
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

// Optional: Add POST method for creating posts
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const post = await prisma.post.create({
      data: {
        type: data.type,
        textContent: data.textContent,
        caption: data.caption,
        imageUrls: data.imageUrls || [],
        authorId: data.authorId,
        projectId: data.projectId,
      },
      include: {
        author: true,
        project: true,
        likes: true,
        comments: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

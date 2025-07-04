/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/projects/user-projects/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Pastikan path ini benar

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        authorId: session.user.id,
        isPublished: true, // Hanya tampilkan project yang sudah dipublish
      },
      include: {
        technologies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

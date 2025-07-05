// app/actions/userActions.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function completeUserProfile(username: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated." };
  }

  // Validasi sederhana
  if (!username || username.length < 3) {
    return { success: false, error: "Username is too short." };
  }

  try {
    // Cek apakah username sudah dipakai
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return { success: false, error: "Username is already taken." };
    }

    // Update user
    await prisma.user.update({
      where: { id: session.user.id },
      data: { username: username },
    });

    // Revalidasi path agar data di layout ter-update
    revalidatePath("/", "layout");

    return { success: true };
  } catch {
    return { success: false, error: "An error occurred." };
  }
}

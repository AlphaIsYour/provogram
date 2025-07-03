/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/setting/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

// === TYPES ===
interface ActionResponse {
  success: boolean;
  error?: string;
  message?: string;
  details?: Record<string, string[]>;
}

// === VALIDATION SCHEMAS ===

// Profile Settings Schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username too long")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscore, and dash"
    ),
  bio: z.string().max(500, "Bio too long").optional(),
  jobTitle: z.string().max(100, "Job title too long").optional(),
  company: z.string().max(100, "Company name too long").optional(),
  location: z.string().max(100, "Location too long").optional(),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  cvUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  phone: z.string().max(20, "Phone number too long").optional(),
  timezone: z.string().max(50, "Timezone too long").optional(),
  availability: z.string().max(200, "Availability too long").optional(),
  responseTime: z.string().max(100, "Response time too long").optional(),
  preferredContact: z.string().max(50, "Preferred contact too long").optional(),
});

// Account Settings Schema
const accountSchema = z
  .object({
    email: z.string().email("Invalid email").optional(),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      )
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

// Privacy Settings Schema
const privacySchema = z.object({
  openToWork: z.boolean().default(false),
  openToMentoring: z.boolean().default(false),
  openToCollaboration: z.boolean().default(false),
});

// Work Experience Schema
const workExperienceSchema = z.object({
  id: z.string().optional(),
  company: z
    .string()
    .min(1, "Company is required")
    .max(100, "Company name too long"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position too long"),
  type: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "FREELANCE",
    "INTERNSHIP",
  ]),
  location: z.string().max(100, "Location too long").optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().max(1000, "Description too long").optional(),
  achievements: z.string().optional(), // Will be split by newlines
  logoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// Education Schema
const educationSchema = z.object({
  id: z.string().optional(),
  institution: z
    .string()
    .min(1, "Institution is required")
    .max(100, "Institution name too long"),
  degree: z.string().min(1, "Degree is required").max(100, "Degree too long"),
  fieldOfStudy: z
    .string()
    .min(1, "Field of study is required")
    .max(100, "Field too long"),
  location: z.string().max(100, "Location too long").optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  gpa: z.string().max(10, "GPA too long").optional(),
  description: z.string().max(1000, "Description too long").optional(),
  logoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  status: z.enum(["GRADUATED", "IN_PROGRESS"]),
});

// === HELPER FUNCTIONS ===

async function verifyUser(userId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }
  return session;
}

// === PROFILE ACTIONS ===

export async function updateProfile(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = Object.fromEntries(formData);
    const validated = profileSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: "Invalid data",
        details: validated.error.flatten().fieldErrors,
      };
    }

    // Check username uniqueness
    if (validated.data.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: validated.data.username },
      });
      if (existingUser && existingUser.id !== session.user.id) {
        return { success: false, error: "Username already taken" };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: validated.data,
    });

    revalidatePath(`/${updatedUser.username}`);
    revalidatePath(`/${updatedUser.username}/setting`);

    return { success: true, message: "Profile updated successfully!" };
  } catch (error: any) {
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updatePrivacySettings(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = {
      openToWork: formData.get("openToWork") === "on",
      openToMentoring: formData.get("openToMentoring") === "on",
      openToCollaboration: formData.get("openToCollaboration") === "on",
    };

    const validated = privacySchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: validated,
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Privacy settings updated successfully!" };
  } catch (error: any) {
    console.error("Privacy settings update error:", error);
    return { success: false, error: "Failed to update privacy settings" };
  }
}

// === ACCOUNT ACTIONS ===

export async function updateAccount(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = Object.fromEntries(formData);
    const validated = accountSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: "Invalid data",
        details: validated.error.flatten().fieldErrors,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (!user.password) {
      return { success: false, error: "No password set for this account" };
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      validated.data.currentPassword,
      user.password
    );
    if (!isValidPassword) {
      return { success: false, error: "Current password is incorrect" };
    }

    const updateData: any = {};

    // Update email if provided
    if (validated.data.email && validated.data.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validated.data.email },
      });
      if (existingUser && existingUser.id !== session.user.id) {
        return { success: false, error: "Email already taken" };
      }
      updateData.email = validated.data.email;
      updateData.emailVerified = null; // Reset verification
    }

    // Update password if provided
    if (validated.data.newPassword) {
      updateData.password = await bcrypt.hash(validated.data.newPassword, 12);
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: updateData,
      });
    }

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Account updated successfully!" };
  } catch (error: any) {
    console.error("Account update error:", error);
    return { success: false, error: "Failed to update account" };
  }
}

// === WORK EXPERIENCE ACTIONS ===

export async function addWorkExperience(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = Object.fromEntries(formData);
    const validated = workExperienceSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: "Invalid data",
        details: validated.error.flatten().fieldErrors,
      };
    }

    const achievements = validated.data.achievements
      ? validated.data.achievements.split("\n").filter(Boolean)
      : [];

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.workExperience.create({
      data: {
        company: validated.data.company,
        position: validated.data.position,
        type: validated.data.type,
        location: validated.data.location,
        startDate: new Date(validated.data.startDate),
        endDate: validated.data.endDate
          ? new Date(validated.data.endDate)
          : null,
        description: validated.data.description,
        achievements,
        logoUrl: validated.data.logoUrl,
        userId: session.user.id,
      },
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Work experience added successfully!" };
  } catch (error: any) {
    console.error("Add work experience error:", error);
    return { success: false, error: "Failed to add work experience" };
  }
}

export async function updateWorkExperience(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = Object.fromEntries(formData);
    const validated = workExperienceSchema.safeParse(data);

    if (!validated.success || !validated.data.id) {
      return {
        success: false,
        error: "Invalid data",
        details: validated.error?.flatten().fieldErrors,
      };
    }

    const achievements = validated.data.achievements
      ? validated.data.achievements.split("\n").filter(Boolean)
      : [];

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.workExperience.update({
      where: {
        id: validated.data.id,
        userId: session.user.id, // Ensure user owns this record
      },
      data: {
        company: validated.data.company,
        position: validated.data.position,
        type: validated.data.type,
        location: validated.data.location,
        startDate: new Date(validated.data.startDate),
        endDate: validated.data.endDate
          ? new Date(validated.data.endDate)
          : null,
        description: validated.data.description,
        achievements,
        logoUrl: validated.data.logoUrl,
      },
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Work experience updated successfully!" };
  } catch (error: any) {
    console.error("Update work experience error:", error);
    return { success: false, error: "Failed to update work experience" };
  }
}

export async function deleteWorkExperience(
  experienceId: string
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.workExperience.delete({
      where: {
        id: experienceId,
        userId: session.user.id, // Ensure user owns this record
      },
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Work experience deleted successfully!" };
  } catch (error: any) {
    console.error("Delete work experience error:", error);
    return { success: false, error: "Failed to delete work experience" };
  }
}

// === EDUCATION ACTIONS ===

export async function addEducation(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = Object.fromEntries(formData);
    const validated = educationSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: "Invalid data",
        details: validated.error.flatten().fieldErrors,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.formalEducation.create({
      data: {
        institution: validated.data.institution,
        degree: validated.data.degree,
        fieldOfStudy: validated.data.fieldOfStudy,
        location: validated.data.location,
        startDate: new Date(validated.data.startDate),
        endDate: validated.data.endDate
          ? new Date(validated.data.endDate)
          : null,
        gpa: validated.data.gpa,
        description: validated.data.description,
        logoUrl: validated.data.logoUrl,
        status: validated.data.status,
        achievements: [],
        courses: [],
        userId: session.user.id,
      },
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Education added successfully!" };
  } catch (error: any) {
    console.error("Add education error:", error);
    return { success: false, error: "Failed to add education" };
  }
}

export async function updateEducation(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const data = Object.fromEntries(formData);
    const validated = educationSchema.safeParse(data);

    if (!validated.success || !validated.data.id) {
      return {
        success: false,
        error: "Invalid data",
        details: validated.error?.flatten().fieldErrors,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.formalEducation.update({
      where: {
        id: validated.data.id,
        userId: session.user.id, // Ensure user owns this record
      },
      data: {
        institution: validated.data.institution,
        degree: validated.data.degree,
        fieldOfStudy: validated.data.fieldOfStudy,
        location: validated.data.location,
        startDate: new Date(validated.data.startDate),
        endDate: validated.data.endDate
          ? new Date(validated.data.endDate)
          : null,
        gpa: validated.data.gpa,
        description: validated.data.description,
        logoUrl: validated.data.logoUrl,
        status: validated.data.status,
      },
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Education updated successfully!" };
  } catch (error: any) {
    console.error("Update education error:", error);
    return { success: false, error: "Failed to update education" };
  }
}

export async function deleteEducation(
  educationId: string
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.formalEducation.delete({
      where: {
        id: educationId,
        userId: session.user.id, // Ensure user owns this record
      },
    });

    revalidatePath(`/${user.username}/setting`);
    return { success: true, message: "Education deleted successfully!" };
  } catch (error: any) {
    console.error("Delete education error:", error);
    return { success: false, error: "Failed to delete education" };
  }
}

// === DELETE ACCOUNT ACTION ===

export async function deleteAccount(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const password = formData.get("password") as string;
    const confirmation = formData.get("confirmation") as string;

    if (confirmation !== "DELETE") {
      return { success: false, error: "Please type DELETE to confirm" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.password) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { success: false, error: "Invalid password" };
      }
    }

    // Delete user (CASCADE will handle related records)
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return { success: true, message: "Account deleted successfully" };
  } catch (error: any) {
    console.error("Delete account error:", error);
    return { success: false, error: "Failed to delete account" };
  }
}

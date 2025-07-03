/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const ContactFormSchema = z.object({
  senderName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  senderEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  recipientId: z.string().cuid({ message: "Invalid recipient ID." }),
});

export type State = {
  errors?: {
    senderName?: string[];
    senderEmail?: string[];
    subject?: string[];
    message?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function sendMessageAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = ContactFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to send message. Please check the fields.",
      success: false,
    };
  }

  try {
    await prisma.contactMessage.create({ data: validatedFields.data });
  } catch (error) {
    return {
      message: "Database Error: Failed to send message.",
      success: false,
    };
  }

  return { message: "Your message has been sent successfully!", success: true };
}

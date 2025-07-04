// app/classroom/enroll/[divisionSlug]/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Type for answers from client form
type UserAnswers = {
  [questionId: string]: string;
};

export async function submitTest(divisionId: string, userAnswers: UserAnswers) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  try {
    // Validate that user hasn't already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        divisionId: divisionId,
      },
    });

    if (existingEnrollment) {
      return { error: "You have already taken this test" };
    }

    // 1. Fetch all questions and their correct answers from database
    const questions = await prisma.question.findMany({
      where: { test: { divisionId: divisionId } },
    });

    if (questions.length === 0) {
      return { error: "No questions found for this test" };
    }

    // Validate that all questions have been answered
    const questionIds = questions.map((q) => q.id);
    const answeredQuestionIds = Object.keys(userAnswers);
    const missingAnswers = questionIds.filter(
      (id) => !answeredQuestionIds.includes(id)
    );

    if (missingAnswers.length > 0) {
      return { error: "Please answer all questions before submitting" };
    }

    let autoCorrectScore = 0;
    let hasEssay = false;
    const multipleChoiceQuestions = questions.filter(
      (q) => q.type === "MULTIPLE_CHOICE"
    );

    // 2. Create new enrollment entry for this user
    const newEnrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        divisionId: divisionId,
        status: "PENDING", // Initial status
      },
    });

    // 3. Process each user answer for grading and storage
    const answerPromises = Object.entries(userAnswers).map(
      async ([questionId, userAnswerContent]) => {
        const question = questions.find((q) => q.id === questionId);
        if (!question) {
          throw new Error(`Question ${questionId} not found`);
        }

        let isCorrect: boolean | null = null;

        if (question.type === "MULTIPLE_CHOICE") {
          isCorrect = question.correctAnswer === userAnswerContent;
          if (isCorrect) {
            autoCorrectScore += 1;
          }
        } else if (question.type === "ESSAY") {
          hasEssay = true;
          // Essays need manual review, so isCorrect remains null
        }

        return prisma.answer.create({
          data: {
            content: userAnswerContent,
            isCorrect: isCorrect,
            questionId: question.id,
            enrollmentId: newEnrollment.id,
          },
        });
      }
    );

    await Promise.all(answerPromises);

    // 4. Determine final status and calculate score
    let finalStatus: "PASSED" | "FAILED" | "AWAITING_REVIEW" = "PASSED";
    let finalScore = 0;

    if (multipleChoiceQuestions.length > 0) {
      finalScore = Math.round(
        (autoCorrectScore / multipleChoiceQuestions.length) * 100
      );

      // Define passing score (you can adjust this threshold)
      const passingScore = 70;

      if (finalScore < passingScore) {
        finalStatus = "FAILED";
      } else if (hasEssay) {
        finalStatus = "AWAITING_REVIEW"; // Has essays that need manual review
      } else {
        finalStatus = "PASSED"; // Auto-pass for multiple choice only
      }
    } else if (hasEssay) {
      finalStatus = "AWAITING_REVIEW"; // Only essays, needs manual review
    }

    // 5. Update enrollment with final status and score
    await prisma.enrollment.update({
      where: { id: newEnrollment.id },
      data: {
        status: finalStatus,
        testScore: finalScore,
      },
    });

    // 6. If user passed without needing review, update their role
    if (finalStatus === "PASSED") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: "STUDENT" },
      });
    }

    // 7. Log the enrollment for admin tracking
    console.log(
      `Test submitted - User: ${session.user.id}, Division: ${divisionId}, Status: ${finalStatus}, Score: ${finalScore}%`
    );
  } catch (error) {
    console.error("Failed to submit test:", error);
    return {
      error: "An error occurred while submitting your test. Please try again.",
    };
  }

  // 8. Revalidate path and redirect based on result
  revalidatePath("/classroom");
  redirect("/classroom/success");
}

// Helper function to get test statistics (optional - for admin use)
export async function getTestStatistics(divisionId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  try {
    const stats = await prisma.enrollment.groupBy({
      by: ["status"],
      where: { divisionId },
      _count: { status: true },
    });

    const totalSubmissions = await prisma.enrollment.count({
      where: { divisionId },
    });

    const averageScore = await prisma.enrollment.aggregate({
      where: {
        divisionId,
        testScore: { not: null },
      },
      _avg: { testScore: true },
    });

    return {
      stats,
      totalSubmissions,
      averageScore: averageScore._avg.testScore || 0,
    };
  } catch (error) {
    console.error("Failed to get test statistics:", error);
    return { error: "Failed to retrieve statistics" };
  }
}

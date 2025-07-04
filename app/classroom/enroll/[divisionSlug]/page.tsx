/* eslint-disable @typescript-eslint/no-unused-vars */
// app/classroom/enroll/[divisionSlug]/page.tsx

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Clock, BookOpen } from "lucide-react";
import TestForm from "./components/TestForm";

export default async function EnrollmentTestPage({
  params,
}: {
  params: Promise<{ divisionSlug: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  // Fix: Await params before using its properties
  const { divisionSlug } = await params;

  // 1. Convert slug to proper division name (e.g., 'web-development' -> 'Web Development')
  const divisionName = divisionSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // 2. Check if user has already enrolled in this division
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId: session.user.id,
      division: {
        name: divisionName,
      },
    },
  });

  if (existingEnrollment) {
    let message = "You have already participated in this enrollment test.";
    let statusColor = "text-yellow-400";
    let statusIcon = "⏳";

    if (existingEnrollment.status === "PASSED") {
      message = "You are already a member of this division.";
      statusColor = "text-green-400";
      statusIcon = "✅";
    } else if (existingEnrollment.status === "AWAITING_REVIEW") {
      message = "Your submission is currently under review.";
      statusColor = "text-blue-400";
      statusIcon = "👀";
    } else if (existingEnrollment.status === "FAILED") {
      message = "Unfortunately, you did not pass the enrollment test.";
      statusColor = "text-red-400";
      statusIcon = "❌";
    }

    return (
      <div className="max-w-2xl mx-auto py-20">
        <div className="text-center bg-[#161B22] rounded-lg border border-gray-800 p-8">
          <div className="text-6xl mb-4">{statusIcon}</div>
          <h1 className={`text-2xl font-bold mb-4 ${statusColor}`}>
            {message}
          </h1>
          <p className="text-gray-400 mb-6">
            Division:{" "}
            <span className="font-semibold text-white">{divisionName}</span>
          </p>
          {existingEnrollment.testScore && (
            <p className="text-gray-400 mb-6">
              Test Score:{" "}
              <span className="font-semibold text-white">
                {existingEnrollment.testScore}%
              </span>
            </p>
          )}
          <Link
            href="/classroom"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classroom
          </Link>
        </div>
      </div>
    );
  }

  // 3. Fetch division with test and questions
  const divisionWithTest = await prisma.division.findUnique({
    where: { name: divisionName },
    include: {
      onboardingTest: {
        include: {
          questions: {
            // IMPORTANT: Never send 'correctAnswer' to client
            select: {
              id: true,
              text: true,
              type: true,
              options: true,
            },
            orderBy: { id: "asc" },
          },
        },
      },
    },
  });

  if (!divisionWithTest || !divisionWithTest.onboardingTest) {
    return (
      <div className="max-w-2xl mx-auto py-20">
        <div className="text-center bg-[#161B22] rounded-lg border border-gray-800 p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">
            Test Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The enrollment test for &quot;{divisionName}&quot; division is not
            available.
          </p>
          <Link
            href="/classroom"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classroom
          </Link>
        </div>
      </div>
    );
  }

  const { onboardingTest } = divisionWithTest;
  const questionCount = onboardingTest.questions.length;
  const multipleChoiceCount = onboardingTest.questions.filter(
    (q) => q.type === "MULTIPLE_CHOICE"
  ).length;
  const essayCount = onboardingTest.questions.filter(
    (q) => q.type === "ESSAY"
  ).length;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href="/classroom"
          className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center">
            <FileText className="w-7 h-7 mr-3 text-blue-400" />
            {divisionWithTest.name} Enrollment Test
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Complete the test below to join the division. Good luck!
          </p>
        </div>
      </div>

      {/* Test Information Card */}
      <div className="bg-[#161B22] rounded-lg border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
          Test Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-400">Total Questions:</span>
            <span className="font-semibold">{questionCount}</span>
          </div>
          {multipleChoiceCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-400">Multiple Choice:</span>
              <span className="font-semibold">{multipleChoiceCount}</span>
            </div>
          )}
          {essayCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-400">Essay:</span>
              <span className="font-semibold">{essayCount}</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 p-4 bg-[#0D1117] rounded-lg border border-gray-700">
          <h3 className="font-semibold mb-2 text-yellow-400">
            📝 Instructions:
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Answer all questions to submit the test</li>
            <li>• Multiple choice questions are auto-graded</li>
            {essayCount > 0 && <li>• Essay questions require manual review</li>}
            <li>• You can only take this test once</li>
            <li>• Make sure your answers are complete before submitting</li>
          </ul>
        </div>
      </div>

      {/* Test Form */}
      <TestForm
        questions={onboardingTest.questions}
        divisionId={divisionWithTest.id}
      />
    </div>
  );
}

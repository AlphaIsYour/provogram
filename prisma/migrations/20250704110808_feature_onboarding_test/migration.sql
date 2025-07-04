-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'ESSAY');

-- AlterEnum
ALTER TYPE "EnrollmentStatus" ADD VALUE 'AWAITING_REVIEW';

-- CreateTable
CREATE TABLE "OnboardingTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,

    CONSTRAINT "OnboardingTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "options" JSONB,
    "correctAnswer" TEXT,
    "testId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN,
    "essayScore" INTEGER,
    "essayFeedback" TEXT,
    "questionId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingTest_divisionId_key" ON "OnboardingTest"("divisionId");

-- CreateIndex
CREATE INDEX "Question_testId_idx" ON "Question"("testId");

-- CreateIndex
CREATE INDEX "Answer_enrollmentId_idx" ON "Answer"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_enrollmentId_key" ON "Answer"("questionId", "enrollmentId");

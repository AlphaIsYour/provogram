// app/classroom/enroll/[divisionSlug]/components/TestForm.tsx
"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitTest } from "../actions";
import { Question } from "@prisma/client";
import { Loader2, CheckCircle, Circle, AlertCircle } from "lucide-react";

// Type for questions received from Server Component
type QuestionForClient = Pick<Question, "id" | "text" | "type" | "options">;

interface TestFormProps {
  questions: QuestionForClient[];
  divisionId: string;
}

// Submit button with loading status
function SubmitButton({
  disabled,
  progress,
}: {
  disabled: boolean;
  progress: number;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-0 bg-[#0D1117] border-t border-gray-800 p-6 -mx-8 -mb-8 rounded-b-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-400">
            Progress: {Math.round(progress)}% completed
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {!disabled && <CheckCircle className="w-5 h-5 text-green-400" />}
      </div>

      <button
        type="submit"
        disabled={pending || disabled}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            <span>Submitting Test...</span>
          </>
        ) : (
          <>
            <span>Submit Test</span>
            {disabled && <AlertCircle className="w-5 h-5 text-yellow-400" />}
          </>
        )}
      </button>

      {disabled && (
        <p className="text-sm text-yellow-400 mt-2 text-center">
          Please answer all questions before submitting
        </p>
      )}
    </div>
  );
}

export default function TestForm({ questions, divisionId }: TestFormProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Handler for form submission that matches the expected signature
  const handleFormAction = async (formData: FormData) => {
    // Reconstruct answers from formData
    const formAnswers: { [key: string]: string } = {};
    questions.forEach((q) => {
      const value = formData.get(q.id);
      if (typeof value === "string") {
        formAnswers[q.id] = value;
      }
    });
    await submitTest(divisionId, formAnswers);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <form
      action={handleFormAction}
      className="bg-[#161B22] rounded-lg border border-gray-800 p-8 space-y-8 relative"
    >
      {questions.map((q, index) => {
        const isAnswered = answers[q.id] !== undefined;

        return (
          <div
            key={q.id}
            className={`border-b border-gray-700 pb-8 transition-all duration-200 ${
              isAnswered
                ? "bg-green-900/10 border-green-800/50 rounded-lg p-6 -m-2"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 mt-1">
                {isAnswered ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-blue-400">
                    Question {index + 1}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                    {q.type === "MULTIPLE_CHOICE" ? "Multiple Choice" : "Essay"}
                  </span>
                </div>
                <label className="block text-lg font-semibold text-gray-200">
                  {q.text}
                </label>
              </div>
            </div>

            {q.type === "MULTIPLE_CHOICE" &&
              q.options &&
              typeof q.options === "object" &&
              !Array.isArray(q.options) && (
                <div className="space-y-3 ml-9">
                  {Object.entries(q.options).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-3 p-4 bg-[#0D1117] rounded-lg border border-gray-700 hover:bg-[#1C2128] has-[:checked]:bg-blue-900/30 has-[:checked]:border-blue-600 cursor-pointer transition-all duration-200"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={key}
                        onChange={(e) =>
                          handleAnswerChange(q.id, e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-300">{String(value)}</span>
                    </label>
                  ))}
                </div>
              )}

            {q.type === "ESSAY" && (
              <div className="ml-9">
                <textarea
                  name={q.id}
                  rows={6}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg p-4 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                  placeholder="Type your detailed answer here..."
                />
                <div className="mt-2 text-sm text-gray-400">
                  💡 Tip: Provide a comprehensive answer with examples and
                  explanations
                </div>
              </div>
            )}
          </div>
        );
      })}

      <SubmitButton disabled={!allQuestionsAnswered} progress={progress} />
    </form>
  );
}

// app/classroom/success/page.tsx

import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";
import Navbar from "@/app/components/layout/Navbar";

export default function EnrollmentSuccessPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center bg-[#161B22] p-10 rounded-lg border border-gray-800 max-w-lg mx-auto">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Submission Successful!</h1>
          <p className="text-gray-400 mb-6">
            Your enrollment test has been submitted. If your test includes essay
            questions, a mentor will review it shortly.
          </p>
          <div className="bg-[#0D1117] p-4 rounded-lg border border-gray-700 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <p className="text-yellow-300">
                Please check back later for the result.
              </p>
            </div>
          </div>
          <Link
            href="/classroom"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Back to Classroom
          </Link>
        </div>
      </div>
    </>
  );
}

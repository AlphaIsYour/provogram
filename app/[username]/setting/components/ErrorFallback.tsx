// components/ErrorFallback.tsx
"use client";

import { AlertTriangle } from "lucide-react";

export default function ErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-400 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-300 mb-4">
          {error.message ||
            "An unexpected error occurred while loading the settings page."}
        </p>
        <button
          onClick={resetError}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

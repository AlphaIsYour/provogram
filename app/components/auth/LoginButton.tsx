// app/components/auth/LoginButton.tsx
"use client";

import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

export const LoginButton = () => {
  return (
    <button
      // TAMBAHKAN INI: callbackUrl
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
    >
      <LogIn size={18} />
      Login dengan Google
    </button>
  );
};

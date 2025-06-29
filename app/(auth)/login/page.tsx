"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-[#0D1117]"
      style={{ fontFamily: "mona-sans" }}
    >
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-8 flex items-center justify-center">
          <Image
            src="/icon.png"
            alt="Logo"
            width={96}
            height={96}
            className="rounded-full"
          />
        </div>
        <div className="bg-[#151B23] p-8 border-2 border-gray-500 rounded-lg shadow-md w-96">
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-[#0D1117] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2 text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 bg-[#0D1117] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
        <div className="bg-[#151B23] mt-5 p-8 border-2 border-gray-500 rounded-lg shadow-md w-96">
          <p className="text-white text-sm mb-4 text-center">
            Belum punya akun?{" "}
            <Link className="text-blue-600" href="/signup">
              Daftar sekarang!
            </Link>
          </p>
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Atau
          </h2>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-[#0D1117] border border-gray-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Image src="/google.png" alt="Google Icon" width={24} height={24} />
            Login dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}

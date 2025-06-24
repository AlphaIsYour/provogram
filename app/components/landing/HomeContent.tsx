// app/components/landing/HomeContent.tsx
import { LoginButton } from "@/app/components/auth/LoginButton";

export default function HomeContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Bagikan Karyamu.
          <br />
          Inspirasi Duniamu.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Provogram adalah platform untuk para kreator digital, developer, dan
          desainer untuk memamerkan proyek, berbagi kode, dan berkolaborasi.
        </p>
        <LoginButton />
      </div>
    </div>
  );
}

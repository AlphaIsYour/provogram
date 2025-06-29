// app/[username]/page.tsx

import prisma from "@/lib/prisma"; // Pastikan path ini benar
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar"; // Atau taruh di layout jika perlu

// 'params' akan berisi segmen dinamis dari URL, yaitu { username: 'Yoralph' }
export default async function ProfilePage(props: {
  params: { username: string };
}) {
  const params = await props.params;
  // 1. Ambil data user dari database berdasarkan username di URL
  const user = await prisma.user.findUnique({
    where: {
      // Kita butuh menambahkan field 'username' ke skema User
      // dan pastikan itu unik
      username: params.username,
    },
    // Ambil juga proyek-proyek yang dibuat oleh user ini
    // include: {
    //   projects: true,
    // }
  });

  // 2. Jika user tidak ditemukan, tampilkan halaman 404
  if (!user) {
    notFound();
  }

  // 3. Jika user ditemukan, render halaman profilnya
  return (
    <>
      <Navbar />
      <div className="bg-[#0D1117] min-h-screen text-white">
        <div className="container mx-auto p-4 pt-24">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-10">
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User"}
              width={150}
              height={150}
              className="rounded-full border-4 border-gray-700"
            />
            <div>
              <h1 className="text-4xl font-bold">{user.name}</h1>
              <h2 className="text-2xl text-gray-400">@{user.username}</h2>
              <p className="mt-2 max-w-lg">
                Bio pengguna akan ada di sini. Saat ini kita belum punya field
                bio di database, tapi nanti bisa ditambahkan.
              </p>
            </div>
          </div>

          {/* Daftar Proyek User */}
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-800 pb-2 mb-4">
              Proyek
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Nanti di sini kita akan map project user */}
              <div className="bg-gray-900 p-4 rounded-lg">Proyek 1</div>
              <div className="bg-gray-900 p-4 rounded-lg">Proyek 2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

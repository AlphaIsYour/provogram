import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CertificatesClientPage from "./CertificatesClientPage"; // Import komponen client kita

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    notFound();
  }

  // Ambil semua data yang dibutuhkan di sini, di server
  const initialCertificates = await prisma.certificate.findMany({
    where: { userId: user.id },
    include: {
      category: true,
      skills: true,
    },
    orderBy: {
      completionDate: "desc",
    },
  });

  const initialCategories = await prisma.certificateCategory.findMany({
    include: {
      _count: {
        select: { certificates: { where: { userId: user.id } } },
      },
    },
  });

  // Render komponen client dan kirim data sebagai props
  return (
    <CertificatesClientPage
      user={user}
      initialCertificates={initialCertificates}
      initialCategories={initialCategories}
    />
  );
}

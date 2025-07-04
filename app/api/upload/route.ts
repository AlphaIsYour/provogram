// app/api/upload/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  // `request.blob()` tidak standar, jadi kita pakai `request.body`
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json(
      { message: "No filename or file body provided." },
      { status: 400 }
    );
  }

  // Unggah file ke Vercel Blob
  const blob = await put(filename, request.body, {
    access: "public",
  });

  // Kembalikan respons dengan URL file yang sudah di-upload
  return NextResponse.json(blob);
}

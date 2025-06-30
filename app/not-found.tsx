"use client";
import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
    >
      {children}
    </button>
  );
};

const NotFoundPage: React.FC = () => {
  const handleGoBack = (): void => {
    window.history.back();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#0A0E16", fontFamily: "mona-sans" }}
    >
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Halaman tidak ditemukan
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
        <Button onClick={handleGoBack}>Kembali</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

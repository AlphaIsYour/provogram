/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // WAJIB: Mengubah ini menjadi Client Component

import { useState, useMemo, useEffect } from "react";
import type {
  Prisma,
  User,
  Certificate,
  CertificateCategory,
  Skill,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calendar,
  Building,
  ExternalLink,
  Star,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  Eye,
  BookOpen,
  GraduationCap,
  Shield,
  BadgeCheck,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { IconRenderer } from "./IconRenderer";

// Mendefinisikan tipe data yang lebih lengkap untuk sertifikat
type FullCertificate = Certificate & {
  category: CertificateCategory;
  skills: Skill[];
};

// Helper Functions (tidak ada perubahan)
const formatDate = (date: Date | null) => {
  if (!date) return "N/A";
  return format(date, "MMM dd, yyyy");
};

const getStatus = (cert: { expiryDate: Date | null; isVerified: boolean }) => {
  if (!cert.isVerified)
    return {
      text: "Unverified",
      color: "text-gray-400 bg-gray-900/20 border-gray-500",
    };
  if (!cert.expiryDate)
    return {
      text: "Active",
      color: "text-green-400 bg-green-900/20 border-green-500",
    };
  const now = new Date();
  const expiry = cert.expiryDate;
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(now.getMonth() + 6);
  if (expiry < now)
    return {
      text: "Expired",
      color: "text-red-400 bg-red-900/20 border-red-500",
    };
  if (expiry < sixMonthsFromNow)
    return {
      text: "Expiring Soon",
      color: "text-yellow-400 bg-yellow-900/20 border-yellow-500",
    };
  return {
    text: "Active",
    color: "text-green-400 bg-green-900/20 border-green-500",
  };
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "BEGINNER":
      return "text-green-400 bg-green-900/20";
    case "INTERMEDIATE":
      return "text-yellow-400 bg-yellow-900/20";
    case "ADVANCED":
      return "text-red-400 bg-red-900/20";
    case "PROFESSIONAL":
      return "text-purple-400 bg-purple-900/20";
    case "FOUNDATIONAL":
      return "text-blue-400 bg-blue-900/20";
    default:
      return "text-gray-400 bg-gray-900/20";
  }
};

// Komponen Utama
export default function CertificatesClientPage({
  user,
  initialCertificates,
  initialCategories,
}: {
  user: User;
  initialCertificates: FullCertificate[];
  initialCategories: (CertificateCategory & {
    _count: { certificates: number };
  })[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCertificates = useMemo(() => {
    return initialCertificates.filter((cert) => {
      const searchMatch =
        searchQuery.toLowerCase() === "" ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const categoryMatch =
        !activeCategory || cert.categoryId === activeCategory;

      return searchMatch && categoryMatch;
    });
  }, [searchQuery, activeCategory, initialCertificates]);

  const certStats = {
    totalCertificates: initialCertificates.length,
    verifiedCertificates: initialCertificates.filter((c) => c.isVerified)
      .length,
    activeCertificates: initialCertificates.filter(
      (c) => getStatus(c).text === "Active"
    ).length,
    expiringSoon: initialCertificates.filter(
      (c) => getStatus(c).text === "Expiring Soon"
    ).length,
    totalSkillHours: initialCertificates.reduce(
      (sum, cert) => sum + (cert.hours || 0),
      0
    ),
  };

  const recentCertificates = initialCertificates.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-4">
          <Link
            href={`/${user.username}`}
            className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-[18px] sm:text[18px] font-bold flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
              Certificates & Credentials
            </h1>
            <p className="text-gray-400 text-[10px] sm:text-[14px] mt-1">
              {user.name}&apos;s professional certifications and learning
              achievements
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] w-[13vh] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-[18px] sm:text[18px] font-bold text-green-400">
              {certStats.totalCertificates}
            </div>
            <div className="text-[10px] sm:text-[14px] text-gray-400">
              Total Certificates
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-700 mb-3"
              />
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-gray-400">@{user.username}</p>
            </div>
            <div className="space-y-2 grid grid-cols-2 sm:grid-cols-1 gap-2">
              <div className="bg-[#0D1117] h-[12vh] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Verified</span>
                  <BadgeCheck className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xl font-bold text-green-400">
                  {certStats.verifiedCertificates}
                </div>
              </div>
              <div className="bg-[#0D1117] h-[12vh] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Active</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-blue-400">
                  {certStats.activeCertificates}
                </div>
              </div>
              <div className="bg-[#0D1117] h-[12vh] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] sm:text-[14px] text-gray-400">
                    Expiring Soon
                  </span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-xl font-bold text-yellow-400">
                  {certStats.expiringSoon}
                </div>
              </div>
              <div className="bg-[#0D1117] h-[12vh] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Skill Hours</span>
                  <BookOpen className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-bold text-purple-400">
                  {certStats.totalSkillHours}h
                </div>
              </div>
            </div>
            {recentCertificates.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Recent
                </h3>
                <div className="space-y-3">
                  {recentCertificates.map((cert) => (
                    <div key={cert.id} className="bg-[#0D1117] p-3 rounded-lg">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-full ${
                            cert.category.color || "bg-blue-500"
                          } mr-3`}
                        >
                          <IconRenderer
                            iconName={cert.icon}
                            className="w-4 h-4 text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold line-clamp-1">
                            {cert.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {cert.issuer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, issuer, or skill..."
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !activeCategory
                    ? "bg-gray-900 border border-gray-400 text-white"
                    : "bg-[#0D1117] text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                All ({initialCertificates.length})
              </button>
              {initialCategories.map(
                (category) =>
                  category._count.certificates > 0 && (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? "bg-gray-900 text-white border border-gray-400"
                          : "bg-[#0D1117] text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      {category.name} ({category._count.certificates})
                    </button>
                  )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredCertificates.map((cert) => {
              const status = getStatus(cert);
              return (
                <div
                  key={cert.id}
                  className="bg-[#161B22] rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                        <div className="flex items-center">
                          <div
                            className={`p-3 rounded-full ${
                              cert.category.color || "bg-blue-500"
                            } mr-4`}
                          >
                            <IconRenderer
                              iconName={cert.icon}
                              className="w-6 h-6 text-white"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {cert.title}
                            </h3>
                            <div className="flex items-center text-gray-400 mb-2">
                              <Building className="w-4 h-4 mr-1" />
                              <span>{cert.issuer}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm flex-wrap">
                              <div
                                className={`px-2 py-1 rounded-full border text-xs ${status.color}`}
                              >
                                {status.text}
                              </div>
                              <div
                                className={`px-2 py-1 rounded-full text-xs ${getLevelColor(
                                  cert.level
                                )}`}
                              >
                                {cert.level.charAt(0) +
                                  cert.level.slice(1).toLowerCase()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {cert.description && (
                        <p className="text-gray-300 mb-4">{cert.description}</p>
                      )}
                      {cert.skills.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">
                            Skills Covered
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-3 py-1 bg-[#0D1117] text-gray-300 rounded-full text-sm border border-gray-700"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {cert.hours && (
                          <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                            <Clock className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                            <div className="text-sm font-semibold">
                              {cert.hours}h
                            </div>
                            <div className="text-xs text-gray-400">Hours</div>
                          </div>
                        )}
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <BookOpen className="w-4 h-4 mx-auto mb-1 text-green-400" />
                          <div className="text-sm font-semibold">
                            {cert.skills.length}
                          </div>
                          <div className="text-xs text-gray-400">Skills</div>
                        </div>
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <Calendar className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                          <div className="text-sm font-semibold">
                            {formatDate(cert.completionDate)}
                          </div>
                          <div className="text-xs text-gray-400">Completed</div>
                        </div>
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <Shield className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                          <div className="text-sm font-semibold">
                            {formatDate(cert.expiryDate)}
                          </div>
                          <div className="text-xs text-gray-400">Expires</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {cert.badgeUrl && (
                          <Link
                            href={cert.badgeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Badge
                          </Link>
                        )}
                        {cert.verificationUrl && (
                          <Link
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-[#0D1117] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Verify
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 text-center h-full flex flex-col justify-center">
                        <div className="mb-4">
                          {cert.badgeUrl ? (
                            <Image
                              src={cert.badgeUrl}
                              alt={`${cert.title} badge`}
                              width={80}
                              height={80}
                              className="rounded-lg mx-auto mb-3 object-contain"
                            />
                          ) : (
                            <div
                              className={`p-4 rounded-full ${
                                cert.category.color || "bg-blue-500"
                              } mx-auto w-fit mb-3`}
                            >
                              <IconRenderer
                                iconName={cert.icon}
                                className="w-8 h-8 text-white"
                              />
                            </div>
                          )}
                          <h4 className="font-bold text-white mb-1">
                            {cert.title}
                          </h4>
                          <p className="text-gray-400 text-sm">{cert.issuer}</p>
                        </div>
                        {cert.credentialId && (
                          <div className="border-t border-gray-700 pt-4">
                            <p className="text-xs text-gray-400 mb-2">
                              Credential ID
                            </p>
                            <p className="text-xs font-mono text-gray-300 break-all">
                              {cert.credentialId}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredCertificates.length === 0 && (
              <div className="bg-[#161B22] rounded-lg p-10 border border-gray-800 text-center col-span-1">
                <X className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white">
                  No Certificates Found
                </h3>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

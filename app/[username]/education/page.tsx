/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/education/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Code,
  Clock,
  Target,
  Trophy,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Brain,
  Monitor,
} from "lucide-react";
import { format } from "date-fns";

// Helper untuk format tanggal, lebih aman dengan pengecekan null
const formatDate = (date: Date | null) => {
  if (!date) return "Present";
  return format(date, "MMM yyyy");
};

export default async function EducationPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      formalEducations: {
        orderBy: { startDate: "desc" },
      },
      onlineCourses: {
        orderBy: { completedDate: "desc" },
        include: {
          skills: true,
        },
      },
      certificates: {
        orderBy: { completionDate: "desc" },
        include: {
          category: true,
        },
      },
      skillAreas: {
        orderBy: { proficiency: "desc" },
      },
      learningGoals: {
        orderBy: { progress: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  // Kalkulasi Statistik Pembelajaran dari data database
  const completedCourses = user.onlineCourses.filter(
    (c) => c.status === "GRADUATED"
  );
  const totalHoursFromCerts = user.certificates.reduce(
    (sum, cert) => sum + (cert.hours || 0),
    0
  );

  const grades = completedCourses
    .map((c) => (c.grade ? parseInt(c.grade.replace("%", "")) : 0))
    .filter((g) => !isNaN(g) && g > 0);

  const averageGrade =
    grades.length > 0
      ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length)
      : 0;

  const learningStats = {
    totalCourses: user.onlineCourses.length,
    completedCourses: completedCourses.length,
    inProgressCourses: user.onlineCourses.length - completedCourses.length,
    totalHours: totalHoursFromCerts, // ANOMALI: Hanya dari sertifikat, bukan kursus
    certificates: user.certificates.length,
    averageGrade: averageGrade, // ANOMALI: Berdasarkan parsing string
    streak: user.streak || 0,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-4">
          <Link
            href={`/${username}`}
            className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
              Education & Learning
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {user.name}&apos;s educational background and continuous learning
              journey
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">
              {learningStats.completedCourses}+
            </div>
            <div className="text-sm text-gray-400">Courses Completed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Formal Education */}
          {user.formalEducations.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Formal Education
              </h2>
              <div className="space-y-8">
                {user.formalEducations.map((edu, index) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-[#161B22] z-10"></div>
                    {index < user.formalEducations.length - 1 && (
                      <div className="absolute left-2 top-4 w-0.5 h-full bg-gray-700 -ml-0.5"></div>
                    )}
                    <div className="ml-8 bg-[#0D1117] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                            {edu.logoUrl ? (
                              <Image
                                src={edu.logoUrl || "/icon.png"}
                                alt={`${edu.institution} logo`}
                                width={40}
                                height={40}
                                className="rounded"
                              />
                            ) : (
                              <GraduationCap className="w-6 h-6 text-green-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-blue-400">
                              {edu.degree}
                            </h3>
                            <p className="text-lg text-gray-300">
                              {edu.institution}
                            </p>
                            <p className="text-gray-400">{edu.fieldOfStudy}</p>
                            <div className="flex items-center text-gray-400 text-sm mt-1 flex-wrap">
                              {edu.location && (
                                <>
                                  <MapPin className="w-4 h-4 mr-1" />
                                  <span className="mr-4">{edu.location}</span>
                                </>
                              )}
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>
                                {formatDate(edu.startDate)} -{" "}
                                {formatDate(edu.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto">
                          <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                            {edu.status === "GRADUATED"
                              ? "Graduated"
                              : "In Progress"}
                          </div>
                          {edu.gpa && (
                            <div className="text-gray-400 text-sm mt-1">
                              GPA: {edu.gpa}
                            </div>
                          )}
                        </div>
                      </div>

                      {edu.description && (
                        <p className="text-gray-300 mb-4">{edu.description}</p>
                      )}

                      {edu.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
                            <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                            Achievements
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {edu.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-gray-300"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {edu.courses.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-purple-400" />
                            Relevant Coursework
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course) => (
                              <span
                                key={course}
                                className="text-xs bg-gray-800 text-blue-300 px-3 py-1 rounded-full border border-gray-700"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Online Courses */}
          {user.onlineCourses.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h2 className="text-xl font-semibold flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  Online Courses
                </h2>
                <div className="text-sm bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                  {learningStats.completedCourses}/{learningStats.totalCourses}{" "}
                  Completed
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.onlineCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#0D1117] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-blue-400 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {course.provider}
                        </p>
                        <p className="text-xs text-gray-400">
                          {course.platform}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            course.status === "GRADUATED"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-orange-900/30 text-orange-400"
                          }`}
                        >
                          {course.status === "GRADUATED"
                            ? "Completed"
                            : "In Progress"}
                        </div>
                        {course.grade && (
                          <div className="text-xs text-green-400 mt-1">
                            Grade: {course.grade}
                          </div>
                        )}
                      </div>
                    </div>
                    {course.description && (
                      <p className="text-sm text-gray-400 mb-3">
                        {course.description}
                      </p>
                    )}
                    <div className="mt-auto">
                      {course.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {course.skills.map((skill) => (
                            <span
                              key={skill.id}
                              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-400">
                          {course.duration && (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{course.duration}</span>
                            </>
                          )}
                          {course.completedDate && (
                            <>
                              <span className="mx-2">•</span>
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{formatDate(course.completedDate)}</span>
                            </>
                          )}
                        </div>
                        {course.certificateUrl && (
                          <Link
                            href={course.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Award className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Certifications */}
          {user.certificates.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Professional Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-[#0D1117] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                        {cert.badgeUrl ? (
                          <Image
                            src={cert.badgeUrl}
                            alt={`${cert.title} badge`}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                        ) : (
                          <Award className="w-8 h-8 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-400">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-300">{cert.issuer}</p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>Issued: {formatDate(cert.completionDate)}</span>
                          {cert.expiryDate && (
                            <>
                              <span className="mx-2">•</span>
                              <span>
                                Expires: {formatDate(cert.expiryDate)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {cert.credentialId && (
                          <p className="text-xs text-gray-400">Credential ID</p>
                        )}
                        {cert.credentialId && (
                          <p className="text-xs font-mono text-gray-300">
                            {cert.credentialId}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {cert.isVerified && (
                          <div className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                            Verified
                          </div>
                        )}
                        {cert.verificationUrl && (
                          <Link
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Learning Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Courses</span>
                <span className="font-semibold text-blue-400">
                  {learningStats.totalCourses}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Completed</span>
                <span className="font-semibold text-green-400">
                  {learningStats.completedCourses}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">In Progress</span>
                <span className="font-semibold text-orange-400">
                  {learningStats.inProgressCourses}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Learning Hours</span>
                <span className="font-semibold text-purple-400">
                  {learningStats.totalHours}h
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Certificates</span>
                <span className="font-semibold text-yellow-400">
                  {learningStats.certificates}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg. Grade</span>
                <span className="font-semibold text-green-400">
                  {learningStats.averageGrade > 0
                    ? `${learningStats.averageGrade}%`
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Learning Streak</span>
                <span className="font-semibold text-orange-400">
                  {learningStats.streak} days
                </span>
              </div>
            </div>
          </div>

          {user.skillAreas.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Skill Areas
              </h3>
              <div className="space-y-4">
                {user.skillAreas.map((area) => (
                  <div key={area.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        {area.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {area.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${area.proficiency}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {area.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.learningGoals.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Current Goals
              </h3>
              <div className="space-y-3">
                {user.learningGoals.map((goal) => (
                  <div key={goal.id} className="bg-[#0D1117] p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">
                        {goal.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

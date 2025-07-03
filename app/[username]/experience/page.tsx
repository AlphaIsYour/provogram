// app/[username]/experience/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Building,
  Briefcase,
  Award,
  Code,
  TrendingUp,
  Rocket,
  CheckCircle2,
  ArrowLeft,
  Brain,
} from "lucide-react";
import { differenceInMonths, format, formatDistanceStrict } from "date-fns";

// ==================================
// HELPER FUNCTIONS
// ==================================

// Helper untuk format tanggal
const formatDate = (date: Date) => format(date, "MMM yyyy");

// Helper untuk menghitung durasi
const getDuration = (startDate: Date, endDate: Date | null) => {
  const end = endDate || new Date(); // Jika null, anggap sampai sekarang
  return formatDistanceStrict(end, startDate, {
    unit: "month",
  })
    .replace("months", "mos")
    .replace("month", "mo");
};

// ==================================
// KOMPONEN UTAMA
// ==================================
export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // 1. Fetch user dan semua relasi yang dibutuhkan untuk halaman ini
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      workExperiences: {
        orderBy: { startDate: "desc" },
        include: {
          technologies: true,
          highlights: true,
        },
      },
      projects: {
        where: { projectType: "FREELANCE" },
        orderBy: { createdAt: "desc" },
        include: {
          technologies: true,
        },
      },
      professionalSkills: {
        include: {
          category: true,
        },
        orderBy: [{ type: "asc" }, { proficiency: "desc" }],
      },
    },
  });

  if (!user) {
    notFound();
  }

  // 2. Kalkulasi Statistik Karir
  const firstJob = user.workExperiences[user.workExperiences.length - 1];
  const totalExperienceMonths = firstJob
    ? differenceInMonths(new Date(), firstJob.startDate)
    : 0;
  const totalExperienceYears = Math.floor(totalExperienceMonths / 12);

  const careerStats = {
    totalExperience: `${totalExperienceYears}+ Years`,
    companiesWorked: user.workExperiences.length,
    projectsDelivered: await prisma.project.count({
      where: { authorId: user.id },
    }),
    freelanceProjects: user.projects.length,
  };

  const technicalSkills = user.professionalSkills.filter(
    (s) => s.type === "TECHNICAL"
  );
  const softSkills = user.professionalSkills.filter((s) => s.type === "SOFT");

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
              <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
              Experience
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {user.name}&apos;s career journey and professional achievements
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">
              {totalExperienceYears}+
            </div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Experience Timeline */}
        <div className="lg:col-span-3 space-y-6">
          {/* Work Experience */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Work Experience
            </h2>
            <div className="space-y-8">
              {user.workExperiences.map((job, index) => (
                <div key={job.id} className="relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#161B22] z-10"></div>
                  {index < user.workExperiences.length - 1 && (
                    <div className="absolute left-2 top-4 w-0.5 h-full bg-gray-700 -ml-0.5"></div>
                  )}
                  <div className="ml-8 bg-[#0D1117] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-400">
                            {job.position}
                          </h3>
                          <p className="text-lg text-gray-300 flex items-center">
                            {job.company}
                            <span className="ml-2 text-sm bg-gray-800 text-gray-300 px-2 py-1 rounded capitalize">
                              {job.type.toLowerCase().replace("_", "-")}
                            </span>
                          </p>
                          <div className="flex items-center text-gray-400 text-sm mt-1 flex-wrap">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="mr-4">{job.location}</span>
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {formatDate(job.startDate)} -{" "}
                              {job.endDate
                                ? formatDate(job.endDate)
                                : "Present"}
                            </span>
                            <span className="ml-2 text-gray-500">
                              ({getDuration(job.startDate, job.endDate)})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {job.description && (
                      <p className="text-gray-300 mb-4">{job.description}</p>
                    )}
                    {job.highlights.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {job.highlights.map((highlight) => (
                          <div
                            key={highlight.id}
                            className="bg-[#161B22] p-3 rounded-lg text-center"
                          >
                            <div className="text-lg font-bold text-green-400">
                              {highlight.metric}
                            </div>
                            <div className="text-xs text-gray-400">
                              {highlight.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {job.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-yellow-400" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
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
                    {job.technologies.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2 text-purple-400" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech.id}
                              className="text-xs bg-gray-800 text-blue-300 px-3 py-1 rounded-full border border-gray-700"
                            >
                              {tech.name}
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
          {/* Freelance Projects */}
          {user.projects.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Freelance Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#0D1117] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-blue-400">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {project.createdAt.getFullYear()}
                      </span>
                    </div>
                    {project.client && (
                      <p className="text-sm text-gray-300 mb-2">
                        {project.client}
                      </p>
                    )}
                    <p className="text-sm text-gray-400 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    {project.result && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-400 font-semibold">
                          {project.result}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Skills Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {technicalSkills.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {technicalSkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {skill.category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {softSkills.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Soft Skills
              </h3>
              <div className="space-y-4">
                {softSkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Career Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Experience</span>
                <span className="font-semibold text-blue-400">
                  {careerStats.totalExperience}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Companies Worked</span>
                <span className="font-semibold text-green-400">
                  {careerStats.companiesWorked}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Projects Delivered
                </span>
                <span className="font-semibold text-purple-400">
                  {careerStats.projectsDelivered}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Freelance Projects
                </span>
                <span className="font-semibold text-orange-400">
                  {careerStats.freelanceProjects}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Users,
  Star,
  TrendingUp,
  Code,
  Clock,
  ChevronRight,
  Globe,
  Zap,
  Target,
  Trophy,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Coffee,
  Lightbulb,
  Brain,
  Medal,
  Award,
  FileText,
  Monitor,
  Play,
  Download,
} from "lucide-react";

export default async function EducationPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Await the params Promise
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    notFound();
  }

  // Mock data untuk education
  const formalEducation = [
    {
      id: 1,
      institution: "Universitas Indonesia",
      degree: "Bachelor of Computer Science",
      field: "Software Engineering",
      location: "Jakarta, Indonesia",
      startDate: "Aug 2015",
      endDate: "Jul 2019",
      duration: "4 years",
      gpa: "3.8/4.0",
      status: "Graduated",
      logo: "/api/placeholder/60/60",
      description:
        "Focused on software development, algorithms, and database systems. Active in programming clubs and hackathons.",
      achievements: [
        "Graduated Magna Cum Laude with GPA 3.8/4.0",
        "Winner of National Programming Competition 2018",
        "President of Computer Science Student Association",
        "Published research paper on Machine Learning applications",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Systems",
        "Web Development",
        "Computer Networks",
        "Machine Learning",
        "Operating Systems",
        "Mobile App Development",
      ],
      projects: [
        {
          title: "Smart Campus System",
          description:
            "Built a comprehensive campus management system using PHP and MySQL",
          tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
        },
        {
          title: "Machine Learning Classifier",
          description:
            "Developed a sentiment analysis tool for social media data",
          tech: ["Python", "Scikit-learn", "NLTK", "Flask"],
        },
      ],
    },
    {
      id: 2,
      institution: "SMA Negeri 1 Jakarta",
      degree: "High School Diploma",
      field: "Mathematics & Natural Sciences",
      location: "Jakarta, Indonesia",
      startDate: "Jul 2012",
      endDate: "May 2015",
      duration: "3 years",
      gpa: "9.2/10.0",
      status: "Graduated",
      logo: "/api/placeholder/60/60",
      description:
        "Focused on Mathematics, Physics, and Chemistry. Participated in various science competitions.",
      achievements: [
        "Valedictorian with GPA 9.2/10.0",
        "1st Place in Provincial Mathematics Olympiad",
        "Captain of School Debate Team",
        "Winner of Science Fair Competition",
      ],
      courses: [
        "Advanced Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Indonesian Literature",
      ],
      projects: [],
    },
  ];

  const onlineCourses = [
    {
      id: 1,
      platform: "Coursera",
      title: "Full-Stack Web Development Specialization",
      provider: "The Hong Kong University of Science and Technology",
      completedDate: "Mar 2024",
      duration: "6 months",
      status: "Completed",
      certificateUrl: "#",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      grade: "98%",
      description:
        "Comprehensive specialization covering front-end and back-end web development technologies.",
    },
    {
      id: 2,
      platform: "Udemy",
      title: "Advanced React and Redux",
      provider: "Stephen Grider",
      completedDate: "Jan 2024",
      duration: "2 months",
      status: "Completed",
      certificateUrl: "#",
      skills: ["React", "Redux", "JavaScript", "Testing"],
      grade: "95%",
      description:
        "Deep dive into React patterns, Redux state management, and testing strategies.",
    },
    {
      id: 3,
      platform: "freeCodeCamp",
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      completedDate: "Nov 2023",
      duration: "4 months",
      status: "Completed",
      certificateUrl: "#",
      skills: ["JavaScript", "Algorithms", "Data Structures"],
      grade: "100%",
      description:
        "Comprehensive course on JavaScript fundamentals and computer science concepts.",
    },
    {
      id: 4,
      platform: "Pluralsight",
      title: "AWS Developer Associate Path",
      provider: "Pluralsight",
      completedDate: "Sep 2023",
      duration: "3 months",
      status: "Completed",
      certificateUrl: "#",
      skills: ["AWS", "Lambda", "DynamoDB", "S3"],
      grade: "92%",
      description:
        "Complete learning path for AWS development and cloud architecture.",
    },
    {
      id: 5,
      platform: "LinkedIn Learning",
      title: "Docker Essential Training",
      provider: "LinkedIn Learning",
      completedDate: "Jul 2023",
      duration: "1 month",
      status: "Completed",
      certificateUrl: "#",
      skills: ["Docker", "Containerization", "DevOps"],
      grade: "90%",
      description:
        "Hands-on training in Docker containerization and deployment strategies.",
    },
    {
      id: 6,
      platform: "Codecademy",
      title: "Learn TypeScript",
      provider: "Codecademy",
      completedDate: "In Progress",
      duration: "2 months",
      status: "In Progress",
      certificateUrl: null,
      skills: ["TypeScript", "JavaScript", "Type Safety"],
      grade: "85%",
      description:
        "Comprehensive TypeScript course covering advanced typing and best practices.",
    },
  ];

  const certifications = [
    {
      name: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      issueDate: "Oct 2023",
      expiryDate: "Oct 2026",
      credentialId: "AWS-CDA-2023-1234",
      status: "Active",
      badgeUrl: "/api/placeholder/80/80",
      verificationUrl: "#",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      issueDate: "Aug 2023",
      expiryDate: "Aug 2025",
      credentialId: "GCP-PD-2023-5678",
      status: "Active",
      badgeUrl: "/api/placeholder/80/80",
      verificationUrl: "#",
    },
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      issueDate: "Jun 2023",
      expiryDate: "Never",
      credentialId: "AZ-900-2023-9012",
      status: "Active",
      badgeUrl: "/api/placeholder/80/80",
      verificationUrl: "#",
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      issueDate: "Apr 2023",
      expiryDate: "Apr 2026",
      credentialId: "MDB-DEV-2023-3456",
      status: "Active",
      badgeUrl: "/api/placeholder/80/80",
      verificationUrl: "#",
    },
  ];

  const learningStats = {
    totalCourses: 25,
    completedCourses: 21,
    inProgressCourses: 4,
    totalHours: 456,
    certificates: 12,
    averageGrade: 94,
    streak: 89,
  };

  const skillAreas = [
    {
      category: "Frontend Development",
      skills: ["React", "Vue.js", "Angular", "TypeScript", "HTML/CSS"],
      level: 95,
    },
    {
      category: "Backend Development",
      skills: ["Node.js", "Python", "Java", "PHP", "C#"],
      level: 88,
    },
    {
      category: "Database Systems",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB"],
      level: 85,
    },
    {
      category: "Cloud Platforms",
      skills: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
      level: 82,
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "CI/CD", "Jenkins", "Docker", "Webpack"],
      level: 78,
    },
  ];

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
              AlphaIsYour&apos;s educational background and continuous learning
              journey
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">25+</div>
            <div className="text-sm text-gray-400">Courses Completed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Formal Education */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Formal Education
            </h2>
            <div className="space-y-8">
              {formalEducation.map((edu, index) => (
                <div key={edu.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-[#161B22] z-10"></div>
                  {/* Timeline line */}
                  {index < formalEducation.length - 1 && (
                    <div className="absolute left-2 top-4 w-0.5 h-full bg-gray-700 -ml-0.5"></div>
                  )}

                  <div className="ml-8 bg-[#0D1117] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-400">
                            {edu.degree}
                          </h3>
                          <p className="text-lg text-gray-300">
                            {edu.institution}
                          </p>
                          <p className="text-gray-400">{edu.field}</p>
                          <div className="flex items-center text-gray-400 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="mr-4">{edu.location}</span>
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {edu.startDate} - {edu.endDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          {edu.status}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                          GPA: {edu.gpa}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{edu.description}</p>

                    {/* Achievements */}
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

                    {/* Relevant Coursework */}
                    <div className="mb-4">
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

                    {/* Projects */}
                    {edu.projects.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2 text-orange-400" />
                          Notable Projects
                        </h4>
                        <div className="space-y-3">
                          {edu.projects.map((project, idx) => (
                            <div
                              key={idx}
                              className="bg-[#161B22] p-3 rounded-lg"
                            >
                              <h5 className="font-medium text-blue-400 mb-1">
                                {project.title}
                              </h5>
                              <p className="text-sm text-gray-300 mb-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {project.tech.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online Courses */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Monitor className="w-5 h-5 mr-2" />
                Online Courses & Certifications
              </h2>
              <div className="text-sm bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                {learningStats.completedCourses}/{learningStats.totalCourses}{" "}
                Completed
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onlineCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#0D1117] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-blue-400 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-300">{course.provider}</p>
                      <p className="text-xs text-gray-400">{course.platform}</p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          course.status === "Completed"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-orange-900/30 text-orange-400"
                        }`}
                      >
                        {course.status}
                      </div>
                      {course.status === "Completed" && (
                        <div className="text-xs text-green-400 mt-1">
                          Grade: {course.grade}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{course.duration}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{course.completedDate}</span>
                    </div>
                    {course.certificateUrl && (
                      <button className="text-blue-400 hover:text-blue-300">
                        <Award className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Certifications */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Professional Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-[#0D1117] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Award className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-400">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-300">{cert.issuer}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Issued: {cert.issueDate}</span>
                        {cert.expiryDate !== "Never" && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Expires: {cert.expiryDate}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Credential ID</p>
                      <p className="text-xs font-mono text-gray-300">
                        {cert.credentialId}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                        {cert.status}
                      </div>
                      <button className="text-blue-400 hover:text-blue-300">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Learning Stats */}
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
                  {learningStats.averageGrade}%
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

          {/* Skill Areas */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Skill Areas
            </h3>
            <div className="space-y-4">
              {skillAreas.map((area, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">
                      {area.category}
                    </span>
                    <span className="text-xs text-gray-400">{area.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${area.level}%` }}
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

          {/* Learning Goals */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Current Goals
            </h3>
            <div className="space-y-3">
              <div className="bg-[#0D1117] p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">
                    Master DevOps
                  </span>
                  <span className="text-xs text-gray-400">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-[#0D1117] p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">
                    AI/ML Fundamentals
                  </span>
                  <span className="text-xs text-gray-400">60%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-[#0D1117] p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">
                    System Design
                  </span>
                  <span className="text-xs text-gray-400">40%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

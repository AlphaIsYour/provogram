/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/experience/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Building,
  Briefcase,
  Users,
  Star,
  TrendingUp,
  Award,
  Code,
  Clock,
  ChevronRight,
  Globe,
  Zap,
  Target,
  Rocket,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Coffee,
  Lightbulb,
  Brain,
} from "lucide-react";

export default async function ExperiencePage({
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

  // Mock data untuk experience
  const workExperience = [
    {
      id: 1,
      company: "TechCorp Indonesia",
      position: "Senior Full Stack Developer",
      type: "Full-time",
      location: "Jakarta, Indonesia",
      startDate: "Jan 2023",
      endDate: "Present",
      duration: "1 year 6 months",
      logo: "/api/placeholder/60/60",
      description:
        "Leading development of enterprise web applications and mentoring junior developers.",
      achievements: [
        "Led a team of 5 developers in building a microservices architecture that improved system performance by 40%",
        "Implemented CI/CD pipelines that reduced deployment time from 2 hours to 15 minutes",
        "Mentored 8 junior developers, with 6 receiving promotions within 12 months",
        "Architected and built a real-time analytics dashboard serving 10k+ daily active users",
      ],
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "AWS",
        "TypeScript",
        "GraphQL",
      ],
      highlights: [
        { metric: "40%", label: "Performance Improvement" },
        { metric: "15 min", label: "Deployment Time" },
        { metric: "10k+", label: "Daily Active Users" },
        { metric: "8", label: "Developers Mentored" },
      ],
    },
    {
      id: 2,
      company: "StartupHub",
      position: "Full Stack Developer",
      type: "Full-time",
      location: "Jakarta, Indonesia",
      startDate: "Mar 2021",
      endDate: "Dec 2022",
      duration: "1 year 10 months",
      logo: "/api/placeholder/60/60",
      description:
        "Developed and maintained multiple client applications using modern web technologies.",
      achievements: [
        "Built 12+ client applications from scratch using React and Node.js",
        "Reduced application load time by 60% through code optimization and caching strategies",
        "Integrated payment gateways and third-party APIs for 8 different projects",
        "Collaborated with designers to create pixel-perfect responsive interfaces",
      ],
      technologies: [
        "React",
        "Vue.js",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "Tailwind CSS",
      ],
      highlights: [
        { metric: "12+", label: "Applications Built" },
        { metric: "60%", label: "Load Time Reduction" },
        { metric: "8", label: "Payment Integrations" },
        { metric: "100%", label: "Client Satisfaction" },
      ],
    },
    {
      id: 3,
      company: "WebAgency Pro",
      position: "Frontend Developer",
      type: "Contract",
      location: "Remote",
      startDate: "Jun 2020",
      endDate: "Feb 2021",
      duration: "9 months",
      logo: "/api/placeholder/60/60",
      description:
        "Specialized in creating responsive and interactive user interfaces for various client projects.",
      achievements: [
        "Delivered 15+ responsive websites with 100% client satisfaction rate",
        "Implemented modern design systems that reduced development time by 30%",
        "Optimized websites for SEO resulting in average 45% increase in organic traffic",
        "Created reusable component libraries used across multiple projects",
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "SASS",
        "Bootstrap",
        "jQuery",
      ],
      highlights: [
        { metric: "15+", label: "Websites Delivered" },
        { metric: "30%", label: "Dev Time Reduction" },
        { metric: "45%", label: "Traffic Increase" },
        { metric: "100%", label: "Client Satisfaction" },
      ],
    },
    {
      id: 4,
      company: "Digital Solutions",
      position: "Junior Web Developer",
      type: "Full-time",
      location: "Jakarta, Indonesia",
      startDate: "Jan 2019",
      endDate: "May 2020",
      duration: "1 year 5 months",
      logo: "/api/placeholder/60/60",
      description:
        "Started my professional journey building websites and learning industry best practices.",
      achievements: [
        "Developed and maintained 8 company websites using WordPress and custom PHP",
        "Learned and implemented responsive design principles across all projects",
        "Collaborated with senior developers to deliver projects on time and within budget",
        "Contributed to code review processes and adopted agile development practices",
      ],
      technologies: [
        "PHP",
        "WordPress",
        "MySQL",
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
      ],
      highlights: [
        { metric: "8", label: "Websites Built" },
        { metric: "100%", label: "On-time Delivery" },
        { metric: "2", label: "Promotions Received" },
        { metric: "50+", label: "Code Reviews" },
      ],
    },
  ];

  const freelanceProjects = [
    {
      title: "E-commerce Platform",
      client: "Fashion Retail Co.",
      duration: "3 months",
      year: "2023",
      description:
        "Built a complete e-commerce solution with payment integration and admin dashboard.",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      result: "Increased online sales by 150%",
    },
    {
      title: "Learning Management System",
      client: "EduTech Startup",
      duration: "4 months",
      year: "2022",
      description:
        "Developed an LMS with video streaming, progress tracking, and certificate generation.",
      technologies: ["React", "Node.js", "MongoDB"],
      result: "Served 5000+ students",
    },
    {
      title: "Restaurant Management App",
      client: "Local Restaurant Chain",
      duration: "2 months",
      year: "2022",
      description:
        "Created a POS system with inventory management and real-time analytics.",
      technologies: ["Vue.js", "Firebase", "Vuetify"],
      result: "Reduced order processing time by 40%",
    },
  ];

  const skills = {
    technical: [
      { name: "JavaScript", level: 95, category: "Programming" },
      { name: "TypeScript", level: 90, category: "Programming" },
      { name: "React", level: 95, category: "Frontend" },
      { name: "Next.js", level: 88, category: "Frontend" },
      { name: "Node.js", level: 85, category: "Backend" },
      { name: "PostgreSQL", level: 80, category: "Database" },
      { name: "MongoDB", level: 85, category: "Database" },
      { name: "AWS", level: 75, category: "Cloud" },
      { name: "Docker", level: 78, category: "DevOps" },
      { name: "GraphQL", level: 82, category: "API" },
    ],
    soft: [
      { name: "Team Leadership", level: 90 },
      { name: "Mentoring", level: 95 },
      { name: "Problem Solving", level: 92 },
      { name: "Communication", level: 88 },
      { name: "Project Management", level: 85 },
      { name: "Agile/Scrum", level: 90 },
    ],
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
              <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
              Experience
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              AlphaIsYour&apos;s career journey and professional achievements
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">3</div>
            <div className="text-sm text-gray-400">Year Experiece</div>
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
              {workExperience.map((job, index) => (
                <div key={job.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#161B22] z-10"></div>
                  {/* Timeline line */}
                  {index < workExperience.length - 1 && (
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
                            <span className="ml-2 text-sm bg-gray-800 text-gray-300 px-2 py-1 rounded">
                              {job.type}
                            </span>
                          </p>
                          <div className="flex items-center text-gray-400 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="mr-4">{job.location}</span>
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {job.startDate} - {job.endDate}
                            </span>
                            <span className="ml-2 text-gray-500">
                              ({job.duration})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{job.description}</p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {job.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
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

                    {/* Achievements */}
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

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2 text-purple-400" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-800 text-blue-300 px-3 py-1 rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Freelance Projects */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              Freelance Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freelanceProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#0D1117] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-blue-400">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{project.client}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-400 font-semibold">
                      {project.result}
                    </span>
                    <span className="text-xs text-gray-400">
                      {project.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Technical Skills */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Technical Skills
            </h3>
            <div className="space-y-4">
              {skills.technical.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {skill.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Soft Skills
            </h3>
            <div className="space-y-4">
              {skills.soft.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Stats */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Career Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Experience</span>
                <span className="font-semibold text-blue-400">5+ Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Companies Worked</span>
                <span className="font-semibold text-green-400">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Projects Delivered
                </span>
                <span className="font-semibold text-purple-400">50+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Team Members Led</span>
                <span className="font-semibold text-yellow-400">15+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Freelance Projects
                </span>
                <span className="font-semibold text-orange-400">20+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

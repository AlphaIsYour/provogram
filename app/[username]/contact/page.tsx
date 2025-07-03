// HAPUS 'use client'; DARI SINI
// Ini sekarang adalah Server Component lagi

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Coffee,
  Briefcase,
  Heart,
  Star,
  CheckCircle2,
  Users,
  Zap,
  ExternalLink,
  XCircle,
} from "lucide-react";
import ContactForm from "./ContactForm"; // Import komponen baru kita

export default async function ContactPage({
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

  // Semua logika untuk mengambil socialLinks, collaborationTypes, dll. tetap sama...
  const socialLinks = [];
  if (user.githubUrl)
    socialLinks.push({
      platform: "GitHub",
      url: user.githubUrl,
      icon: Github,
      color: "text-gray-400 hover:text-white",
    });
  if (user.linkedinUrl)
    socialLinks.push({
      platform: "LinkedIn",
      url: user.linkedinUrl,
      icon: Linkedin,
      color: "text-blue-400 hover:text-blue-300",
    });
  if (user.twitterUrl)
    socialLinks.push({
      platform: "Twitter",
      url: user.twitterUrl,
      icon: Twitter,
      color: "text-blue-400 hover:text-blue-300",
    });
  if (user.websiteUrl)
    socialLinks.push({
      platform: "Portfolio",
      url: user.websiteUrl,
      icon: Globe,
      color: "text-green-400 hover:text-green-300",
    });

  const collaborationTypes = [
    {
      title: "Project Collaboration",
      description: "Open to collaborate on exciting new projects and ideas.",
      icon: Briefcase,
      available: user.openToCollaboration,
      color: "text-purple-400",
    },
    {
      title: "Mentoring & Guidance",
      description: "Willing to help guide and mentor fellow developers.",
      icon: Users,
      available: user.openToMentoring,
      color: "text-blue-400",
    },
  ];

  const quickContacts = [];
  if (user.email && user.preferredContact === "Email")
    quickContacts.push({
      method: "Email",
      value: user.email,
      icon: Mail,
      primary: true,
      description: "Best for detailed discussions",
    });
  else if (user.email)
    quickContacts.push({
      method: "Email",
      value: user.email,
      icon: Mail,
      primary: false,
      description: "Best for detailed discussions",
    });
  if (user.phone && user.preferredContact === "Phone")
    quickContacts.push({
      method: "Phone/WhatsApp",
      value: user.phone,
      icon: Phone,
      primary: true,
      description: "For urgent matters",
    });
  else if (user.phone)
    quickContacts.push({
      method: "Phone/WhatsApp",
      value: user.phone,
      icon: Phone,
      primary: false,
      description: "For urgent matters",
    });
  if (user.linkedinUrl)
    quickContacts.push({
      method: "LinkedIn Message",
      value: user.linkedinUrl,
      icon: Linkedin,
      primary: false,
      description: "Professional networking",
    });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar (TIDAK ADA PERUBAHAN DI SINI) */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            {/* ... semua kode sidebar tetap sama ... */}
            <div className="flex flex-col items-center mb-6">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={100}
                height={100}
                className="rounded-full border-2 border-gray-700 mb-4"
              />
              <h1 className="text-xl font-bold text-center">{user.name}</h1>
              <p className="text-gray-400">@{user.username}</p>
              {user.openToWork && (
                <div className="flex items-center mt-2">
                  <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-700">
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                    Open to work
                  </span>
                </div>
              )}
            </div>
            {/* ... sisanya sama persis ... */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Quick Contact
              </h3>
              {quickContacts.map((contact, index) => (
                <a
                  key={index}
                  href={
                    contact.method === "Email"
                      ? `mailto:${contact.value}`
                      : contact.method === "Phone/WhatsApp"
                      ? `https://wa.me/${contact.value.replace(/[^0-9]/g, "")}`
                      : contact.value
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-3 rounded-lg border transition-all cursor-pointer ${
                    contact.primary
                      ? "bg-blue-900/30 border-blue-700 hover:bg-blue-900/50"
                      : "bg-[#0D1117] border-gray-700 hover:bg-[#21262D]"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <contact.icon className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="font-medium text-sm">
                      {contact.method}
                    </span>
                    {contact.primary && (
                      <Star className="w-3 h-3 ml-auto text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-1 break-words">
                    {contact.value}
                  </p>
                  <p className="text-xs text-gray-500">{contact.description}</p>
                </a>
              ))}
            </div>
            {(user.availability || user.timezone || user.responseTime) && (
              <div className="bg-[#0D1117] p-4 rounded-lg mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-green-400" />
                  Availability
                </h3>
                <div className="space-y-2 text-sm">
                  {user.availability && (
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-3 h-3 mr-2" />
                      <span>{user.availability}</span>
                    </div>
                  )}
                  {user.timezone && (
                    <div className="flex items-center text-gray-300">
                      <Globe className="w-3 h-3 mr-2" />
                      <span>{user.timezone}</span>
                    </div>
                  )}
                  {user.responseTime && (
                    <div className="flex items-center text-green-400">
                      <Zap className="w-3 h-3 mr-2" />
                      <span>{user.responseTime}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-gray-300 mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-800/30">
            <h1 className="text-xl font-bold mb-2 flex items-center">
              <MessageCircle className="w-7 h-7 mr-2 text-blue-400" />
              Let&apos;s Connect!
            </h1>
            <p className="text-gray-300 text-lg">
              I&apos;m always excited to discuss new opportunities, collaborate
              on interesting projects, or help fellow developers on their
              journey. Don&apos;t hesitate to reach out!
            </p>
          </div>

          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            {/* GANTI BLOK FORM DENGAN KOMPONEN BARU */}
            <ContactForm user={user} />
          </div>

          {/* Bagian Collaboration dan Social Media (TIDAK ADA PERUBAHAN DI SINI) */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Coffee className="w-5 h-5 mr-2" />
              Ways We Can Work Together
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collaborationTypes.map((type, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    type.available
                      ? "bg-[#0D1117] border-gray-700"
                      : "bg-gray-900/30 border-gray-800 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <type.icon className={`w-5 h-5 ${type.color}`} />
                    <div className="flex items-center">
                      {type.available ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        type.available
                          ? "bg-green-900/30 text-green-400"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {type.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {socialLinks.length > 0 && (
            <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Connect on Social Media
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-[#0D1117] border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-[#21262D] transition-all group"
                  >
                    <social.icon className={`w-6 h-6 mr-4 ${social.color}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold">{social.platform}</h3>
                      <p className="text-sm text-gray-400">
                        {
                          new URL(
                            social.url.startsWith("http")
                              ? social.url
                              : `https://${social.url}`
                          ).hostname
                        }
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors ml-auto mt-1" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

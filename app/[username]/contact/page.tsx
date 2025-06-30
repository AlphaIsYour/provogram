// app/[username]/contact/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  MessageCircle,
  Send,
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
  AlertCircle,
  Users,
  Zap,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default async function ContactPage({
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

  // Mock data untuk contact
  const contactInfo = {
    email: "developer@example.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    timezone: "Asia/Jakarta (UTC+7)",
    availability: "Monday - Friday, 9:00 AM - 6:00 PM",
    responseTime: "Usually responds within 24 hours",
    preferredContact: "Email",
    openToWork: true,
    openToMentoring: true,
    openToCollaboration: true,
  };

  const socialLinks = [
    {
      platform: "GitHub",
      username: "@johndeveloper",
      url: "https://github.com/johndeveloper",
      icon: Github,
      color: "text-gray-400 hover:text-white",
      followers: "2.5k",
    },
    {
      platform: "LinkedIn",
      username: "John Developer",
      url: "https://linkedin.com/in/johndeveloper",
      icon: Linkedin,
      color: "text-blue-400 hover:text-blue-300",
      followers: "3.2k",
    },
    {
      platform: "Twitter",
      username: "@johndev",
      url: "https://twitter.com/johndev",
      icon: Twitter,
      color: "text-blue-400 hover:text-blue-300",
      followers: "1.8k",
    },
    {
      platform: "Portfolio",
      username: "portfolio.dev",
      url: "https://portfolio.dev",
      icon: Globe,
      color: "text-green-400 hover:text-green-300",
      followers: "Public",
    },
  ];

  const collaborationTypes = [
    {
      title: "Open Source Projects",
      description: "Contributing to community projects and building together",
      icon: Github,
      available: true,
      color: "text-green-400",
    },
    {
      title: "Mentoring & Teaching",
      description: "1-on-1 mentoring sessions and code reviews",
      icon: Users,
      available: true,
      color: "text-blue-400",
    },
    {
      title: "Freelance Work",
      description: "Full-stack development projects and consulting",
      icon: Briefcase,
      available: true,
      color: "text-purple-400",
    },
    {
      title: "Speaking Events",
      description: "Tech talks, workshops, and conference presentations",
      icon: MessageSquare,
      available: false,
      color: "text-orange-400",
    },
  ];

  const quickContacts = [
    {
      method: "Email",
      value: contactInfo.email,
      icon: Mail,
      primary: true,
      description: "Best for detailed discussions and project inquiries",
    },
    {
      method: "Phone/WhatsApp",
      value: contactInfo.phone,
      icon: Phone,
      primary: false,
      description: "For urgent matters or quick calls",
    },
    {
      method: "LinkedIn Message",
      value: "Send professional message",
      icon: Linkedin,
      primary: false,
      description: "Professional networking and opportunities",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            {/* User Info */}
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
              <div className="flex items-center mt-2">
                {contactInfo.openToWork && (
                  <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-700">
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                    Open to work
                  </span>
                )}
              </div>
            </div>

            {/* Quick Contact Methods */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Quick Contact
              </h3>
              {quickContacts.map((contact, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
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
                  <p className="text-xs text-gray-400 mb-1">{contact.value}</p>
                  <p className="text-xs text-gray-500">{contact.description}</p>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="bg-[#0D1117] p-4 rounded-lg mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-400" />
                Availability
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>{contactInfo.availability}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Globe className="w-3 h-3 mr-2" />
                  <span>{contactInfo.timezone}</span>
                </div>
                <div className="flex items-center text-green-400">
                  <Zap className="w-3 h-3 mr-2" />
                  <span>{contactInfo.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-300 mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
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

          {/* Contact Form */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Send className="w-5 h-5 mr-2" />
              Send a Message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Project Collaboration</option>
                  <option>Mentoring Request</option>
                  <option>Job Opportunity</option>
                  <option>Speaking Engagement</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Tell me about your project, question, or how I can help you..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Collaboration Types */}
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
                      ? "bg-[#0D1117] border-gray-700 hover:border-gray-600"
                      : "bg-gray-900/30 border-gray-800 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <type.icon className={`w-5 h-5 ${type.color}`} />
                    <div className="flex items-center">
                      {type.available ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-500" />
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
                      {type.available ? "Available" : "Currently Full"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
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
                    <p className="text-sm text-gray-400">{social.username}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">
                      {social.followers} followers
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors ml-auto mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Tips */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-800/30">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Tips for Better Communication
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Be specific about your project requirements</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Include your timeline and budget expectations</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Share your GitHub profile or portfolio</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mention your experience level</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ask specific technical questions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Be patient for detailed responses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

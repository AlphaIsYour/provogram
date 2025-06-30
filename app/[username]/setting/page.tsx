/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/setting/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Eye,
  Globe,
  Smartphone,
  Download,
  Upload,
  Trash2,
  Save,
  Edit3,
  Camera,
  MapPin,
  LinkIcon,
  Building,
  Calendar,
  Github,
  Twitter,
  Linkedin,
  Settings,
  Moon,
  Sun,
  Monitor,
  Palette,
  Languages,
  HelpCircle,
  LogOut,
  UserX,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";

export default async function SettingsPage({
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
              <Settings className="w-6 h-6 mr-2 text-blue-400" />
              Account Settings
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg border border-gray-800 sticky top-24">
            <div className="p-4 border-b border-gray-800">
              <h2 className="font-semibold text-lg">Settings</h2>
            </div>
            <nav className="p-2">
              <a
                href="#profile"
                className="flex items-center px-3 py-2 text-blue-400 bg-blue-900/30 rounded-lg mb-1 transition-colors"
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </a>
              <a
                href="#account"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0D1117] rounded-lg mb-1 transition-colors"
              >
                <Lock className="w-4 h-4 mr-3" />
                Account & Security
              </a>
              <a
                href="#notifications"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0D1117] rounded-lg mb-1 transition-colors"
              >
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </a>
              <a
                href="#privacy"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0D1117] rounded-lg mb-1 transition-colors"
              >
                <Eye className="w-4 h-4 mr-3" />
                Privacy
              </a>
              <a
                href="#appearance"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0D1117] rounded-lg mb-1 transition-colors"
              >
                <Palette className="w-4 h-4 mr-3" />
                Appearance
              </a>
              <a
                href="#data"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0D1117] rounded-lg mb-1 transition-colors"
              >
                <Download className="w-4 h-4 mr-3" />
                Data & Export
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <section
            id="profile"
            className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>

            {/* Avatar Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-gray-700"
                  />
                  <button className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-x-3">
                  <button className="bg-[#0D1117] hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors border border-gray-700">
                    <Upload className="w-4 h-4 mr-2 inline" />
                    Upload New
                  </button>
                  <button className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-800">
                    <Trash2 className="w-4 h-4 mr-2 inline" />
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name || ""}
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={user.username || ""}
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email || ""}
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  defaultValue="TechCorp"
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  defaultValue="Jakarta, Indonesia"
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Website
                </label>
                <input
                  type="url"
                  defaultValue="https://portfolio.dev"
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your website URL"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                rows={4}
                defaultValue="🚀 Full-stack developer & mentor passionate about teaching and building amazing web experiences. Always learning, always sharing knowledge!"
                className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Social Links</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="GitHub profile URL"
                    className="flex-1 bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="Twitter profile URL"
                    className="flex-1 bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="LinkedIn profile URL"
                    className="flex-1 bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Account & Security */}
          <section
            id="account"
            className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Account & Security
            </h2>

            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-[#0D1117] p-4 rounded-lg border border-gray-700">
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-[#0D1117] p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-red-400">Disabled</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-[#0D1117] p-4 rounded-lg border border-gray-700">
                <h3 className="font-medium mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#161B22] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-400">
                          Chrome on Windows • Jakarta, Indonesia
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-green-400">Active now</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#161B22] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-gray-400">
                          iOS App • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section
            id="notifications"
            className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Email notifications",
                  desc: "Receive notifications via email",
                  enabled: true,
                },
                {
                  title: "Push notifications",
                  desc: "Receive push notifications on your devices",
                  enabled: true,
                },
                {
                  title: "Learning reminders",
                  desc: "Daily reminders to continue learning",
                  enabled: true,
                },
                {
                  title: "Achievement notifications",
                  desc: "Get notified when you earn new badges",
                  enabled: true,
                },
                {
                  title: "Community updates",
                  desc: "Updates from your learning community",
                  enabled: false,
                },
                {
                  title: "Marketing emails",
                  desc: "Promotional emails and newsletters",
                  enabled: false,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#0D1117] rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.enabled ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Settings */}
          <section
            id="privacy"
            className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Privacy Settings
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Profile visibility",
                  desc: "Who can see your profile",
                  value: "Public",
                },
                {
                  title: "Learning progress",
                  desc: "Who can see your learning progress",
                  value: "Community",
                },
                {
                  title: "Project visibility",
                  desc: "Default visibility for new projects",
                  value: "Public",
                },
                {
                  title: "Contact information",
                  desc: "Who can see your contact info",
                  value: "Community",
                },
                {
                  title: "Activity status",
                  desc: "Show when you're online",
                  value: "Friends only",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#0D1117] rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <select className="bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="public">Public</option>
                    <option value="community">Community</option>
                    <option value="friends">Friends only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              ))}
            </div>
          </section>

          {/* Data & Export */}
          <section
            id="data"
            className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Data & Export
            </h2>

            <div className="space-y-4">
              <div className="bg-[#0D1117] p-4 rounded-lg border border-gray-700">
                <h3 className="font-medium mb-2">Export Your Data</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Download a copy of your profile data, learning progress, and
                  projects
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Request Export
                </button>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
                <h3 className="font-medium mb-2 text-red-400">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-3">
                  These actions are permanent and cannot be undone
                </p>
                <div className="space-y-3">
                  <button className="bg-red-900/30 w-[29vh] hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-800 flex items-center">
                    <UserX className="w-4 h-4 mr-2" />
                    Deactivate Account
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 w-[29vh]    text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

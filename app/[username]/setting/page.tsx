/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[username]/setting/page.tsx

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ArrowLeft, Settings, Shield, AlertTriangle } from "lucide-react";
import { Suspense } from "react";
import "@/app/[username]/setting/styles/style.css";

// Import components
import ProfileSettingsForm from "./components/ProfileSettingsForm";
import AccountSettingsForm from "./components/AccountSettingsForm";
import PrivacySettingsForm from "./components/PrivacySettingsForm";
import WorkExperienceManager from "./components/WorkExperienceManager";
import EducationManager from "./components/EducationManager";
import DangerZone from "./components/DangerZone";
import SettingsNavigation from "./components/SettingsNavigation"; // Client component

// Loading skeleton components
function SettingsSkeletonLoader() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
        >
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Error display component
function ServerErrorDisplay({ error }: { error: Error }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-400 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-300 mb-4">
          {error.message ||
            "An unexpected error occurred while loading the settings page."}
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

// Settings content component with proper section IDs and classes
async function SettingsContent({ user }: { user: any }) {
  return (
    <div className="lg:col-span-3 space-y-8 -mt-[3.5vh]">
      {/* Profile Settings */}
      <section
        id="profile"
        className="settings-section settings-content-section"
      >
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Profile Settings
          </h2>
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <ProfileSettingsForm user={user} />
          </Suspense>
        </div>
      </section>

      {/* Account Settings */}
      <section
        id="account"
        className="settings-section settings-content-section"
      >
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Account & Security
          </h2>
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <AccountSettingsForm user={user} />
          </Suspense>
        </div>
      </section>

      {/* Privacy Settings */}
      <section
        id="privacy"
        className="settings-section settings-content-section"
      >
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Privacy Settings
          </h2>
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <PrivacySettingsForm user={user} />
          </Suspense>
        </div>
      </section>

      {/* Work Experience Manager */}
      <section
        id="experience"
        className="settings-section settings-content-section"
      >
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Work Experience
          </h2>
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <WorkExperienceManager
              user={user}
              workExperiences={user.workExperiences || []}
            />
          </Suspense>
        </div>
      </section>

      {/* Education Manager */}
      <section
        id="education"
        className="settings-section settings-content-section"
      >
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Education
          </h2>
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <EducationManager
              user={user}
              educations={user.formalEducations || []}
            />
          </Suspense>
        </div>
      </section>

      {/* Danger Zone */}
      <section
        id="danger"
        className="settings-section settings-content-section"
      >
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-red-400">
            Danger Zone
          </h2>
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <DangerZone user={user} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  try {
    const { username } = await params;

    // Debug logging
    console.log("Settings page - Username from params:", username);

    // Validate username format
    if (!username || username.length < 1) {
      console.log("Settings page - Invalid username, redirecting to 404");
      notFound();
    }

    // NextAuth v4 way to get session
    const session = await getServerSession(authOptions);

    // Debug session
    console.log("Settings page - Session:", {
      userId: session?.user?.id,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
    });

    // Check authentication first
    if (!session?.user?.id) {
      console.log("Settings page - No session, redirecting to login");
      redirect("/login");
    }

    // Database queries
    const [targetUser, currentUser] = await Promise.all([
      prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { username: username.toLowerCase() },
            { username: username.toUpperCase() },
          ],
        },
        include: {
          workExperiences: {
            orderBy: { startDate: "desc" },
          },
          formalEducations: {
            orderBy: { startDate: "desc" },
          },
          _count: {
            select: {
              workExperiences: true,
              formalEducations: true,
            },
          },
        },
      }),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, username: true, email: true },
      }),
    ]);

    // Debug user lookups
    console.log("Settings page - Target user found:", {
      found: !!targetUser,
      id: targetUser?.id,
      username: targetUser?.username,
    });
    console.log("Settings page - Current user found:", {
      found: !!currentUser,
      id: currentUser?.id,
      username: currentUser?.username,
    });

    // Check if current user exists
    if (!currentUser) {
      console.log(
        "Settings page - Current user not found in database, clearing session"
      );
      redirect("/login");
    }

    // Check if target user exists
    if (!targetUser) {
      console.log("Settings page - Target user not found, redirecting to 404");
      notFound();
    }

    // Check authorization
    if (currentUser.id !== targetUser.id) {
      console.log("Settings page - Authorization failed", {
        currentUserId: currentUser.id,
        targetUserId: targetUser.id,
        currentUsername: currentUser.username,
        targetUsername: targetUser.username,
      });

      return (
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Access Denied
            </h2>
            <p className="text-red-300 mb-4">
              You can only access your own settings page. You are trying to
              access settings for &quot;{targetUser.username}&quot; but you are
              logged in as &quot;{currentUser.username}&quot;.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={`/${currentUser.username}/setting`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Your Settings
              </Link>
              <Link
                href={`/${username}`}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View {username}&apos;s Profile
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }

    console.log("Settings page - All checks passed, rendering page");

    return (
      <div className="max-w-7xl mx-auto p-4 lg:p-6 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              href={`/${username}`}
              className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Back to profile"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-400" />
                Account Settings
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
            <span>{targetUser._count.workExperiences} experiences</span>
            <span>•</span>
            <span>{targetUser._count.formalEducations} educations</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation - Client Component */}
          <div className="lg:col-span-1">
            <SettingsNavigation />
          </div>

          {/* Settings Content */}
          <Suspense fallback={<SettingsSkeletonLoader />}>
            <SettingsContent user={targetUser} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Settings page error:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return <ServerErrorDisplay error={error as Error} />;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return {
    title: `Settings - ${username}`,
    description: `Account settings and preferences for ${username}`,
    robots: "noindex, nofollow",
  };
}

export async function generateStaticParams() {
  return [];
}

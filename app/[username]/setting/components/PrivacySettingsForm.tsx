"use client";

import { useState } from "react";
import {
  Shield,
  Eye,
  Users,
  Handshake,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { updatePrivacySettings } from "../actions";

interface User {
  id: string;
  username: string;
  openToWork?: boolean;
  openToMentoring?: boolean;
  openToCollaboration?: boolean;
}

interface PrivacySettingsFormProps {
  user: User;
}

export default function PrivacySettingsForm({
  user,
}: PrivacySettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updatePrivacySettings(formData);

    if (result.success) {
      setMessage({
        type: "success",
        text: result.message || "Privacy settings updated successfully!",
      });
    } else {
      setMessage({
        type: "error",
        text: result.error || "Failed to update privacy settings",
      });
    }

    setIsLoading(false);
  };

  return (
    <div
      id="privacy"
      className="bg-[#161B22] rounded-lg border border-gray-800 p-4 sm:p-6"
    >
      <div className="flex items-center mb-4 sm:mb-6">
        <Shield className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-semibold">Privacy Settings</h2>
      </div>

      <p className="text-gray-400 text-sm mb-4 sm:mb-6 leading-relaxed">
        Control what information is visible on your public profile and how
        others can reach out to you.
      </p>

      {message && (
        <div
          className={`mb-4 p-3 sm:p-4 rounded-lg flex items-start ${
            message.type === "success"
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : "bg-red-900/30 border border-red-700 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          )}
          <span className="text-sm leading-relaxed">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Open to Work */}
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-[#0D1117] rounded-lg border border-gray-700">
          <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-start">
            <div className="flex items-center">
              <Eye className="w-5 h-5 text-green-400 mr-2 sm:mr-0 sm:mb-1 flex-shrink-0" />
              <div className="sm:hidden">
                <h3 className="text-sm font-medium text-white">Open to Work</h3>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer sm:hidden">
              <input
                type="checkbox"
                name="openToWork"
                defaultChecked={user.openToWork}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white hidden sm:block">
                  Open to Work
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Show recruiters and hiring managers that you&apos;re open to
                  new job opportunities.
                </p>
              </div>
              <label className="relative items-center cursor-pointer hidden sm:inline-flex">
                <input
                  type="checkbox"
                  name="openToWork"
                  defaultChecked={user.openToWork}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Open to Mentoring */}
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-[#0D1117] rounded-lg border border-gray-700">
          <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-start">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-400 mr-2 sm:mr-0 sm:mb-1 flex-shrink-0" />
              <div className="sm:hidden">
                <h3 className="text-sm font-medium text-white">
                  Open to Mentoring
                </h3>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer sm:hidden">
              <input
                type="checkbox"
                name="openToMentoring"
                defaultChecked={user.openToMentoring}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white hidden sm:block">
                  Open to Mentoring
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Let others know you&apos;re available to mentor and guide
                  junior developers.
                </p>
              </div>
              <label className="relative items-center cursor-pointer hidden sm:inline-flex">
                <input
                  type="checkbox"
                  name="openToMentoring"
                  defaultChecked={user.openToMentoring}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Open to Collaboration */}
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-[#0D1117] rounded-lg border border-gray-700">
          <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-start">
            <div className="flex items-center">
              <Handshake className="w-5 h-5 text-purple-400 mr-2 sm:mr-0 sm:mb-1 flex-shrink-0" />
              <div className="sm:hidden">
                <h3 className="text-sm font-medium text-white">
                  Open to Collaboration
                </h3>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer sm:hidden">
              <input
                type="checkbox"
                name="openToCollaboration"
                defaultChecked={user.openToCollaboration}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white hidden sm:block">
                  Open to Collaboration
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Show that you&apos;re interested in collaborating on projects
                  and partnerships.
                </p>
              </div>
              <label className="relative items-center cursor-pointer hidden sm:inline-flex">
                <input
                  type="checkbox"
                  name="openToCollaboration"
                  defaultChecked={user.openToCollaboration}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-700 border border-gray-700 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              "Update Privacy Settings"
            )}
          </button>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-400">
              Privacy Notice
            </h3>
            <p className="text-xs text-blue-300 mt-1 leading-relaxed">
              These settings control the visibility of status indicators on your
              public profile. Your contact information and other profile details
              have separate privacy controls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

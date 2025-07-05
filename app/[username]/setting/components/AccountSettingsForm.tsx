"use client";

import { useState } from "react";
import { Lock, Mail, Key, AlertCircle, CheckCircle } from "lucide-react";
import { updateAccount } from "../actions";

interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
}

interface AccountSettingsFormProps {
  user: User;
}

export default function AccountSettingsForm({
  user,
}: AccountSettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const result = await updateAccount(formData);

    if (result.success) {
      setMessage({
        type: "success",
        text: result.message || "Account updated successfully!",
      });
      // Reset password fields
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({
        type: "error",
        text: result.error || "Failed to update account",
      });
      if (result.details) {
        setErrors(result.details);
      }
    }

    setIsLoading(false);
  };

  return (
    <div
      id="account"
      className="bg-[#161B22] rounded-lg border border-gray-800 p-6"
    >
      <div className="flex items-center mb-6">
        <Lock className="w-5 h-5 text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold">Account & Security</h2>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg flex items-center ${
            message.type === "success"
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : "bg-red-900/30 border border-red-700 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <Mail className="w-4 h-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email[0]}</p>
          )}
        </div>

        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <Key className="w-4 h-4 inline mr-1" />
            Current Password *
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            required
            className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Enter your current password"
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.currentPassword[0]}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <Key className="w-4 h-4 inline mr-1" />
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Enter new password (leave blank to keep current)"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-400">{errors.newPassword[0]}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Password must contain at least 8 characters with uppercase,
            lowercase, and number
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <Key className="w-4 h-4 inline mr-1" />
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Confirm your new password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-700 border border-gray-700 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              "Update Account"
            )}
          </button>
        </div>
      </form>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-400">
              Security Notice
            </h3>
            <p className="text-xs text-yellow-300 mt-1">
              Changing your email will require verification. Changing your
              password will log you out of all other sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

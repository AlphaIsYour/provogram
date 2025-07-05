/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useTransition } from "react";
import {
  AlertTriangle,
  Trash2,
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  X,
} from "lucide-react";
import { deleteAccount } from "../actions";
import { useRouter } from "next/navigation";

interface DangerZoneProps {
  user: any;
}

export default function DangerZone({ user }: DangerZoneProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteAccount = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await deleteAccount(formData);
        if (result.success) {
          // grayirect to home page or login page after successful deletion
          router.push("/");
        } else {
          setError(result.error!);
        }
      } catch (error) {
        setError("An unexpected error occurgray");
      }
    });
  };

  const isConfirmValid = confirmText === "DELETE";
  const canDelete = isConfirmValid && password.length > 0;

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161B22] border border-gray-700 rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-3 flex-shrink-0" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-400">
            Delete Account
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-4 text-sm sm:text-base">
            This action cannot be undone. This will permanently delete your
            account and remove all of your data from our servers.
          </p>

          <div className="bg-gray-900/20 border border-gray-700 rounded-lg p-3 sm:p-4 mb-4">
            <h4 className="font-semibold text-gray-300 mb-2 text-sm sm:text-base">
              What will be deleted:
            </h4>
            <ul className="text-sm text-gray-200 space-y-1">
              <li>• Your profile information</li>
              <li>• All work experiences</li>
              <li>• All education records</li>
              <li>• Account settings and preferences</li>
              <li>• All associated data</li>
            </ul>
          </div>

          {error && (
            <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-3 mb-4 flex items-start text-gray-300">
              <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        <form action={handleDeleteAccount} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Type{" "}
              <span className="font-mono font-bold text-gray-400">DELETE</span>{" "}
              to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                confirmText === "DELETE"
                  ? "border-gray-500 focus:ring-gray-500"
                  : "border-gray-700 focus:ring-blue-500"
              }`}
              placeholder="DELETE"
              autoComplete="off"
            />
            {confirmText && confirmText !== "DELETE" && (
              <p className="text-gray-400 text-sm mt-1">
                Please type &quot;DELETE&quot; exactly as shown
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Enter your password to confirm:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <input type="hidden" name="confirmation" value={confirmText} />

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowConfirmModal(false);
                setConfirmText("");
                setPassword("");
                setError(null);
              }}
              className="w-full sm:w-auto px-4 py-2 text-gray-400 hover:text-white transition-colors rounded-lg border border-gray-700 hover:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canDelete || isDeleting}
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div
        id="danger"
        className="bg-[#161B22] rounded-lg p-4 sm:p-6 border border-gray-700"
      >
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-5 h-5 text-gray-400 mr-2" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-400">
            Danger Zone
          </h2>
        </div>

        <div className="space-y-6">
          {/* Account Security Info */}
          <div className="bg-red-900/10 border border-red-800 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <Shield className="w-5 h-5 text-red-400 mr-0 sm:mr-3 mb-2 sm:mb-0 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">
                  Account Security
                </h3>
                <p className="text-red-300 text-sm mb-3">
                  Before making irreversible changes to your account, please
                  consider:
                </p>
                <ul className="text-sm text-red-400 space-y-1">
                  <li>• Make sure you have backed up any important data</li>
                  <li>• Consider downloading your profile information</li>
                  <li>• Review your account settings one more time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-400 mb-2 flex items-center text-sm sm:text-base">
                  <Trash2 className="w-4 h-4 mr-2 flex-shrink-0" />
                  Delete Account
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>

                <div className="bg-gray-red/20 border border-red-800 rounded-lg p-3 mb-4">
                  <p className="text-red-200 text-sm font-medium mb-2">
                    ⚠️ Warning: This will delete:
                  </p>
                  <ul className="text-red-200 text-sm space-y-1 ml-4">
                    <li>• Your entire profile ({user.username})</li>
                    <li>• All work experience records</li>
                    <li>• All education records</li>
                    <li>• Account settings and preferences</li>
                    <li>• Any other associated data</li>
                  </ul>
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Lock className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>Requires password confirmation</span>
                </div>
              </div>

              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center font-medium"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Additional Security Notice */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-0 sm:mr-3 mb-2 sm:mb-0 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">
                  Need Help?
                </h3>
                <p className="text-gray-300 text-sm">
                  If you&apos;re having issues with your account or just need to
                  take a break, consider updating your privacy settings instead
                  of deleting your account completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && <ConfirmationModal />}
    </>
  );
}

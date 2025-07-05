// app/components/layout/CompleteProfileModal.tsx
"use client";

import { useState } from "react";
import { User, X, Save, Loader2 } from "lucide-react";

interface CompleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Kita butuh server action untuk update username
  onSave: (username: string) => Promise<{ success: boolean; error?: string }>;
}

export default function CompleteProfileModal({
  isOpen,
  onClose,
  onSave,
}: CompleteProfileModalProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!username.trim() || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await onSave(username);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to save profile.");
    }
    // Jika sukses, onClose akan dipanggil dari parent component
  };

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal positioned to the left of sidebar */}
      <div
        className={`absolute top-1/4 right-[340px] -translate-y-1/2 transition-all duration-300 ease-out ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100 pointer-events-auto"
            : "translate-x-8 opacity-0 scale-95"
        }`}
      >
        <div className="bg-[#161B22] rounded-lg border border-gray-700 w-80 p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
              <User size={20} /> Complete Your Profile
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          <p className="text-gray-400 mb-6">
            To access your profile, please set a unique username.
          </p>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-white"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="e.g., johndoe"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          <button
            onClick={handleSave}
            disabled={loading || !username.trim()}
            className="w-full mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Save size={16} className="mr-2" /> Save & Continue
              </>
            )}
          </button>
        </div>

        {/* Arrow pointing to sidebar */}
        <div className="absolute top-[17vh] -translate-y-1/2 -right-2 w-0 h-0 border-l-8 border-l-gray-700 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>
    </div>
  );
}

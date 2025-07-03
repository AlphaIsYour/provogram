/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[username]/setting/components/ProfileSettingsForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  User,
  Save,
  Upload,
  Trash2,
  Camera,
  Github,
  Twitter,
  Linkedin,
  Globe,
  FileText,
  Phone,
  Clock,
  MapPin,
  Building,
  Briefcase,
  Mail,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { updateProfile } from "../actions";
import { User as UserType } from "@prisma/client";
import { useState, useRef, useMemo, useEffect } from "react";
import React from "react";

// Submit button component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center"
    >
      <Save className="w-4 h-4 mr-2" />
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

// Success/Error message component
function FormMessage({ state }: { state: any }) {
  if (!state) return null;

  if (state.success) {
    return (
      <div className="mb-4 p-3 bg-green-900/30 text-green-400 border border-green-700 rounded-lg">
        {state.message}
      </div>
    );
  }

  if (!state.success && state.error) {
    return (
      <div className="mb-4 p-3 bg-red-900/30 text-red-400 border border-red-700 rounded-lg">
        {state.error}
      </div>
    );
  }

  return null;
}

// Input field with error handling
function InputField({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  icon: Icon,
  errors,
  rows,
  required = false,
  maxLength,
  pattern,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | null;
  placeholder?: string;
  icon?: any;
  errors?: string[];
  rows?: number;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  disabled?: boolean;
}) {
  const InputComponent = rows ? "textarea" : "input";

  return (
    <div>
      <label className="block text-sm font-medium mb-2 items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <InputComponent
        type={type}
        name={name}
        defaultValue={defaultValue || ""}
        placeholder={placeholder}
        rows={rows}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
        className={`w-full bg-[#0D1117] border ${
          errors && errors.length > 0
            ? "border-red-500 focus:border-red-400"
            : "border-gray-700 focus:border-blue-500"
        } rounded-lg px-4 py-3 text-white focus:outline-none transition-colors resize-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      {errors && errors.length > 0 && (
        <p className="text-red-400 text-xs mt-1">{errors[0]}</p>
      )}
      {maxLength && (
        <p className="text-gray-500 text-xs mt-1">
          Maximum {maxLength} characters
        </p>
      )}
    </div>
  );
}

// URL input field with improved validation
function URLField({
  label,
  name,
  defaultValue,
  placeholder,
  icon: Icon,
  errors,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  icon?: any;
  errors?: string[];
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [isValid, setIsValid] = useState(true);

  const validateURL = (value: string) => {
    if (!value) {
      setIsValid(true);
      return;
    }

    // More permissive URL validation
    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/i;
    const isValidFormat = urlPattern.test(value);

    if (!isValidFormat) {
      // Try adding https:// if it's missing
      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        const withHttps = `https://${value}`;
        setIsValid(urlPattern.test(withHttps));
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    validateURL(value);
  };

  const handleBlur = () => {
    // Auto-add https:// if missing
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      const newUrl = `https://${url}`;
      setUrl(newUrl);
      validateURL(newUrl);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
        {label}
      </label>
      <input
        type="url"
        name={name}
        value={url}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full bg-[#0D1117] border ${
          !isValid && url
            ? "border-red-500 focus:border-red-400"
            : errors && errors.length > 0
            ? "border-red-500 focus:border-red-400"
            : "border-gray-700 focus:border-blue-500"
        } rounded-lg px-4 py-3 text-white focus:outline-none transition-colors`}
      />
      {!isValid && url && (
        <p className="text-red-400 text-xs mt-1">Please enter a valid URL</p>
      )}
      {errors && errors.length > 0 && (
        <p className="text-red-400 text-xs mt-1">{errors[0]}</p>
      )}
    </div>
  );
}

// Utility function to format date for input
function formatDateForInput(date: Date | string | null): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObj.getTime())) return "";

    // Format as YYYY-MM-DD in UTC to avoid timezone issues
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export default function ProfileSettingsForm({ user }: { user: UserType }) {
  const [state, formAction] = React.useActionState(
    async (_prevState: any, formData: FormData) => {
      // Debug log untuk website URL
      console.log("Website URL being submitted:", formData.get("websiteUrl"));
      return updateProfile(formData);
    },
    null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Set encType after component mounts to avoid hydration mismatch
  useEffect(() => {
    if (formRef.current) {
      formRef.current.encType = "multipart/form-data";
    }
  }, []);

  // Memoize the formatted date to prevent hydration issues
  const formattedDateOfBirth = useMemo(() => {
    return formatDateForInput(user.dateOfBirth);
  }, [user.dateOfBirth]);

  // Handle image upload preview with validation
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsImageUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsImageUploading(false);
      };
      reader.onerror = () => {
        alert("Error reading file");
        setIsImageUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image");
      setIsImageUploading(false);
    }
  };

  // Remove image preview
  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Extract form errors from state
  const errors = state?.details || {};

  return (
    <form ref={formRef} action={formAction}>
      <section
        id="profile"
        className="bg-[#161B22] rounded-lg p-6 border border-gray-800 "
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Information
          </h2>
          <SubmitButton />
        </div>

        <FormMessage state={state} />

        {/* Avatar Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3">
            Profile Picture
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Image
                src={imagePreview || user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-avatar.png";
                }}
              />
              {isImageUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="bg-[#0D1117] hover:bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors cursor-pointer flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload New
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isImageUploading}
                />
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImagePreview}
                  className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg border border-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </button>
              )}
            </div>
          </div>
          {errors.image && (
            <p className="text-red-400 text-xs mt-2">{errors.image[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <InputField
              label="Full Name"
              name="name"
              defaultValue={user.name}
              placeholder="Enter your full name"
              icon={User}
              errors={errors.name}
              required
              maxLength={100}
            />

            <InputField
              label="Username"
              name="username"
              defaultValue={user.username}
              placeholder="Enter your username"
              icon={User}
              errors={errors.username}
              required
              maxLength={50}
              pattern="^[a-zA-Z0-9_-]+$"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              defaultValue={user.email}
              placeholder="Enter your email address"
              icon={Mail}
              errors={errors.email}
              required
              disabled
            />

            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              defaultValue={user.phone}
              placeholder="+62 xxx-xxxx-xxxx"
              icon={Phone}
              errors={errors.phone}
              maxLength={20}
            />

            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              defaultValue={formattedDateOfBirth}
              icon={Calendar}
              errors={errors.dateOfBirth}
            />
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <InputField
              label="Job Title"
              name="jobTitle"
              defaultValue={user.jobTitle}
              placeholder="e.g. Software Developer"
              icon={Briefcase}
              errors={errors.jobTitle}
              maxLength={100}
            />

            <InputField
              label="Company"
              name="company"
              defaultValue={user.company}
              placeholder="Enter your company name"
              icon={Building}
              errors={errors.company}
              maxLength={100}
            />

            <InputField
              label="Location"
              name="location"
              defaultValue={user.location}
              placeholder="e.g. Jakarta, Indonesia"
              icon={MapPin}
              errors={errors.location}
              maxLength={100}
            />

            <InputField
              label="Timezone"
              name="timezone"
              defaultValue={user.timezone}
              placeholder="e.g. Asia/Jakarta"
              icon={Clock}
              errors={errors.timezone}
              maxLength={50}
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <InputField
            label="Bio"
            name="bio"
            defaultValue={user.bio}
            placeholder="Tell us about yourself..."
            icon={FileText}
            errors={errors.bio}
            rows={4}
            maxLength={500}
          />
        </div>

        {/* Social Links Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <URLField
              label="Website"
              name="websiteUrl"
              defaultValue={user.websiteUrl}
              placeholder="https://yourwebsite.com"
              icon={Globe}
              errors={errors.websiteUrl}
            />

            <URLField
              label="GitHub"
              name="githubUrl"
              defaultValue={user.githubUrl}
              placeholder="https://github.com/username"
              icon={Github}
              errors={errors.githubUrl}
            />

            <URLField
              label="LinkedIn"
              name="linkedinUrl"
              defaultValue={user.linkedinUrl}
              placeholder="https://linkedin.com/in/username"
              icon={Linkedin}
              errors={errors.linkedinUrl}
            />

            <URLField
              label="Twitter"
              name="twitterUrl"
              defaultValue={user.twitterUrl}
              placeholder="https://twitter.com/username"
              icon={Twitter}
              errors={errors.twitterUrl}
            />
          </div>
        </div>

        {/* Additional hidden fields for form handling */}
        <input type="hidden" name="userId" value={user.id} />
      </section>
    </form>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

const countries = [
  { code: "US", name: "United States" },
  { code: "ID", name: "Indonesia" },
  { code: "GB", name: "United Kingdom" },
  { code: "JP", name: "Japan" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "AU", name: "Australia" },
  { code: "SG", name: "Singapore" },
];

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    country: "",
  });

  type Errors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
    country?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select your country/region";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission logic here
    }
  };

  return (
    <div
      className="grid grid-cols-2 items-center justify-center h-screen bg-[#0D1117]"
      style={{ fontFamily: "mona-sans" }}
    >
      {/* Kiri - dengan efek shadow setengah lingkaran */}
      <div className="flex flex-col bg-black text-white h-full items-center justify-center relative overflow-hidden">
        {/* Efek shadow setengah lingkaran di bagian bawah kiri */}
        <div className="absolute bottom-0 left-0 w-96 h-48 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-transparent rounded-full transform translate-x-[-50%] translate-y-[50%] blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-36 bg-gradient-to-tr from-blue-600/30 via-purple-600/15 to-transparent rounded-full transform translate-x-[-40%] translate-y-[40%] blur-lg"></div>
      </div>

      {/* Kanan - form signup */}
      <div className="flex flex-col bg-white h-full items-center justify-center relative">
        {/* Link Sign in di pojok kanan atas */}
        <div className="absolute top-4 right-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in →
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-150 flex flex-col justify-center"
        >
          <h1 className="text-bold text-4xl mb-5">Sign up to Provogram</h1>

          <div className="mb-4">
            <h3 className="mb-1">Email</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`border rounded p-2 w-150 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="mb-1">Password</h3>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`border rounded p-2 w-150 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="mb-1">Confirm Password</h3>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={`border rounded p-2 w-150 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="mb-1">Username</h3>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={`border rounded p-2 w-150 ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="mb-1">Your Country/Region</h3>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`border rounded p-2 w-150 ${
                errors.country ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Select your country/region</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Tombol dan teks di bawahnya rata kanan */}
          <div className="w-150 flex flex-col items-center">
            <button
              type="submit"
              className="bg-black text-white rounded p-2 mb-4 px-8 hover:bg-gray-800 transition-colors duration-200"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600 text-right mb-4 max-w-xl">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          <p className="text-gray-500 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef } from "react";
import type { User } from "@prisma/client";
import { sendMessageAction, type State } from "./actions";
import { ArrowRight, Send, CheckCircle2, AlertCircle } from "lucide-react";

// Tombol Submit terpisah agar bisa menggunakan useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-orange-500 hover:to-yellow-600 cursor-pointer text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          <span>Send Message</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

// Komponen Form Utama
export default function ContactForm({ user }: { user: User }) {
  const initialState: State = { message: null, errors: {}, success: false };
  const [state, formAction] = useActionState(sendMessageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <input type="hidden" name="recipientId" value={user.id} />

      {/* Pesan Sukses atau Error Global */}
      {state.message && (
        <div
          className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
            state.success
              ? "bg-green-900/50 text-green-300"
              : "bg-red-900/50 text-red-300"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <p>{state.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="senderName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Your Name
          </label>
          <input
            id="senderName"
            name="senderName"
            type="text"
            required
            className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            placeholder="Enter your name"
          />
          {state.errors?.senderName && (
            <p className="text-red-400 text-xs mt-1">
              {state.errors.senderName[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="senderEmail"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            id="senderEmail"
            name="senderEmail"
            type="email"
            required
            className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            placeholder="your.email@example.com"
          />
          {state.errors?.senderEmail && (
            <p className="text-red-400 text-xs mt-1">
              {state.errors.senderEmail[0]}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          placeholder="Project Inquiry"
        />
        {state.errors?.subject && (
          <p className="text-red-400 text-xs mt-1">{state.errors.subject[0]}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="Tell me about your project, question, or how I can help you..."
        ></textarea>
        {state.errors?.message && (
          <p className="text-red-400 text-xs mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useTransition } from "react";
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  Building,
  BookOpen,
  Award,
  ExternalLink,
  Save,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { addEducation, updateEducation, deleteEducation } from "../actions";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: Date;
  endDate?: Date | null;
  gpa?: string;
  description?: string;
  logoUrl?: string;
  status: "GRADUATED" | "IN_PROGRESS";
  achievements?: string[];
  courses?: string[];
}

interface EducationManagerProps {
  user: any;
  educations: Education[];
}

export default function EducationManager({
  user,
  educations,
}: EducationManagerProps) {
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducation, setEditingEducation] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData, isEdit = false) => {
    startTransition(async () => {
      try {
        const result = isEdit
          ? await updateEducation(formData)
          : await addEducation(formData);

        if (result.success) {
          setMessage({ type: "success", text: result.message! });
          setIsAddingEducation(false);
          setEditingEducation(null);
          formRef.current?.reset();
        } else {
          setMessage({ type: "error", text: result.error! });
        }
      } catch (error) {
        setMessage({ type: "error", text: "An unexpected error occurred" });
      }
    });
  };

  const handleDelete = async (educationId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteEducation(educationId);
        if (result.success) {
          setMessage({ type: "success", text: result.message! });
          setDeleteConfirm(null);
        } else {
          setMessage({ type: "error", text: result.error! });
        }
      } catch (error) {
        setMessage({ type: "error", text: "Failed to delete education" });
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const EducationForm = ({
    education,
    isEdit = false,
  }: {
    education?: Education;
    isEdit?: boolean;
  }) => (
    <form
      ref={formRef}
      action={(formData) => handleSubmit(formData, isEdit)}
      className="space-y-4 bg-[#0D1117] p-4 rounded-lg border border-gray-700"
    >
      {isEdit && <input type="hidden" name="id" value={education?.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Institution *
          </label>
          <input
            type="text"
            name="institution"
            defaultValue={education?.institution}
            required
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="University of California"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Degree *</label>
          <input
            type="text"
            name="degree"
            defaultValue={education?.degree}
            required
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Bachelor of Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Field of Study *
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            defaultValue={education?.fieldOfStudy}
            required
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={education?.location}
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Berkeley, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date *</label>
          <input
            type="date"
            name="startDate"
            defaultValue={
              education?.startDate
                ? new Date(education.startDate).toISOString().split("T")[0]
                : ""
            }
            required
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            defaultValue={
              education?.endDate
                ? new Date(education.endDate).toISOString().split("T")[0]
                : ""
            }
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GPA</label>
          <input
            type="text"
            name="gpa"
            defaultValue={education?.gpa}
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3.8/4.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status *</label>
          <select
            name="status"
            defaultValue={education?.status || "GRADUATED"}
            required
            className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="GRADUATED">Graduated</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Logo URL</label>
        <input
          type="url"
          name="logoUrl"
          defaultValue={education?.logoUrl}
          className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://university.edu/logo.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={education?.description}
          rows={3}
          className="w-full bg-[#161B22] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Additional details about your education..."
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={() => {
            setIsAddingEducation(false);
            setEditingEducation(null);
          }}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4 mr-1 inline" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-1" />
          {isPending ? "Saving..." : isEdit ? "Update" : "Add"} Education
        </button>
      </div>
    </form>
  );

  return (
    <div
      id="education"
      className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GraduationCap className="w-5 h-5 text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold">Education</h2>
        </div>
        <button
          onClick={() => setIsAddingEducation(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center ${
            message.type === "success"
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : "bg-red-900/30 border border-red-700 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-4 h-4 mr-2" />
          ) : (
            <AlertCircle className="w-4 h-4 mr-2" />
          )}
          {message.text}
        </div>
      )}

      {isAddingEducation && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Add New Education</h3>
          <EducationForm />
        </div>
      )}

      <div className="space-y-4">
        {educations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No education records found</p>
            <p className="text-sm">
              Add your educational background to get started
            </p>
          </div>
        ) : (
          educations.map((education) => (
            <div
              key={education.id}
              className="border border-gray-700 rounded-lg p-4"
            >
              {editingEducation === education.id ? (
                <EducationForm education={education} isEdit={true} />
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      {education.logoUrl && (
                        <img
                          src={education.logoUrl}
                          alt={`${education.institution} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {education.degree}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              education.status === "GRADUATED"
                                ? "bg-green-900/30 text-green-300"
                                : "bg-blue-900/30 text-blue-300"
                            }`}
                          >
                            {education.status === "GRADUATED"
                              ? "Graduated"
                              : "In Progress"}
                          </span>
                        </div>

                        <div className="flex items-center text-blue-400 mb-2">
                          <Building className="w-4 h-4 mr-1" />
                          <span className="font-medium">
                            {education.institution}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-400 mb-2">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{education.fieldOfStudy}</span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {formatDate(education.startDate)} -{" "}
                              {education.endDate
                                ? formatDate(education.endDate)
                                : "Present"}
                            </span>
                          </div>

                          {education.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{education.location}</span>
                            </div>
                          )}

                          {education.gpa && (
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              <span>GPA: {education.gpa}</span>
                            </div>
                          )}
                        </div>

                        {education.description && (
                          <p className="text-gray-300 text-sm mt-2">
                            {education.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setEditingEducation(education.id)}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit education"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {deleteConfirm === education.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDelete(education.id)}
                          disabled={isPending}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-3 py-1 rounded text-sm"
                        >
                          {isPending ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(education.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete education"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

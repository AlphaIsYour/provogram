/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building,
  ExternalLink,
  Save,
  X,
} from "lucide-react";
import {
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "../actions";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP";
  location?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  achievements: string[];
  logoUrl?: string;
}

interface WorkExperienceManagerProps {
  user: any;
  workExperiences: WorkExperience[];
}

const workTypeLabels = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};

const workTypeColors = {
  FULL_TIME: "bg-green-900/30 text-green-400 border-green-700",
  PART_TIME: "bg-blue-900/30 text-blue-400 border-blue-700",
  CONTRACT: "bg-orange-900/30 text-orange-400 border-orange-700",
  FREELANCE: "bg-purple-900/30 text-purple-400 border-purple-700",
  INTERNSHIP: "bg-yellow-900/30 text-yellow-400 border-yellow-700",
};

export default function WorkExperienceManager({
  user,
  workExperiences,
}: WorkExperienceManagerProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isEdit: boolean = false
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(isEdit ? editingId : "adding");
    setMessage(null);

    try {
      const result = isEdit
        ? await updateWorkExperience(formData)
        : await addWorkExperience(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Success!" });
        setIsAddingNew(false);
        setEditingId(null);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "An error occurred",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save work experience" });
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work experience?"))
      return;

    setLoading(id);
    try {
      const result = await deleteWorkExperience(id);
      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Deleted successfully!",
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to delete" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete work experience" });
    } finally {
      setLoading(null);
    }
  };

  const WorkExperienceForm = ({
    experience,
    isEdit = false,
  }: {
    experience?: WorkExperience;
    isEdit?: boolean;
  }) => (
    <form onSubmit={(e) => handleSubmit(e, isEdit)} className="space-y-4">
      {isEdit && experience && (
        <input type="hidden" name="id" value={experience.id} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company *
          </label>
          <input
            type="text"
            name="company"
            defaultValue={experience?.company}
            required
            className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Position *
          </label>
          <input
            type="text"
            name="position"
            defaultValue={experience?.position}
            required
            className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Employment Type *
          </label>
          <select
            name="type"
            defaultValue={experience?.type || "FULL_TIME"}
            required
            className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {Object.entries(workTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={experience?.location}
            className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            defaultValue={
              experience?.startDate
                ? new Date(experience.startDate).toISOString().split("T")[0]
                : ""
            }
            required
            className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            defaultValue={
              experience?.endDate
                ? new Date(experience.endDate).toISOString().split("T")[0]
                : ""
            }
            className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty if currently working
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Company Logo URL
        </label>
        <input
          type="url"
          name="logoUrl"
          defaultValue={experience?.logoUrl}
          className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={experience?.description}
          rows={3}
          className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          placeholder="Brief description of your role and responsibilities..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Key Achievements
        </label>
        <textarea
          name="achievements"
          defaultValue={experience?.achievements?.join("\n")}
          rows={4}
          className="w-full px-3 py-2.5 bg-[#0D1117] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
        />
        <p className="text-xs text-gray-500 mt-1">
          Each line will be treated as a separate achievement
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
        <button
          type="button"
          onClick={() => {
            setIsAddingNew(false);
            setEditingId(null);
          }}
          className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors text-sm order-2 sm:order-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading === (isEdit ? editingId : "adding")}
          className="px-4 py-2.5 bg-blue-700 border border-gray-700 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center text-sm order-1 sm:order-2"
        >
          {loading === (isEdit ? editingId : "adding") ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {isEdit ? "Update" : "Add"} Experience
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <div
      id="experience"
      className="bg-[#161B22] rounded-lg p-4 sm:p-6 border border-gray-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl font-semibold">Work Experience</h2>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            message.type === "success"
              ? "bg-green-900/30 text-green-400 border border-green-700"
              : "bg-red-900/30 text-red-400 border border-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {isAddingNew && (
        <div className="bg-[#0D1117] rounded-lg p-4 sm:p-6 border border-gray-700 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium mb-4">
            Add New Work Experience
          </h3>
          <WorkExperienceForm />
        </div>
      )}

      <div className="space-y-4">
        {workExperiences.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No work experience added yet.</p>
            <p className="text-sm">
              Click &quot;Add Experience&quot; to get started.
            </p>
          </div>
        ) : (
          workExperiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-[#0D1117] rounded-lg p-4 sm:p-6 border border-gray-700"
            >
              {editingId === experience.id ? (
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-4">
                    Edit Work Experience
                  </h3>
                  <WorkExperienceForm experience={experience} isEdit={true} />
                </div>
              ) : (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-start">
                      {experience.logoUrl && (
                        <img
                          src={experience.logoUrl}
                          alt={`${experience.company} logo`}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg mr-3 sm:mr-4 object-cover flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                          {experience.position}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-gray-400 mb-2 space-y-1 sm:space-y-0">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="text-sm">
                              {experience.company}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs border w-fit mt-1 sm:mt-0 sm:ml-3 ${
                              workTypeColors[experience.type]
                            }`}
                          >
                            {workTypeLabels[experience.type]}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-0">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>
                              {formatDate(experience.startDate)} -{" "}
                              {experience.endDate
                                ? formatDate(experience.endDate)
                                : "Present"}
                            </span>
                          </div>
                          {experience.location && (
                            <div className="flex items-center">
                              <span className="hidden sm:inline mx-2">•</span>
                              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span>{experience.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingId(experience.id)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Edit experience"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id)}
                        disabled={loading === experience.id}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete experience"
                      >
                        {loading === experience.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {experience.description && (
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  )}

                  {experience.achievements &&
                    experience.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 pl-2">
                          {experience.achievements.map((achievement, index) => (
                            <li key={index} className="text-sm leading-relaxed">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

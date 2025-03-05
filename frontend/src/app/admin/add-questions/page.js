"use client";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import useAdminRedirect from "@/hooks/useAdminRedirect";

const BulkQuestionUpload = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [codes, setCodes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [questionsJson, setQuestionsJson] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { loading } = useAdminRedirect({
    redirectLink: "/",
    toastMessage: "Login from an admin account to access admin features.",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/courses/");
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedCourse) return;
      try {
        const response = await api.get(
          `/api/subjects/?course_id=${selectedCourse}`
        );
        setSubjects(response.data);
        setSelectedSubject("");
        setChapters([]);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };
    fetchSubjects();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubject) return;
      try {
        const response = await api.get(
          `/api/chapters/subject/${selectedSubject}`
        );
        setChapters(response.data);
        setSelectedChapter("");
      } catch (err) {
        console.error("Failed to fetch chapters", err);
      }
    };
    fetchChapters();
  }, [selectedSubject]);

  useEffect(() => {
    const fetchCodes = async () => {
      if (!selectedChapter) return;
      try {
        const response = await api.get(
          `/api/concepts/chapter/${selectedChapter}`
        );
        setCodes(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.warn("No concepts found for this chapter.");
          setCodes([]);
        } else {
          console.error("Failed to fetch codes for the chapter", err);
        }
      }
    };
    fetchCodes();
  }, [selectedChapter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("/api/upload-questions-chapter/", {
        chapter_id: selectedChapter,
        concept_codes: [selectedCode],
        questions_json: questionsJson,
      });
      setSuccess(true);
      setQuestionsJson("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "An error occurred.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="sm:h-[88vh] flex items-center justify-center">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="w-full max-w-md sm:max-w-2xl bg-white md:border py-4 pt-6 md:rounded-3xl border-gray-300 px-8 md:p-8 md:shadow-md">
          <h2 className="text-3xl d font-inter font-bold text-center text-gray-800">
            Bulk Question Upload
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Upload bulk questions to the selected chapter.
          </p>

          <form className="mt-8 space-y-5 sm:space-y-0 sm:flex gap-6" onSubmit={handleSubmit}>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <select
                  id="course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  required
                  disabled={!selectedCourse}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="chapter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chapter
                </label>
                <select
                  id="chapter"
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  required
                  disabled={!selectedSubject}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">Select a chapter</option>
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Concept Code
                </label>
                <select
                  id="code"
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  required
                  disabled={!selectedChapter || codes.length === 0}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">Select a concept code</option>
                  {codes.map((code) => (
                    <option key={code.id} value={code.id}>
                      {code.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
                <label
                  htmlFor="questionsJson"
                  className="block text-sm font-medium text-gray-700"
                >
                  Questions JSON
                </label>
                <textarea
                  id="questionsJson"
                  value={questionsJson}
                  onChange={(e) => setQuestionsJson(e.target.value)}
                  rows="4"
                  placeholder='[{ "question": "Sample question?", "answer": "Sample answer" }, ...]'
                  required
                  className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && (
                <p className="text-sm text-green-600">
                  Questions uploaded successfully!
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg transition duration-300 bg-teal-700 text-white font-inter font-semibold hover:bg-teal-800"
                disabled={!selectedChapter || !questionsJson}
              >
                Upload Questions
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BulkQuestionUpload;

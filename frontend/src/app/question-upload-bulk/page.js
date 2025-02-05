"use client";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from 'sonner';

const BulkQuestionUpload = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [questionsJson, setQuestionsJson] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch courses
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

  // Fetch subjects when a course is selected
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedCourse) return;
      try {
        const response = await api.get(`/api/subjects/?course_id=${selectedCourse}`);
        setSubjects(response.data);
        setSelectedSubject(""); // Reset selected subject
        setChapters([]); // Reset chapters on course change
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };
    fetchSubjects();
  }, [selectedCourse]);

  // Fetch chapters when a subject is selected
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubject) return;
      try {
        const response = await api.get(`/api/chapters/subject/${selectedSubject}`);
        setChapters(response.data);
        setSelectedChapter(""); // Reset selected chapter
      } catch (err) {
        console.error("Failed to fetch chapters", err);
      }
    };
    fetchChapters();
  }, [selectedSubject]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(false);

    try {
      const response = await api.post("/api/upload-questions-chapter/", {
        chapter_id: selectedChapter,
        questions_json: questionsJson,
      });
      setSuccess(true);
      setQuestionsJson(""); // Clear input after success
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "An error occurred.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-8 sm:max-w-md w-full rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-teal-600">Bulk Question Upload</h2>
        <p className="text-sm text-center text-gray-500 mt-2">Upload bulk questions to the selected chapter.</p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Course Dropdown */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
              disabled={!selectedCourse}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Dropdown */}
          <div>
            <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">
              Chapter
            </label>
            <select
              id="chapter"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              required
              disabled={!selectedSubject}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select a chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </option>
              ))}
            </select>
          </div>

          {/* Questions JSON Input */}
          <div>
            <label htmlFor="questionsJson" className="block text-sm font-medium text-gray-700">
              Questions JSON
            </label>
            <textarea
              id="questionsJson"
              value={questionsJson}
              onChange={(e) => setQuestionsJson(e.target.value)}
              rows="10"
              placeholder='[{ "question": "Sample question?", "answer": "Sample answer" }, ...]'
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">Questions uploaded successfully!</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            disabled={!selectedChapter || !questionsJson}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkQuestionUpload;

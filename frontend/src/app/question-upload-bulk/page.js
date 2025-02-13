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
        const response = await api.get(`/api/subjects/?course_id=${selectedCourse}`);
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
        const response = await api.get(`/api/chapters/subject/${selectedSubject}`);
        setChapters(response.data);
        setSelectedChapter(""); 
      } catch (err) {
        console.error("Failed to fetch chapters", err);
      }
    };
    fetchChapters();
  }, [selectedSubject]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(false);

    try {
      const response = await api.post("/api/upload-questions-chapter/", {
        chapter_id: selectedChapter,
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
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-8 sm:max-w-md w-full rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-teal-600">Bulk Question Upload</h2>
        <p className="text-sm text-center text-gray-500 mt-2">Upload bulk questions to the selected chapter.</p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
   
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

       
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">Questions uploaded successfully!</p>}

        
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

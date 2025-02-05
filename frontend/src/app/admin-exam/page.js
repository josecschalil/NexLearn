"use client";

import { useState, useEffect } from "react";
import api from "../services/api";

const AdminExamPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);  
  const [chapters, setChapters] = useState([]);  
  const [selectedCourse, setSelectedCourse] = useState("");  
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(""); 
  const [selectedExamType, setSelectedExamType] = useState("fullcourse");
  const [editExamId, setEditExamId] = useState(null);
  const [newExam, setNewExam] = useState({
    exam_title: "",
    time: 60,
    difficulty: 1,
    is_featured: false,
    course: "",
    subject: "",
    chapter: ""
  });

  useEffect(() => {
    fetchExams();
    fetchCourses();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await api.get("/api/exams/");
      setExams(response.data);
    } catch (err) {
      setError("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses/");
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to fetch courses");
    }
  };

  const fetchSubjects = async (courseId) => {
    try {
      const response = await api.get(`/api/subjects/?course_id=${courseId}`);
      setSubjects(response.data);  
    } catch (err) {
      console.error("Failed to fetch subjects");
    }
  };

  const fetchChapters = async (subjectId) => {
    try {
      const response = await api.get(`/api/chapters/subject/${subjectId}`);
      setChapters(response.data);  
    } catch (err) {
      console.error("Failed to fetch chapters");
    }
  };

  const handleDelete = async (examId) => {
    const confirmed = window.confirm("Are you sure you want to delete this exam?");
    if (confirmed) {
      try {
        await api.delete(`/api/exams/${examId}/`);
        setExams(exams.filter((exam) => exam.exam_id !== examId));
      } catch (err) {
        alert("Failed to delete exam");
      }
    }
  };

  const handleEdit = (exam) => {
    setNewExam({ ...exam });
    setSelectedExamType(
      exam.is_fullCourseExam ? "fullcourse" : exam.is_fullSubjectExam ? "fullsubject" : "fullchapter"
    );
    setEditExamId(exam.exam_id);
    setSelectedCourse(exam.course || ""); 
    setSelectedSubject(exam.subject || ""); 
    setSelectedChapter(exam.chapter || ""); 
    if (exam.course) {
      fetchSubjects(exam.course); 
    }
    if (exam.subject) {
      fetchChapters(exam.subject);  
    }
  };

  const handleSubmit = async () => {
    const examData = {
      exam_title: newExam.exam_title,
      time: newExam.time,
      is_featured: false,
      is_fullCourseExam: selectedExamType === "fullcourse",
      is_fullSubjectExam: selectedExamType === "fullsubject",
      is_fullChapterExam: selectedExamType === "fullchapter",
      is_customTest: false,
      user: null,
      course: selectedExamType === "fullcourse" ? selectedCourse : null, 
      subject: selectedExamType === "fullsubject" ? selectedSubject : null, 
      chapter: selectedExamType === "fullchapter" ? selectedChapter : null, 
      questions: []
    };

    try {
      if (editExamId) {
        await api.patch(`/api/exams/${editExamId}/`, examData);
      } else {
        await api.post("/api/exams/", examData);
      }
      fetchExams();
      setNewExam({
        exam_title: "",
        time: 60,
        difficulty: 1,
        is_featured: false,
        course: "",
        subject: "",
        chapter: ""
      });
      setEditExamId(null);
      setSelectedCourse("");  
      setSelectedSubject("");  
      setSelectedChapter("");  
    } catch (err) {
      alert("Failed to create or update exam");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-teal-800 text-center">Admin - Manage Exams</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">{editExamId ? "Edit Exam" : "Create New Exam"}</h2>
        <input
          type="text"
          placeholder="Exam Title"
          value={newExam.exam_title}
          onChange={(e) => setNewExam({ ...newExam, exam_title: e.target.value })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newExam.time}
          onChange={(e) => setNewExam({ ...newExam, time: parseInt(e.target.value) || "" })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <label className="font-semibold">Difficulty Level:</label>
        <select
          value={newExam.difficulty}
          onChange={(e) => setNewExam({ ...newExam, difficulty: parseInt(e.target.value) })}
          className="border p-2 w-full mb-2 rounded-md"
        >
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <div className="mb-2">
          <label className="font-semibold">Select Exam Type:</label>
          <div className="flex space-x-4 mt-2">
            {["fullcourse", "fullsubject", "fullchapter"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="examType"
                  value={type}
                  checked={selectedExamType === type}
                  onChange={(e) => {
                    setSelectedExamType(e.target.value);
                    if (e.target.value !== "fullcourse") {
                      setSelectedCourse("");  
                    }
                    if (e.target.value !== "fullsubject") {
                      setSelectedSubject("");  
                    }
                    if (e.target.value !== "fullchapter") {
                      setSelectedChapter("");  
                    }
                  }}
                  className="mr-2"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {(selectedExamType === "fullcourse" || selectedExamType === "fullsubject" || selectedExamType === "fullchapter") && (
          <div className="mb-2">
            <label className="font-semibold">Select Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                if (selectedExamType !== "fullchapter") {
                  fetchSubjects(e.target.value); 
                }
                if (selectedExamType === "fullchapter") {
                  setSelectedSubject("");  
                  setChapters([]); 
                }
              }}
              className="border p-2 w-full mb-2 rounded-md"
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        )}

       
        {(selectedExamType === "fullsubject" || selectedExamType === "fullchapter") && selectedCourse && (
          <div className="mb-2">
            <label className="font-semibold">Select Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                if (selectedExamType === "fullchapter") {
                  fetchChapters(e.target.value); 
                }
              }}
              className="border p-2 w-full mb-2 rounded-md"
            >
              <option value="">Select a Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedExamType === "fullchapter" && selectedSubject && (
          <div className="mb-2">
            <label className="font-semibold">Select Chapter:</label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="border p-2 w-full mb-2 rounded-md"
            >
              <option value="">Select a Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          {editExamId ? "Update Exam" : "Submit"}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Existing Exams</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-teal-900 text-white">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Time</th>
              <th className="p-4 text-center">Difficulty</th>
              <th className="p-4 text-center">Exam Type</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.exam_id} className="border-b">
                <td className="p-4 text-left">{exam.exam_title}</td>
                <td className="p-4 text-center">{exam.time} min</td>
                <td className="p-4 text-center">{exam.difficulty}</td>
                <td className="p-4 text-center">
                  {exam.is_fullCourseExam
                    ? "Full Course"
                    : exam.is_fullSubjectExam
                    ? "Full Subject"
                    : "Full Chapter"}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleEdit(exam)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam.exam_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminExamPage;

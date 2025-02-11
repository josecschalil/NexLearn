"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../services/api";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { FaArrowRight, FaArrowLeft, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const ExamQuestionsPage = () => {
    const { examId } = useParams();

    const [examData, setExamData] = useState(null);
    const [chapterQuestions, setChapterQuestions] = useState({});
    const [selectedQuestions, setSelectedQuestions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch exam details
                const examResponse = await api.get(`/api/exams/${examId}`);
                setExamData(examResponse.data);

                if (examResponse.data.is_fullCourseExam) {
                    const courseId = examResponse.data.course;
                    const chaptersResponse = await api.get(`/api/course/${courseId}/chapters/`);
                    const chapterIds = chaptersResponse.data.chapter_ids || [];

                    let fetchedChapterQuestions = {};
                    let fetchedSelectedQuestions = {};

                    for (const chapterId of chapterIds) {
                        const questionsResponse = await api.get(
                            `/api/chapter-questions/?chapter_ids=${chapterId}&difficulty=1`
                        );
                        if (questionsResponse.data.length > 0) {
                            fetchedChapterQuestions[chapterId] = questionsResponse.data;
                            fetchedSelectedQuestions[chapterId] = [];
                        }
                    }

                    setChapterQuestions(fetchedChapterQuestions);
                    setSelectedQuestions(fetchedSelectedQuestions);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load exam details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchExamDetails();
    }, [examId]);

    const handleSelectionChange = (chapterId, selected) => {
        setSelectedQuestions((prev) => ({
            ...prev,
            [chapterId]: selected,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const allSelectedQuestions = Object.values(selectedQuestions).flat();
        
        try {
            // Step 1: Get existing questions for the exam
            const existingResponse = await api.get(`/api/examquestions/?exam=${examId}`);
            const existingQuestions = existingResponse.data.map(q => q.question); // Extract existing question IDs
    
            // Step 2: Filter out duplicate questions
            const newQuestions = allSelectedQuestions.filter(q => !existingQuestions.includes(q));
    
            if (newQuestions.length === 0) {
                console.log("No new questions to add.");
                return; // Stop execution if there are no new questions
            }
    
            // Step 3: Format the data
            const payload = newQuestions.map(questionId => ({
                exam: examId,
                question: questionId
            }));
    
            // Step 4: Send the POST request with only new questions
            const response = await api.post(`/api/examquestions/bulk-upload/`, payload);
            
            console.log("Successfully updated questions:", response.data);
        } catch (error) {
            console.error("Error updating questions:", error);
        }
    };
    
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : examData ? (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{examData.exam_title}</h1>
                    <p className="text-gray-600">Time: {examData.time} mins</p>
                    <p className="text-gray-600">Difficulty: {examData.difficulty}</p>

                    <h2 className="text-xl font-semibold text-gray-700 mt-6">Select Questions by Chapter:</h2>
                    <form onSubmit={handleSubmit}>
                        {Object.entries(chapterQuestions).map(([chapterId, questions]) => (
                            questions.length > 0 && (
                                <div key={chapterId} className="mb-6 p-4 border rounded">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Chapter {chapterId}</h3>
                                    <DualListBox
                                        options={questions.map((q) => ({ value: q.id, label: q.question_text }))}
                                        selected={selectedQuestions[chapterId] || []}
                                        onChange={(selected) => handleSelectionChange(chapterId, selected)}
                                        canFilter
                                        simpleValue
                                    />
                                </div>
                            )
                        ))}
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <p className="text-red-500">Exam not found.</p>
            )}
        </div>
    );
};

export default ExamQuestionsPage;

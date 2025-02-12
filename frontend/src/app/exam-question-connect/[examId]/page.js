"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../services/api";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import RenderWithLatex from "../../components/RenderWithLatex";

const ExamQuestionsPage = () => {
    const { examId } = useParams();
    const [examData, setExamData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterQuestions, setChapterQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [addedQuestions, setAddedQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        fetchAddedQuestions().then(fetchExamDetails);
    }, [examId]);

    const fetchExamDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const examResponse = await api.get(`/api/exams/${examId}`);
            setExamData(examResponse.data);

            let chapterIds = [];
            if (examResponse.data.is_fullCourseExam) {
                const courseResponse = await api.get(`/api/course/${examResponse.data.course}/chapters/`);
                chapterIds = courseResponse.data.chapter_ids || [];
            } else if (examResponse.data.is_fullSubjectExam) {
                const subjectResponse = await api.get(`/api/subject/${examResponse.data.subject}/chapters/`);
                chapterIds = subjectResponse.data.chapter_ids || [];
            } else if (examResponse.data.is_fullChapterExam) {
                chapterIds = [examResponse.data.chapter];
            }

            const chapterDetails = await Promise.all(
                chapterIds.map(async (id) => {
                    try {
                        const response = await api.get(`/api/chapters/${id}/`);
                        return { id, name: response.data.name };
                    } catch {
                        return { id, name: `Chapter ${id}` };
                    }
                })
            );

            setChapters(chapterDetails);
        } catch (error) {
            setError("Failed to load exam details.");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddedQuestions = async () => {
        try {
            const response = await api.get(`/api/examquestions/?exam=${examId}`);
            const questionsWithText = await Promise.all(
                response.data.map(async (q) => {
                    try {
                        const questionResponse = await api.get(`/api/questions/${q.question}/`);
                        return {
                            id: q.question,
                            text: questionResponse.data.question_text,
                        };
                    } catch {
                        return { id: q.question, text: "Error loading question" };
                    }
                })
            );
            setAddedQuestions(questionsWithText);
        } catch (error) {
            console.error("Error fetching added questions:", error);
        }
    };

    const handleChapterSelect = async (chapterId) => {
        setSelectedChapter(chapterId);
        setChapterQuestions([]);
        setSelectedQuestions([]);

        try {
            const response = await api.get(`/api/chapter-questions/?chapter_ids=${chapterId}&difficulty=${examData.diffculty}`);
            const filteredQuestions = response.data.filter(q => !addedQuestions.some(aq => aq.id === q.id));
            setChapterQuestions(filteredQuestions);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleSelectionChange = (selected) => {
        setSelectedQuestions(selected);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage("");
        setWarningMessage("");
    
        try {
            const newQuestions = selectedQuestions.filter(q => !addedQuestions.some(aq => aq.id === q));
            
            if (newQuestions.length === 0) {
                setWarningMessage("Some or all selected questions are already uploaded.");
                return;
            }
    
            const payload = newQuestions.map(questionId => ({
                exam: examId,
                question: questionId
            }));
    
            await api.post(`/api/examquestions/bulk-upload/`, payload);
    
            setSuccessMessage("Questions updated successfully!");
    
            // Ensure state updates sequentially
            await fetchAddedQuestions();  // Refresh added questions
    
            if (selectedChapter) {
                setTimeout(async () => {
                    await handleChapterSelect(selectedChapter); // Refresh available questions
                }, 100);
            }
    
        } catch (error) {
            console.error("Error updating questions:", error);
        }
    };
    
    const handleDeleteQuestion = async (questionId) => {
        try {
            await api.delete(`/api/examquestions/${examId}/${questionId}/`);
    
            // Immediately update the addedQuestions list to reflect the deleted question
            setAddedQuestions(prev => prev.filter(q => q.id !== questionId));
    
            // Wait for fetchAddedQuestions to update state before proceeding
            await fetchAddedQuestions();
    
            // Wait for the state to be updated before fetching the available questions
            if (selectedChapter) {
                setTimeout(async () => {
                    await handleChapterSelect(selectedChapter);
                }, 100); // Small delay ensures the state has updated before fetching
            }
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };
    

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl flex">
            <div className="w-1/4 p-4 border-r">
                <h2 className="text-lg font-semibold mb-4">Chapters</h2>
                {chapters.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => handleChapterSelect(chapter.id)}
                        className={`block w-full text-left p-2 rounded ${
                            selectedChapter === chapter.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                        }`}
                    >
                        {chapter.name}
                    </button>
                ))}
            </div>
            <div className="w-3/4 p-6">
                <h1 className="text-2xl font-bold mb-4">{examData?.exam_title}</h1>
                {chapterQuestions.length > 0 ? (
                    <DualListBox
                        options={chapterQuestions.map((q) => ({ value: q.id, label: q.question_text }))}
                        selected={selectedQuestions}
                        onChange={handleSelectionChange}
                        canFilter
                        simpleValue
                    />
                ) : (
                    <p className="text-gray-500">{selectedChapter ? "No more questions to add." : "Select a chapter to load questions."}</p>
                )}
                <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                <ul className="mt-6">
                    {addedQuestions.map(q => (
                        <li key={q.id} className="flex justify-between items-center p-3 border-b">
                            <RenderWithLatex text={q.text} block />
                            <button onClick={() => handleDeleteQuestion(q.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExamQuestionsPage;

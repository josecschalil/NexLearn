"use client";

import { useEffect, useState } from "react";
import RenderTextWithMathJax from "@/app/components/RenderWithMathJax";
import RenderTextWithLatex from "@/app/components/RenderWithLatex";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalysisPage = () => {
  const { testId } = useParams();
  const router = useRouter();
  const [testData, setTestData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    const fetchTestDataAndQuestions = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Replace with context or global state if available
        if (!userId || !testId) {
          console.error("Missing user ID or test ID.");
          return;
        }

        // Fetch Test Data
        const testResponse = await axios.get(`${apiUrl}/api/exam-data/filter/?user=${userId}&exam_id=${testId}`
        );
        if (testResponse.data && testResponse.data.length > 0) {
          setTestData(testResponse.data[0]);
        } else {
          console.error("No test data found.");
          return;
        }

        const Response = await axios.get(`${apiUrl}/api/questions/exam-id/${testId}`
        );
        if (Response.data) {
            setQuestions(Response.data);
          }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTestDataAndQuestions();
  }, [testId]);

  if (!testData) return <div>Loading...</div>;

  const { answers, marked_for_review, time_remaining, is_submitted } = testData;

  // Categorize Questions
  const categorizedQuestions = questions.map((question, index) => {
    const isCorrect = answers?.[index + 1] === question.correct_answer;
    const isAnswered = answers?.[index + 1] !== undefined;
    const isMarkedForReview = marked_for_review.includes(index + 1);

    return {
      ...question,
      isCorrect,
      isAnswered,
      isMarkedForReview,
    };
  });

  // Subject Data
  const subjects = ["Physics", "Chemistry", "Mathematics"];
  const subjectData = subjects.map((subject) => {
    const subjectQuestions = categorizedQuestions.filter(
      (question) => question.subject === subject
    );

    return {
      subject,
      total: subjectQuestions.length,
      correct: subjectQuestions.filter((q) => q.isCorrect).length,
      answered: subjectQuestions.filter((q) => q.isAnswered).length,
      review: subjectQuestions.filter((q) => q.isMarkedForReview).length,
    };
  });

  // Total Correct Answers
  const totalCorrect = categorizedQuestions.filter((q) => q.isCorrect).length;

  // Bar Chart Data
  const barData = {
    labels: subjects,
    datasets: [
      {
        label: "Correct Answers",
        data: subjectData.map((data) => data.correct),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Answered",
        data: subjectData.map((data) => data.answered),
        backgroundColor: "rgba(255, 159, 64, 0.8)",
      },
      {
        label: "Marked for Review",
        data: subjectData.map((data) => data.review),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  // Toggle Question Details
  const toggleQuestionDetails = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-hindi">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Analysis and Data
        </h1>
        <button
          onClick={() => router.push(`/student-portal`)}
          className="border border-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition"
        >
          Back to Tests
        </button>
      </header>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Summary</h2>
        <ul className="list-disc ml-6 text-lg">
          <li>Total Questions: {questions.length}</li>
          <li>Answered: {Object.keys(answers || {}).length}</li>
          <li>Correct Answers: {totalCorrect}</li>
          <li>Marked for Review: {marked_for_review.length}</li>
          <li>
            Time Remaining: {Math.floor(time_remaining / 60)}m{" "}
            {time_remaining % 60}s
          </li>
        </ul>
      </div>

      {/* <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">
          Performance Graph
        </h2>
        <div className="w-full md:w-3/4">
          <Bar data={barData} options={{ responsive: true }} />
        </div>
      </div> */}

      {/* Subject-wise Analysis */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">
          Subject-wise Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjectData.map(({ subject, total, answered, correct, review }) => (
            <div
              key={subject}
              className="p-4 border border-gray-300 rounded-md bg-gray-50 shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">{subject}</h3>
              <ul className="list-disc ml-4 text-gray-600">
                <li>Total Questions: {total}</li>
                <li>Answered: {answered}</li>
                <li>Correct: {correct}</li>
                <li>Marked for Review: {review}</li>
              </ul>
            </div>
          ))}
        </div>
      </div> */}

      {/* Questions with Dropdown */}
      <div>
        <h2 className="text-2xl font-semibold  mb-4 text-gray-700">
          Question-wise Analysis
        </h2>
        <div>
          {categorizedQuestions.map((question, index) => {
            const status = question.isCorrect
              ? "Correct"
              : question.isAnswered
              ? "Wrong"
              : "Not Answered";

            return (
              <div key={index} className="border-b p-4">
                <div
                  className=" cursor-pointer"
                  onClick={() => toggleQuestionDetails(index)}
                >
                  <span>
                    {index + 1}.
                  </span>

                  <RenderTextWithLatex text= {question.question_text}/> 
                 
                  <span>{expandedQuestions[index] ? "-" : "+"}</span>
                </div>
                {expandedQuestions[index] && (
                  <div className="mt-2">
                    <p>Selected Answer: {answers?.[index + 1] || "Not Answered"}</p>
                    
                    <p>Correct Answer: {question.correct_answer}</p>
                    <p>Status: {status}</p>
                    <p className="font-hindi text-2xl my-3">Solution</p>
                    <RenderTextWithLatex text= {question.solution_text}/> 
                    <p className="font-hindi text-2xl my-3">Hindi Solution</p>
                    <RenderTextWithLatex text= {question.solution_text_hindi}/> 
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;

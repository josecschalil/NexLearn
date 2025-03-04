"use client";

import { useEffect, useState } from "react";
import RenderTextWithMathJax from "@/app/components/RenderWithMathJax";
import RenderTextWithLatex from "@/app/components/RenderWithLatex";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import api from "../../services/api";
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
        const testResponse = await api.get(
          `/api/exam-data/filter/?user=${userId}&exam_id=${testId}`
        );
        if (testResponse.data && testResponse.data.length > 0) {
          console.log(testResponse.data[0]);
          setTestData(testResponse.data[0]);
        } else {
          console.error("No test data found.");
          return;
        }

        const Response = await api.get(`/api/questions/exam-id/${testId}`);
        if (Response.data) {
          console.log(Response.data);
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

  const categorizedQuestions = questions.map((question, index) => {
    const isCorrect = answers?.[index] === question.correct_answer;
    const isAnswered = answers?.[index] !== undefined;
    const isMarkedForReview = marked_for_review.includes(index);

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

  const totalCorrect = categorizedQuestions.filter((q) => q.isCorrect).length;

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

  const toggleQuestionDetails = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto bg-white py-8  rounded-xl p-6">
        <div className="max-xs:text-xl text-2xl sm:text-4xl font-bold text-gray-800 mb-3 md:mb-6">
          {" "}
          <span>
            {" "}
            <button
              onClick={() => router.push(`/student-portal`)}
              className="px-3 py-2 text-black relative -top-1 sm:-top-2 hover:bg-slate-100 rounded-xl border max-xs:text-xs text-sm mr-4  font-bold transition duration-300 shadow bg-gray-50"
            >
              &lt;
            </button>
          </span>
          Analysis And Insights
        </div>
        <hr className=" -mr-[100vw]  h-[1px] bg-gray-300 mb-2"></hr>

        <section className="mb-10 bg-white  pt-4 ">
          <ul className="list-none  font-semibold sm:text-lg text-gray-700 space-y-2">
            <li>Total Questions: {questions.length}</li>
            <li>Answered: {Object.keys(answers || {}).length}</li>
            <li>Correct Answers: {totalCorrect}</li>
            <li>Marked for Review: {marked_for_review.length}</li>
            <li>
              Time Remaining: {Math.floor(time_remaining / 60)}m{" "}
              {time_remaining % 60}s
            </li>
          </ul>
        </section>

        {/* Question-wise Analysis Section */}
        <section className="">
          <h2 className="max-xs:text-lg text-2xl font-semibold text-gray-800 mb-4">
            Question-wise Analysis
          </h2>
          <div className="">
            {categorizedQuestions.map((question, index) => {
              const status = question.isCorrect
                ? "Correct"
                : question.isAnswered
                ? "Wrong"
                : "Not Answered";

              return (
                <div
                  key={index}
                  className="border-b py-3 max-xs:text-sm hover:bg-gray-50  transition duration-300"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleQuestionDetails(index)}
                  >
                    <span className="font-semibold  text-gray-700">
                      {index + 1}.{" "}
                      <RenderTextWithLatex text={question.question_text} />
                    </span>

                    <span>
                      {/* Down arrow icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 24"
                        width="18"
                        height="25"
                        className={`transition-all duration-300 transform ${
                          expandedQuestions[index] ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M7 10l5 5 5-5z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  </div>
                  {expandedQuestions[index] && (
                    <div className="mt-4 text-md text-gray-600">
                      <p>
                        <strong>Selected Answer:</strong>{" "}
                        {answers?.[index] ? (
                          <RenderTextWithLatex
                            text={
                              question[
                                `option_${answers?.[index].toLowerCase()}_text`
                              ]
                            }
                          />
                        ) : (
                          "Not Answered"
                        )}
                      </p>
                      <p>
                        <strong>Correct Answer:</strong>{" "}
                        <RenderTextWithLatex
                          text={
                            question[
                              `option_${question.correct_answer.toLowerCase()}_text`
                            ]
                          }
                        />
                      </p>

                      <p>
                        <strong>Status:</strong> {status}
                      </p>
                      <div className="mt-4">
                        <p className="font-semibold text-md text-indigo-600">
                          Solution
                        </p>
                        <RenderTextWithLatex text={question.solution_text} />
                        <p className="font-semibold text-md text-indigo-600 mt-4">
                          Hindi Solution
                        </p>
                        <RenderTextWithLatex
                          text={question.solution_text_hindi}
                          language={"HI"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalysisPage;

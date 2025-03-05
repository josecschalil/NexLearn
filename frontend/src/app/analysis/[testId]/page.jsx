"use client";

import { useEffect, useState } from "react";
import RenderTextWithLatex from "@/app/components/RenderWithLatex";
import { useParams, useRouter } from "next/navigation";
import api from "../../services/api";

const AnalysisPage = () => {
  const { testId } = useParams();
  const router = useRouter();
  const [testData, setTestData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [weakConcepts, setWeakConcepts] = useState([]);

  useEffect(() => {
    const fetchTestDataAndQuestions = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId || !testId) {
          console.error("Missing user ID or test ID.");
          return;
        }

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

  useEffect(() => {
    const fetchWeakConcepts = async () => {
      if (!testData || questions.length === 0) return;

      const incorrectConceptIds = new Set();

      questions.forEach((question, index) => {
        const isCorrect = testData.answers?.[index] === question.correct_answer;
        if (!isCorrect) {
          question.concepts.forEach((conceptId) =>
            incorrectConceptIds.add(conceptId)
          );
        }
      });

      const conceptPromises = [...incorrectConceptIds].map(
        async (conceptId) => {
          try {
            const response = await api.get(`/api/concepts/${conceptId}`);
            return response.data.name; // Extract concept name
          } catch (error) {
            console.error(`Error fetching concept ${conceptId}:`, error);
            return null;
          }
        }
      );

      const conceptsFetched = await Promise.all(conceptPromises);
      setWeakConcepts(conceptsFetched.filter(Boolean)); // Remove null values
    };

    fetchWeakConcepts();
  }, [testData, questions]);

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

  const totalCorrect = categorizedQuestions.filter((q) => q.isCorrect).length;

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

        <section className="mb-10 bg-teal-50 border mt-8 border-teal-300 p-6 rounded-xl shadow-md">
          <h2 className="text-teal-600 text-xl sm:text-2xl font-bold text-center">
            Your Test Summary 📊
          </h2>
          <p className="text-teal-500 text-sm sm:text-base text-center mt-2">
            Here’s a quick overview of your performance in this test.
          </p>

          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 animate-fade-in">
            <div className="text-sm sm:text-lg p-3 border border-blue-300 bg-white rounded-lg shadow-md text-center text-blue-700 font-medium">
              📋 Total Questions: {questions.length}
            </div>
            <div className="text-sm sm:text-lg p-3 border border-green-300 bg-white rounded-lg shadow-md text-center text-green-700 font-medium">
              ✅ Answered: {Object.keys(answers || {}).length}
            </div>
            <div className="text-sm sm:text-lg p-3 border border-green-300 bg-white rounded-lg shadow-md text-center text-green-700 font-medium">
              🎯 Correct Answers: {totalCorrect}
            </div>
            <div className="text-sm sm:text-lg p-3 border border-yellow-300 bg-white rounded-lg shadow-md text-center text-yellow-700 font-medium">
              ⚠️ Marked for Review: {marked_for_review.length}
            </div>
            <div className="text-sm sm:text-lg p-3 border border-red-300 bg-white rounded-lg shadow-md text-center text-red-700 font-medium">
              ⏳ Time Remaining: {Math.floor(time_remaining / 60)}m{" "}
              {time_remaining % 60}s
            </div>
          </div>
        </section>

        <section className="">
          <h2 className="max-xs:text-lg text-2xl font-bold text-gray-800 mb-4">
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
                  className="border mt-2 rounded-xl px-3 py-3 max-xs:text-sm hover:bg-gray-50  transition duration-300"
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

        <section className="mb-8">
          <h2 className="max-xs:text-lg text-2xl font-bold my-4 text-gray-800 mb-4">
            Concept-wise Analysis
          </h2>
          {weakConcepts.length > 0 ? (
            <div className="bg-red-50 border border-red-400 p-6 rounded-xl shadow-md">
              <h2 className="text-red-600 text-xl sm:text-2xl font-bold text-center">
                We found some weak areas! 🚀
              </h2>
              <p className="text-red-500 text-sm sm:text-base text-center mt-2">
                Keep practicing these topics to strengthen your understanding.
                💪
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 animate-fade-in">
                {weakConcepts.map((concept, index) => (
                  <div
                    key={index}
                    className="text-sm sm:text-lg p-3 border border-red-300 bg-white rounded-lg shadow-md text-center text-red-700 font-medium"
                  >
                    {concept}
                  </div>
                ))}
              </div>

              <p className="text-center text-gray-600 text-sm mt-4">
                Consistency is key! Keep practicing and you’ll see improvement.
                📈
              </p>
            </div>
          ) : (
            <p className="text-green-600 font-semibold text-lg text-center">
              🎉 Great job! No weak concepts detected. Keep up the good work!
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AnalysisPage;

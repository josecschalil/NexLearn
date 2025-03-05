"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import Head from "next/head";
import Link from "next/link";
import api from "../../../services/api";

const TestsPage = () => {
  const emojis = ["📖", "📝", "🎯", "📚", "✏️", "🏆", "💡", "🔬", "📊", "🔎"]; 
  const course_id = useParams();
  const userId = localStorage.getItem("user_id");
  const [exams, setExams] = useState([]);
  const [examMetadata, setExamMetadata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        console.log(course_id.courseId);
        const response = await api.get(`/api/exams/?user_id=${userId}`);
        console.log(response.data);
        setExams(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch exams.");
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    const fetchAllExamMetaData = async () => {
      if (!userId) return;

      try {
        const metadataPromises = exams.map((exam) =>
          api.get(
            `/api/exam-data/filter/?user=${userId}&exam_id=${exam.exam_id}`
          )
        );

        const metadataResponses = await Promise.all(metadataPromises);

        const metadata = metadataResponses.map((response, index) => {
          const examData = response.data[0];
          return {
            examId: exams[index].exam_id,
            is_active: examData ? examData.is_active : false,
            is_submitted: examData ? examData.is_submitted : false,
          };
        });

        setExamMetadata(metadata);
        console.log("Fetched Exam Metadata: ", metadata);
      } catch (error) {
        console.error("Error fetching exam metadata:", error);
      }
    };

    if (exams.length > 0) {
      fetchAllExamMetaData();
    }
  }, [exams, userId]);

  const handleStartTest = async (examId) => {
    if (!userId || !examId) {
      console.error("Missing user_id or examId");
      return;
    }

    const payload = {
      exam_id: examId,
      current_question_index: 1,
      answers: {},
      visited: [],
      marked_for_review: [],
      time_remaining: 1800,
      is_timer_running: false,
      is_active: true,
      attempt_number: 1,
      user: userId,
      is_submitted: false,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/exam-data/`, payload);
      console.log("Test started successfully:", response.data);
    } catch (error) {
      console.error("Error starting the test:", error);
    }
  };

  const handleResumeTest = (examId) => {
    console.log(`Resuming test ${examId}...`);
  };

  return (
    <>
      <Head>
        <title>Mock Tests | Schedule & Analysis</title>
        <meta
          name="description"
          content="Prepare for exams with our mock tests. Check schedules, start tests, and analyze your performance."
        />
      </Head>
      <main className="min-h-screen  md:py-8 font-jakarta md:px-6 overflow-x-hidden">
        <section className="max-w-6xl mx-auto  font-istok p-6">
        <h3 className="text-xl sm:text-2xl md:text-4xl font-bold font-inter text-gray-800">
               Created Exams
              </h3>
              <hr className="mt-2 -mr-[40vw] mb-6 md:mb-8"></hr>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  sm:gap-4">
            {loading ? (
              <p>Loading exams...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              exams.map((exam, index) => {
                const metadata =
                  examMetadata?.find((meta) => meta.examId === exam.exam_id) ||
                  {};
                return (
                  <div
                    key={exam.exam_id}
                    className="flex hover:border-gray-500 hover:shadow transition-all duration-100 items-center justify-between p-4 border rounded-2xl mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <span
                        role="img"
                        aria-label="exam-icon"
                        className="text-2xl"
                      >
                        <div className=" ml-3 flex items-center justify-center text-2xl">
                          {emojis[index % emojis.length]}
                        </div>
                      </span>
                      <div>
                      <h3 className="text-[14px] xs:text-lg sm:text-lg font-semibold font-inter text-gray-800">
                          {exam.exam_title}
                        </h3>
                        <p className="text-[12px] xs:text-sm sm:text-sm text-gray-500 mt-1">
                         
                          Level {exam?.diffculty} | {exam.time} mins
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {!metadata?.is_active && !metadata?.is_submitted ? (
                        <Link href={`/tests/proctored/exams/${exam.exam_id}`}>
                          <button
                            onClick={() => handleStartTest(exam.exam_id)}
                            aria-label={`Start Mock Test ${exam.exam_id}`}
                            className="px-4 py-2 border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-[11px] xs:text-sm  sm:text-sm"
                          >
                            Start Test
                          </button>
                        </Link>
                      ) : metadata?.is_submitted ? (
                        <Link href={`/analysis/${exam.exam_id}`}>
                          <button
                            aria-label={`See Analysis of Mock Test ${exam.exam_id}`}
                            className="px-6 py-2 border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-[11px] xs:text-sm sm:text-sm"
                          >
                            Analyse
                          </button>
                        </Link>
                      ) : (
                        <Link href={`/tests/custom/exams/${exam.exam_id}`}>
                          <button 
                            onClick={() => handleResumeTest(exam.exam_id)}
                            aria-label={`Resume Mock Test ${exam.exam_id}`}
                            className="px-4 py-2 border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-[11px] xs:text-sm sm:text-sm"
                          >
                            Resume
                          </button>
                        </Link>
                      )}
                      {/* <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              exam={exam}
            /> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default TestsPage;

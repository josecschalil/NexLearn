"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import RenderTextWithLatex from "@/app/components/RenderWithLatex";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import api from "../../../../services/api";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const TestPage = () => {



  const router = useRouter();
  const { testId } = useParams();
  const userId = localStorage.getItem("user_id");
  const [isopen, setisopen] = useState(null);
  const [language, setLanguage] = useState("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set());
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1000);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [tableId, setTableId] = useState(null);
  const [examdetails, setexamdetails] = useState(null);
  const [Questions, setQuestions] = useState(null);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const chapterResponse = await axios.get(
  //         `${apiUrl}/api/exams/${testId}`
  //       );
  //       if (chapterResponse.data) {
  //         console.log("Chapter ID:", chapterResponse.data.chapter);
  //         const chapterId = chapterResponse.data.chapter;

  //         const questionsResponse = await axios.get(
  //           `${apiUrl}/api/questions/chapter/${chapterId}`
  //         );
  //         if (questionsResponse.data) {
  //           console.log("Fetched Questions:", questionsResponse.data);
  //           setQuestions(questionsResponse.data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchQuestions();
  //}, [testId]);




  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isopen) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isopen]);

  useEffect(() => {
    const fetchexamDetails = async () => {
      try {
        const response = await api.get(`/api/exams/${testId}`);
        const data = response.data;
        console.log(data);
        setexamdetails(data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    fetchexamDetails();
  }, [testId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/api/questions/exam-id/${testId}`);

        if (response.data) {
          console.log("Fetched Questions:", response.data);
          setQuestions(response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [testId]);

  useEffect(() => {
    const fetchInstanceId = async () => {
      try {
        const response = await api.get(
          `/api/exam-data/filter/?user=${userId}&exam_id=${testId}`
        );
        if (response.data) {
          const fetchedId = response?.data[0].id;
          setTableId(fetchedId);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    fetchInstanceId();
  }, [testId, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tableId) return;

        const response = await api.get(`/api/exam-data/${tableId}`);
        const data = response.data;
        console.log(data);

        if (data) {
          setCurrentQuestionIndex(data.current_question_index || 0);
          setAnswers(data.answers || {});
          setVisited(new Set(data.visited || []));
          setMarkedForReview(new Set(data.marked_for_review || []));
          setTimeRemaining(data.time_remaining || 1800);
          setIsSubmitted(data.is_submitted || false);
          setIsTimerRunning(data.is_timer_running || false);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    if (tableId) {
      fetchData();
    }
  }, [tableId]);

  useEffect(() => {
    if (isInitialized) {
      saveData();
    }
  }, [
    currentQuestionIndex,
    answers,
    visited,
    markedForReview,
    // timeRemaining,
    isTimerRunning,
    testId,
    isInitialized,
    isSubmitted,
  ]);

  useEffect(() => {
    if (isInitialized && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isInitialized, isSubmitted]);

  const AttemptLater = () => {
    saveData();
    router.push(`/tests/custom/${userId}`);
  };

  const totalQuestions = Questions?.length;

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
    setVisited(new Set([...visited, currentQuestionIndex]));
  };

  const saveData = async () => {
    const dataToSave = {
      current_question_index: currentQuestionIndex,
      answers,
      visited: Array.from(visited),
      marked_for_review: Array.from(markedForReview),
      time_remaining: timeRemaining,
      is_timer_running: isTimerRunning,
      is_submitted: isSubmitted,
    };

    try {
      const response = await api.patch(
        `/api/exam-data/${tableId}/`,
        dataToSave
      );
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the test?"
    );
    if (confirmSubmit) {
      setIsSubmitted(true);
      router.push(`/analysis/${testId}`);
      saveData();
    }
  };

  const TimerComponent = ({ timeRemaining }) => {
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };

    return (
      <div className="mx-4 py-4 text-center sm:py-2 text-black bg-gray-100 shadow w-20 h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-2xl tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300">
        {formatTime(timeRemaining)}
      </div>
    );
  };

  const calculateScore = () => {
    return Questions.filter(
      (question, index) => answers[index] === question.correct
    ).length;
  };

  const clearAnswer = () => {
    const updatedAnswers = { ...answers };
    delete updatedAnswers[currentQuestionIndex];
    setAnswers(updatedAnswers);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisited(new Set([...visited, index]));
  };

  const markForReview = () => {
    setMarkedForReview(new Set([...markedForReview, currentQuestionIndex]));
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const saveandNext = () => {
    if (!answers[currentQuestionIndex]) {
      alert("Please select an option to save the answer.");
    } else {
      nextQuestion();
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "hi" : "en"));
  };

  // Rendering
  return (
    <div className="h-screen">
      <header className="md:items-center font-instSansB flex flex-col md:flex-row justify-between text-2xl md:h-[10%] px-4">
        <div className=" hidden md:flex justify-start items-center">
          <button
            className={`mx-4  relative w-20 h-[37px] rounded-full border text-[16px] border-gray-700 flex items-center transition-all duration-300 ${
              language === "en" ? "bg-black" : "bg-teal-800"
            }`}
            onClick={toggleLanguage}
          >
            <span
              className={`absolute left-[6px] top-[5px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                language === "en" ? "translate-x-10" : "translate-x-0"
              }`}
            ></span>
            <span
              className={`absolute left-4 text-white font-bold transition-all duration-300 ${
                language === "en" ? "opacity-100" : "opacity-0"
              }`}
            >
              EN
            </span>
            <span
              className={`absolute right-4 text-white font-bold transition-all duration-300 ${
                language === "en" ? "opacity-0" : "opacity-100"
              }`}
            >
              HI
            </span>
          </button>
        </div>

        <div className="flex  items-center border-b mt-2 md:mt-0 -mx-6 px-7 mb-4 md:pb-0 md:mb-0 md:border-none">
          <div className="flex justify-start   md:justify-center py-3  md:items-center font-extrabold">
            <span className="">{examdetails?.exam_title} </span>
            <span
              onClick={() => setisopen(!isopen)}
              className={` transform transition-all duration-300 items-center flex mx-2 md:hidden cursor-pointer ${
                isopen ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className="transition-transform duration-300"
              >
                <path
                  d="M7 10l5 5 5-5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </div>
          <div className="ml-auto">
            <button
              className={` md:hidden mx-auto relative w-20 h-[37px] text-sm rounded-full border border-gray-700 flex items-center transition-all duration-300 ${
                language === "en" ? "bg-black" : "bg-teal-800"
              }`}
              onClick={toggleLanguage}
            >
              <span
                className={`absolute left-[6px] top-[5px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                  language === "en" ? "translate-x-10" : "translate-x-0"
                }`}
              ></span>
              <span
                className={`absolute left-4 text-white font-bold transition-all duration-300 ${
                  language === "en" ? "opacity-100" : "opacity-0"
                }`}
              >
                EN
              </span>
              <span
                className={`absolute right-4 text-white font-bold transition-all duration-300 ${
                  language === "en" ? "opacity-0" : "opacity-100"
                }`}
              >
                HI
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-center  md:mb-0 md:justify-end items-center text-sm xs:text-md ">

          <div className="flex justify-end items-center text-md">
          <button
              className="px-4 py-2  h-fit text-black bg-gray-100 shadow  text-[16px] border border-gray-100 hover:border-gray-600 rounded-2xl tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300"
              onClick={AttemptLater}
            >
              Attempt Later
            </button>
            <TimerComponent timeRemaining={timeRemaining} />
            <button
              className="px-4 py-4 sm:py-2 text-black bg-gray-100 shadow h-full text-[16px] border border-gray-100 hover:border-gray-600 rounded-2xl tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </header>

      <div
        ref={dropdownRef}
        className="md:hidden pb-4 px-6 border-l   md:w-[30vw] overflow-hidden opacity-0"
      >
        <div className="bg-white rounded-md mt-5">
          <h3 className="text border-b py-2 mb-2">Legend</h3>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
              <span>Not Visited</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-300 rounded mr-2"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-emerald-500 rounded mr-2"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-violet-300 rounded mr-2"></div>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-purple-700 rounded mr-2"></div>
              <span>Answered & Marked for Review</span>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-md mb-5 mt-4">
          <div className="border-b mb-4 py-2">Questions</div>
          <div className="flex flex-wrap gap-3">
            {Questions?.map((question, overallIndex) => {
              const index = Questions.indexOf(question);
              let bgColor = "bg-gray-300"; // Default: Not Visited
              if (visited.has(index)) bgColor = "bg-orange-300"; // Visited
              if (answers[index]) bgColor = "bg-emerald-500"; // Answered
              if (markedForReview.has(index)) bgColor = "bg-violet-300"; // Marked for Review
              if (markedForReview.has(index) && answers[index]) bgColor = "bg-violet-500"; // Both

              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-xl text-white font-instSansB font-semibold ${bgColor}`}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-0 bg-white border-t flex-col md:flex-row h-[90%] ">
        <div className="md:w-[70vw] flex flex-col">
          <div className="p-6 bg-white rounded-xl font-jakarta">
            <p className="text-lg mb-4">
              {currentQuestionIndex + 1}.{" "}
              {language === "en" ? (
                <RenderTextWithLatex
                  text={Questions?.[currentQuestionIndex]?.question_text}
                />
              ) : (
                <RenderTextWithLatex
                  text={Questions?.[currentQuestionIndex]?.question_text_hindi}
                />
              )}
            </p>
            {Questions?.[currentQuestionIndex]?.question_image && (
              <img
                src={Questions[currentQuestionIndex].question_image}
                alt="Question"
                className="w-full max-w-36 mb-4"
              />
            )}

            <div className="grid grid-cols-2 gap-3 md:w-[80%] mt-8">
              {["A", "B", "C", "D"].map((optionKey, index) => {
                const optionText =
                  language === "en"
                    ? Questions?.[currentQuestionIndex][
                        `option_${optionKey.toLowerCase()}_text`
                      ]
                    : Questions?.[currentQuestionIndex][
                        `option_${optionKey.toLowerCase()}_text_hindi`
                      ];

                const optionImage =
                  Questions?.[currentQuestionIndex][
                    `option_${optionKey.toLowerCase()}_image`
                  ];

                return (
                  <label
                    key={index}
                    className={`block p-2 px-4 py-4 rounded-xl transition cursor-pointer border ${
                      answers[currentQuestionIndex] === optionKey
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      checked={answers[currentQuestionIndex] === optionKey}
                      onChange={() => handleAnswer(optionKey)}
                      className="hidden"
                    />
                    {optionImage && (
                      <img
                        src={optionImage}
                        alt={`Option ${optionKey}`}
                        className="w-full max-w-36 mb-2"
                      />
                    )}

                    <RenderTextWithLatex text={optionText} />
                    <span></span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="border-t flex p-2 px-6 mt-auto flex-row max1:flex-col">
            <div className="my-5 flex-wrap flex justify-between md:justify-center gap-3 sm:gap-6 lg:mx-auto font-instSansB  items-center ">

            <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-black bg-gray-100 shadow h-fit flex-1  border border-gray-100 hover:border-gray-600 rounded-2xl tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300"
              >
                Previous
              </button>
            
              <button
                onClick={clearAnswer}
                className="px-4 py-2   text-white bg-red-500 hover:border-black  flex-1 border  rounded-2xl    active:border-[2px] transition-all duration-300"
              >
                Clear
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className="px-7 py-2 text-black bg-gray-100 shadow h-fit flex-1  border border-gray-100 hover:border-gray-600 rounded-2xl tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300"
              >
                Next
              </button>

              <button
                onClick={saveandNext}
                className="px-4 py-2 h-fit hidden lg:flex text-white hover:border-black border    rounded-2xl   active:border-[2px] transition-all duration-300 bg-emerald-500"
              >
                Save and Next
              </button>

              <button
                onClick={markForReview}
                className="px-4 py-2 h-fit hidden lg:flex  text-white bg-violet-500 hover:border-black border     rounded-2xl   active:border-[2px] transition-all duration-300"
              >
                Mark and Next
              </button>

            
            
            </div>{" "}
            <div className="flex gap-2 md:gap-6">
                          <button
                onClick={saveandNext}
                className="px-4 py-2 h-fit lg:hidden font-instSansB flex-1 text-white hover:border-black border    rounded-2xl   active:border-[2px] transition-all duration-300 bg-emerald-500"
              >
                Save and Next
              </button>

              <button
                onClick={markForReview}
                className="px-4 py-2 h-fit lg:hidden font-instSansB flex-1  text-white bg-violet-500 hover:border-black border     rounded-2xl   active:border-[2px] transition-all duration-300"
              >
                Mark and Next
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block p-4 px-6 border-l md:w-[30vw]">
          <div className="bg-white rounded-md mb-5">
            <h3 className="text border-b py-2 mb-2">Legend</h3>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
                <span>Not Visited</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 bg-red-300 rounded mr-2"></div>
                <span>Visited</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 bg-emerald-500 rounded mr-2"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-violet-300 rounded mr-2"></div>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-purple-700 rounded mr-2"></div>
                <span>Answered & Marked for Review</span>
              </div>
            </div>
          </div>
          {/* 
          {["Physics", "Chemistry", "Mathematics"].map((subject) => (
            <div key={subject} className="bg-white rounded-md mb-5">
              <div className="border-b mb-4 py-2">{subject}</div>
              <div className="flex flex-wrap gap-3  ">
                {Questions
                  .filter((question) => question.subject === subject)
                  .map((question, overallIndex) => {
                    const index = Questions.indexOf(question);
                    // Define background colors for buttons
                    let bgColor = "bg-gray-300"; // Default: Not Visited
                    if (visited.has(index)) bgColor = "bg-orange-300"; // Visited
                    if (answers[index]) bgColor = "bg-emerald-500"; // Answered
                    if (markedForReview.has(index)) bgColor = "bg-violet-300"; // Marked for Review

                    if (markedForReview.has(index) && answers[index])
                      bgColor = "bg-violet-500"; // Marked for Review

                    return (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-xl text-white font-instSansB font-semibold ${bgColor}`}
                        onClick={() => goToQuestion(index)}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))} */}

          {/*myr thattip code need to make it read*/}
          <div className="bg-white rounded-md mb-5">
            <div className="border-b mb-4 py-2">Questions</div>
            <div className="flex flex-wrap gap-3  ">
              {Questions?.map((question, overallIndex) => {
                const index = Questions.indexOf(question);
                // Define background colors for buttons
                let bgColor = "bg-gray-300"; // Default: Not Visited
                if (visited.has(index)) bgColor = "bg-orange-300"; // Visited
                if (answers[index]) bgColor = "bg-emerald-500"; // Answered
                if (markedForReview.has(index)) bgColor = "bg-violet-300"; // Marked for Review

                if (markedForReview.has(index) && answers[index])
                  bgColor = "bg-violet-500"; // Marked for Review

                return (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-xl text-white font-instSansB font-semibold ${bgColor}`}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "../../services/api";

const TimeSelector = ({ time, setTime }) => {
  const times = [
    { value: 10, icon: "⏱️", catchphrase: "Quick Burst!" },
    { value: 20, icon: "⏳", catchphrase: "A Steady Pace!" },
    { value: 30, icon: "⏰", catchphrase: "Midway Challenge!" },
    { value: 60, icon: "🕰️", catchphrase: "The Full Marathon!" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-4 ">
      {times.map((t) => (
        <button
          key={t.value}
          className={` px-4 p-3 text-black bg-gray-100 shadow h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-lg tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300 ${
            time === t.value
              ? "border-gray-900"
              : "text-gray-700 hover:border-gray-900"
          }`}
          onClick={() => setTime(t.value)}
        >
          <div className="flex items-center space-x-3">
            <small className="text">{t.icon}</small>
            <div className="text-left">
              <small className="block text-sm ">{t.value} mins </small>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
const QuestionSelector = ({ numQuestions, setNumQuestions }) => {
  const questionCounts = [
    { value: 5, icon: "📜", catchphrase: "Quick Fire!" },
    { value: 10, icon: "📝", catchphrase: "A Solid Set!" },
    { value: 15, icon: "🖊️", catchphrase: "Push Your Limits!" },
    { value: 20, icon: "🔖", catchphrase: "The Ultimate Test!" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-4 ">
      {questionCounts.map((num) => (
        <button
          key={num.value}
          className={`px-4 py-3 text-black bg-gray-100 shadow h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-lg tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300 ${
            numQuestions === num.value
              ? "border-gray-900"
              : "text-gray-700 hover:border-gray-900"
          }`}
          onClick={() => setNumQuestions(num.value)}
        >
          <div className="flex items-center space-x-2">
            <small className="text">{num.icon}</small>
            <div className="text-left">
              <small className=" hidden sm:block text-sm ">
                {num.value} Questions
              </small>
              <small className=" sm:hidden text-sm ">{num.value} Qos</small>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const difficulties = [
    { value: 1, icon: "🔰", catchphrase: "Easy Peasy!" },
    { value: 2, icon: "🟢", catchphrase: "Getting There!" },
    { value: 3, icon: "🟡", catchphrase: "Challenging!" },
    { value: 4, icon: "🟠", catchphrase: "Tough Cookie!" },
    { value: 5, icon: "🔴", catchphrase: "Master Level!" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-4 ">
      {difficulties.map((d) => (
        <button
          key={d.value}
          className={`px-4 py-3 text-black bg-gray-100 shadow h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-lg tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300 ${
            difficulty === d.value
              ? "border-gray-900"
              : "text-gray-700 hover:border-gray-900"
          }`}
          onClick={() => setDifficulty(d.value)}
        >
          <div className="flex items-center space-x-3">
            <small className="text">{d.icon}</small>
            <div className="text-left">
              <small className="hidden sm:block text-sm">Level {d.value}</small>
              <small className="sm:hidden text-sm ">Lev {d.value}</small>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const ChapterSelector = ({
  selectedChapters,
  setSelectedChapters,
  selectedChaptersName,
  setSelectedChaptersName,
  courseid,
}) => {
  const [EachSubjectDetails, setEachSubjectDetails] = useState([]);
  const [activeSubjectId, setActiveSubjectId] = useState(null); // Store only one active subject

  const toggleChapter = (chapter) => {
    setSelectedChapters((prev) =>
      prev.includes(chapter.id)
        ? prev.filter((id) => id !== chapter.id)
        : [...prev, chapter.id]
    );
  
    setSelectedChaptersName((prev) =>
      prev.includes(chapter.name)
        ? prev.filter((name) => name !== chapter.name) 
        : [...prev, chapter.name]
    );
  };
  

  const toggleSubject = (subjectId) => {
    setActiveSubjectId((prev) => (prev === subjectId ? null : subjectId)); // Collapse if same subject is clicked
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get(`/api/subjects/?course_id=${courseid}`);
        const subjectsData = response.data;

        const updatedEachSubjectDetails = await Promise.all(
          subjectsData.map(async (subject) => {
            const chaptersResponse = await api.get(
              `/api/chapters/?subject_id=${subject.id}`
            );
            return {
              id: subject.id,
              name: subject.name,
              chapters: chaptersResponse.data,
            };
          })
        );

        setEachSubjectDetails(updatedEachSubjectDetails);
      } catch (error) {
        console.error("Error fetching subjects or chapters:", error);
      }
    };

    fetchSubjects();
  }, [courseid]);

  if (!EachSubjectDetails.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className=" grid grid-cols-1 xsm:grid-cols-2 md:flex font-istok  md:flex-row gap-2 md:gap-6 mb-6">
        {EachSubjectDetails.map((subject) => (
          <button
            key={subject.id}
            className={`px-4 py-3 text-black flex bg-gray-100 shadow h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-lg tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300 ${
              activeSubjectId === subject.id
                ? "border-gray-900"
                : "text-gray-700 hover:border-gray-900"
            }`}
            onClick={() => toggleSubject(subject.id)}
          >
            <h3 className="text-sm text-gray-800 mr-2">{subject.name}</h3>
            <span
              className={`transform transition-all duration-300 ${
                activeSubjectId === subject.id ? "rotate-180" : ""
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
          </button>
        ))}
      </div>

      {activeSubjectId && (
        <div className="mb-8">
          {EachSubjectDetails.map(
            (subject) =>
              subject.id === activeSubjectId && (
                <div key={subject.id}>
                  <h3 className="text-lg text-gray-800 mb-4">
                    {subject.name} Chapters
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {subject.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className={`px-4 py-3 text-black bg-gray-100 shadow  text-[16px] border border-gray-100 hover:border-gray-600 rounded-lg tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300 ${
                          selectedChapters.includes(chapter.id)
                            ? "border-teal-800"
                            : "border-gray-300"
                        }`}
                        onClick={() => toggleChapter(chapter)}
                      >
                        <h4 className="text-sm text-gray-800 line-clamp-2">
                          {chapter.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

const ModalTimeQuestions = ({
  onNext,
  onBack,
  setNumQuestions,
  setTime,
  setDifficulty,
  numQuestions,
  time,
  difficulty,
}) => {
  const isNextEnabled = time && numQuestions && difficulty;

  return (
    <div className="px-2 modal w-fit rounded-lg  mx-auto font-istok  font-semibold">
      <h2 className="xs:text-lg  text-left mb-4">Set Duration</h2>
      <TimeSelector time={time} setTime={setTime} />

      <h2 className="xs:text-lg  text-left mb-4">Set Number of Questions</h2>
      <QuestionSelector
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
      />

      <h2 className="xs:text-lg  text-left mb-4">Set Difficulty</h2>
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-1 text-black bg-gray-100 shadow h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-full tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300"
        >
          Back
        </button>

        <button
          disabled={!isNextEnabled}
          onClick={onNext}
          className={`px-4 py-1 text-black bg-gray-100 shadow h-fit text-[16px] border border-gray-100 hover:border-gray-600 rounded-full tracking-wider disabled:text-gray-300 active:border-[2px] transition-all duration-300${
            isNextEnabled
              ? "hover:border-gray-500"
              : "text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ModalSubjects = ({
  onNext,
  setSubjects,
  subjects,
  selectedChapters,
  setSelectedChapters,
  courseid,
  setTestType,
}) => {
  const [selectedTestType, setSelectedTestType] = useState(null);
  const [selectedChaptersName, setSelectedChaptersName] = useState([]); // Ensure it's always an array

  const handleTestTypeSelection = (type) => {
    setTestType(type);
    setSelectedTestType(type);
  };

  const isNextEnabled = selectedChapters.length > 0 && selectedTestType != null;

  return (
    <div className="px-6 py-4 modal bg-white rounded-lg w-full mx-auto font-istok font-semibold">
      <h2 className="xs:text-xl text-left mb-4 font-bold text-gray-800">
        Select Exam Type
      </h2>

      {/* Test Type Selection */}
      <div
        onClick={() => handleTestTypeSelection(1)}
        className={`px-4 py-3 text-black bg-gray-100 shadow text-[16px] border border-gray-100 hover:border-gray-600 rounded-2xl active:border-[2px] transition-all duration-300 ${
          selectedTestType === 1 ? "border-gray-900" : "hover:border-gray-900"
        }`}
      >
        <div className="flex items-center space-x-4">
          <span role="img" aria-label="icon" className="text-xl">
            🎲
          </span>
          <div>
            <h3 className="font-bold text-gray-800">Random Choice Questions</h3>
            <p className="text-[12px] hidden sm:block xs:text-sm font-normal sm:text-sm mt-1">
              Questions will be randomly allocated based on the selected chapters.
            </p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleTestTypeSelection(2)}
        className={`px-4 py-3 text-black bg-gray-100 my-4 shadow text-[16px] border border-gray-100 hover:border-gray-600 rounded-2xl active:border-[2px] transition-all duration-300 ${
          selectedTestType === 2 ? "border-gray-900" : "hover:border-gray-900"
        }`}
      >
        <div className="flex items-center space-x-4">
          <span role="img" aria-label="icon" className="text-xl">
            🧠
          </span>
          <div>
            <h3 className="font-bold text-gray-800">Curated Questions</h3>
            <p className="text-[12px] xs:text-sm hidden sm:block font-normal sm:text-sm mt-1">
              Curated and designed questions based on your weak concepts from the selected chapters.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Chapters */}
      <h2 className="xs:text-xl text-left mb-4 pt-4 font-bold text-gray-800">
        {selectedChaptersName.length > 0
          ? `Selected Chapters: ${selectedChaptersName.join(", ")}`
          : "Select Chapters:"}
      </h2>

      <ChapterSelector
        setSubjects={setSubjects}
        subjects={subjects}
        selectedChapters={selectedChapters}
        setSelectedChapters={setSelectedChapters}
        selectedChaptersName={selectedChaptersName}
        setSelectedChaptersName={setSelectedChaptersName}
        courseid={courseid}
      />

      {/* Next Button */}
      <div className="flex justify-between mt-6">
        <button
          disabled={!isNextEnabled}
          onClick={onNext}
          className={`px-4 py-1 text-black bg-gray-100 shadow text-[16px] border border-gray-100 rounded-full transition-all duration-300 ${
            isNextEnabled ? "hover:border-gray-500" : "text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};




const TestCreator = ({ id }) => {
  const router = useRouter();
  const userId = localStorage.getItem("user_id");

  const [showModal, setShowModal] = useState(1);
  const [numQuestions, setNumQuestions] = useState(null);
  const [time, setTime] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [examname, setExamName] = useState("");
  const [testType, setTestType] = useState(null);

  const [selectedChapters, setSelectedChapters] = useState([]);

  const handleNext = () => setShowModal((prev) => prev + 1);
  const handleBack = () => setShowModal((prev) => prev - 1);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/exams/?user_id=${userId}`);
        const examCount = response.data.length;
        const newExamName = `Practice Test ${examCount + 1}`;

        setExamName(newExamName);
      } catch (err) {
        setError("Failed to fetch exams.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchExams();
  }, [userId]);

  const handleSubmit = async () => {
    if (!numQuestions || !difficulty || selectedChapters.length === 0) {
      console.error("Please fill in all required fields.");
      return;
    }

    try {
      const chapterQueryString = selectedChapters
        .map((chapterId) => `chapter_ids=${encodeURIComponent(chapterId)}`)
        .join("&");

      let questionApiUrl = "";

      if (testType === 2) {
        questionApiUrl = `/api/curated-questions?difficulty=${difficulty}&total_questions=${numQuestions}&${chapterQueryString}`;
      } else if (testType === 1) {
        questionApiUrl = `/api/chapter-questions?difficulty=${difficulty}&total_questions=${numQuestions}&${chapterQueryString}`;
      }

      console.log(questionApiUrl);
      const questionResponse = await api.get(questionApiUrl);
      const questionIds = questionResponse.data.map((q) => q.id);

      const examPayload = {
        exam_title: examname,
        time: time,
        user: userId,
        difficulty: difficulty,
        is_fullCourseExam: false,
        is_fullSubjectExam: false,
        is_fullChapterExam: false,
        is_customTest: true,
        course: null,
        subject: null,
        chapter: null,
      };

      //console.log(examPayload);
      const createExamResponse = await api.post(`api/exams/`, examPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newExamId = createExamResponse.data.exam_id;
      //console.log("New Exam Created:", newExamId);
      const linkRequests = questionIds.map((questionId) =>
        api.post(`/api/examquestions/`, {
          exam: newExamId,
          question: questionId,
        })
      );

      await Promise.all(linkRequests);
      //console.log("All questions linked to exam successfully");

      const payload_exam_data = {
        exam_id: newExamId,
        current_question_index: 0,
        answers: {},
        visited: [],
        marked_for_review: [],
        time_remaining: time * 60,
        is_timer_running: false,
        is_active: true,
        attempt_number: 1,
        user: userId,
        is_submitted: false,
      };

      try {
        const response = await api.post(`/api/exam-data/`, payload_exam_data);
        console.log("Test started successfully:", response.data);
      } catch (error) {
        console.error("Error starting the test:", error);
      }

      router.push(`/tests/custom/exams/${newExamId}`);
    } catch (error) {
      console.error("Error during exam creation process:", error);
    }
  };

  return (
    <div className="py-4 relative">
      <>
        {showModal === 2 && (
          <ModalTimeQuestions
            onNext={handleSubmit}
            onBack={handleBack}
            setNumQuestions={setNumQuestions}
            setTime={setTime}
            setDifficulty={setDifficulty}
            numQuestions={numQuestions}
            time={time}
            difficulty={difficulty}
          />
        )}
        {showModal === 1 && (
          <ModalSubjects
            onNext={handleNext}
            setSubjects={setSubjects}
            subjects={subjects}
            selectedChapters={selectedChapters}
            setSelectedChapters={setSelectedChapters}
            courseid={id}
            setTestType={setTestType}
          />
        )}
      </>
    </div>
  );
};

export default TestCreator;

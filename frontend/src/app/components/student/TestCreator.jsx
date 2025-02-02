"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "../../services/api";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
              <small className="hidden sm:block text-sm ">{t.value} minutes </small>
              <small className=" sm:hidden text-sm ">{t.value} </small>
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
              <small className=" hidden sm:block text-sm ">{num.value} Questions</small>
              <small className=" sm:hidden text-sm ">{num.value}</small>
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
              <small className="hidden sm:block text-sm font-">Level {d.value}</small>
              <small className="sm:hidden text-sm ">{d.value}</small>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const SubjectSelector = ({
  setSubjects,
  subjects,
  selectedChapters,
  setSelectedChapters,
  courseid,
}) => {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [expandedSubjects, setExpandedSubjects] = useState([]);

  const toggleChapter = (chapter) => {
    setSelectedChapters((prev) =>
      prev.includes(chapter)
        ? prev.filter((item) => item !== chapter)
        : [...prev, chapter]
    );
  };

  const toggleSubject = (subjectName) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectName)
        ? prev.filter((item) => item !== subjectName)
        : [...prev, subjectName]
    );
    setSubjects((prev) =>
      prev.includes(subjectName)
        ? prev.filter((item) => item !== subjectName)
        : [...prev, subjectName]
    );
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get(
          `/api/subjects/?course_id=${courseid}`
        );
        const subjectsData = response.data;

        const updatedSubjectOptions = await Promise.all(
          subjectsData.map(async (subject) => {
            const chaptersResponse = await api.get(
              `/api/chapters/?subject=${subject.id}`
            );
            return {
              ...subject,
              chapters: chaptersResponse.data,
            };
          })
        );
        setSubjectOptions(updatedSubjectOptions);
      } catch (error) {
        console.error("Error fetching subjects or chapters:", error);
      }
    };

    fetchSubjects();
  }, [courseid]);

  if (!subjectOptions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex  gap-6 mb-6">
        {subjectOptions.map((subject) => (
          <div
            key={subject.id}
            className={`p-4  border  transition-all duration-100 hover:border-gray-500 rounded-2xl  ${
              subjects.includes(subject.name)
                ? "border-teal-800"
                : "border-gray-300"
            }`}
            onClick={() => toggleSubject(subject.name)}
          >
            <div className="flex items-center space-x-4 cursor-pointer">
              <h3 className="text-sm font-instSansB font-bold text-gray-800">
                {subject.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {subjects.map((selectedSubject) => {
        const currentSubject = subjectOptions.find(
          (subject) => subject.name === selectedSubject
        );

        return (
          <div key={currentSubject.id} className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {currentSubject.name} Chapters
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {currentSubject.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`p-4 border flex items-center  transition-all duration-100 hover:border-gray-500 hover:shadow rounded-2xl ${
                    selectedChapters.includes(chapter.id)
                      ? "border-teal-800"
                      : "border-gray-300"
                  }`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-2">
                    {chapter.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ModalTimeQuestions = ({
  onNext,
  setNumQuestions,
  setTime,
  setDifficulty,
  numQuestions,
  time,
  difficulty,
}) => {
  const isNextEnabled = time && numQuestions && difficulty;

  return (
    <div className="px-2 modal w-fit rounded-lg  text-gray-800 mx-auto font-instSansB">

      <h2 className="text-lg text-left mb-4">Set Duration</h2>
      <TimeSelector time={time} setTime={setTime} />

      <h2 className="text-lg text-left mb-4">Set Number of Questions</h2>
      <QuestionSelector
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
      />

      <h2 className="text-lg text-left mb-4">Set Difficulty</h2>
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="text-left mt-6">
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
  onBack,
  setSubjects,
  subjects,
  selectedChapters,
  setSelectedChapters,
  courseid,
}) => {
  const isNextEnabled = subjects.length > 0 && selectedChapters.length > 0;

  return (
    <div className="px-2 modal bg-white rounded-lg w-full mx-auto font-instSansB">
      <h2 className="text-lg font-semibold text-left mb-4">
        Select Subjects and Chapters
      </h2>
      <SubjectSelector
        setSubjects={setSubjects}
        subjects={subjects}
        selectedChapters={selectedChapters}
        setSelectedChapters={setSelectedChapters}
        courseid={courseid}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="border px-6 py-2 text-md font-jakarta rounded-lg font-bold transition-all text-gray-700 hover:border-gray-900"
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!isNextEnabled}
          className={`border px-6 py-2 text-md font-jakarta rounded-lg font-bold transition-all ${
            isNextEnabled
              ? "hover:border-gray-500"
              : "text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
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
  const [difficulty, setDifficulty] = useState(null); // New state for difficulty
  const [subjects, setSubjects] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);

  const handleNext = () => setShowModal((prev) => prev + 1);
  const handleBack = () => setShowModal((prev) => prev - 1);
  const handleClose = () => setShowModal(0);

  const handleSubmit = async () => {
    if (!numQuestions || !difficulty || selectedChapters.length === 0) {
      console.error("Please fill in all required fields.");
      return;
    }

    try {
      const chapterQueryString = selectedChapters
        .map((chapterId) => `chapter_ids=${encodeURIComponent(chapterId)}`)
        .join("&");

      const questionApiUrl = `/api/chapter-questions?difficulty=${difficulty}&total_questions=${numQuestions}&${chapterQueryString}`;
      console.log( questionApiUrl)
      const questionResponse = await api.get(questionApiUrl);
      const questionIds = questionResponse.data.map((q) => q.id);

      console.log("Fetched Questions:", questionIds);

      const examPayload = {
        exam_title: "customtest",
        time: time,
        user:userId,
        difficulty: difficulty,
        is_fullCourseExam: false,
        is_fullSubjectExam: false,
        is_fullChapterExam: false,
        is_customTest: true,
        course: null,
        subject: null,
        chapter: null,
      };

      console.log(examPayload);
      const createExamResponse = await api.post(
        `/api/exams/`,
        examPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newExamId = createExamResponse.data.exam_id;
      console.log("New Exam Created:", newExamId);
      const linkRequests = questionIds.map((questionId) =>
        api.post(`/api/examquestions/`, {
          exam: newExamId,
          question: questionId,
        })
      );

      await Promise.all(linkRequests);
      console.log("All questions linked to exam successfully");

      const payload_exam_data = {
        exam_id: newExamId,
        current_question_index: 0,
        answers: {},
        visited: [],
        marked_for_review: [],
        time_remaining: time*60,
        is_timer_running: false,
        is_active: true,
        attempt_number: 1,
        user: userId,
        is_submitted: false,
      };

      try {
        const response = await api.post(
          `/api/exam-data/`,
          payload_exam_data
        );
        console.log("Test started successfully:", response.data);
      } catch (error) {
        console.error("Error starting the test:", error);
      }

      router.push(`/tests/custom/exams/${newExamId}`);
    } catch (error) {
      console.error("Error during exam creation process:", error);
    }

    setShowModal(0);
  };

  return (
    <div className="py-4 relative">
      <>
      
      {showModal === 1 && (
        <ModalTimeQuestions
          onNext={handleNext}
          setNumQuestions={setNumQuestions}
          setTime={setTime}
          setDifficulty={setDifficulty}
          numQuestions={numQuestions}
          time={time}
          difficulty={difficulty}
          
        />
        
      )}
      {showModal === 2 && (
        <ModalSubjects
          onNext={handleSubmit}
          onBack={handleBack}
          setSubjects={setSubjects}
          subjects={subjects}
          selectedChapters={selectedChapters}
          setSelectedChapters={setSelectedChapters}
          courseid={id}
        />
      )}</>
      
    </div>
  );
};

export default TestCreator;

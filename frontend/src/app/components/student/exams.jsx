import React, { useState, useEffect } from "react";
import InfoCard from "../Card";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Exams = ({ id, setIsTestCreatorOpen }) => {

  const userId = localStorage.getItem("user_id");
  const [examMetadata, setExamMetadata] = useState([]);
  const [isTestCreatorOpenInside, setIsTestCreatorOpenInside] = useState(false);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createtesttoggler = () => {
    const newState = !isTestCreatorOpenInside;
    setIsTestCreatorOpenInside(newState);
    setIsTestCreatorOpen(newState); 
  };

  // useEffect(() => {
  //   const fetchExams = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/api/exams/?course_id=${id}`
  //       ); // Change this URL as per your actual endpoint
  //       setExams(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch exams.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchExams();
  // }, []);

  // useEffect(() => {
  //   const fetchAllExamMetaData = async () => {
  //     if (!userId) return;

  //     try {
  //       const metadataPromises = exams.map((exam) =>
  //         axios.get(
  //           `http://127.0.0.1:8000/api/exam-data/filter/?user=${userId}&exam_id=${exam.exam_id}`
  //         )
  //       );

  //       const metadataResponses = await Promise.all(metadataPromises);

  //       const metadata = metadataResponses.map((response, index) => {
  //         const examData = response.data[0];
  //         return {
  //           examId: exams[index].exam_id,
  //           is_active: examData ? examData.is_active : false,
  //           is_submitted: examData ? examData.is_submitted : false,
  //         };
  //       });

  //       setExamMetadata(metadata);
  //       console.log("Fetched Exam Metadata: ", metadata);
  //     } catch (error) {
  //       console.error("Error fetching exam metadata:", error);
  //     }
  //   };

  //   if (exams.length > 0) {
  //     fetchAllExamMetaData();
  //   }
  // }, [exams, userId]);

  // const handleStartTest = async (examId) => {
  //   if (!userId || !examId) {
  //     console.error("Missing user_id or examId");
  //     return;
  //   }

  //   const payload = {
  //     exam_id: examId,
  //     current_question_index: 1,
  //     answers: {},
  //     visited: [],
  //     marked_for_review: [],
  //     time_remaining: 1800,
  //     is_timer_running: false,
  //     is_active: true,
  //     attempt_number: 1,
  //     user: userId,
  //     is_submitted: false,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/exam-data/",
  //       payload
  //     );
  //     console.log("Test started successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error starting the test:", error);
  //   }
  // };

  return (
    <div className="relative">
      <div className="flex  transition-all rounded-2xl hover:shadow hover:border-gray-500 duration-100  items-center justify-between p-4 border border-gray-300  mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-none flex items-center justify-center rounded-full">
            <span role="img" aria-label="exam-icon" className="text-2xl">
              🛠️
            </span>
          </div>
          {/* Details */}
          <div>
            <h3 className="text-lg font-bold font-instSansB text-gray-800">
              Custom Tests
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Create and customize your own test sessions!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center ">
          <button
            onClick={createtesttoggler}
            className="px-4 py-2 border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-sm"
          >
            Create
          </button>
          <Link href={`/tests/custom/${userId}`}>
          <button
            className="px-6 py-2 border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-sm"
          >
            View
          </button>
          </Link>
        </div>
      </div>


      <InfoCard
        title="Proctored Examinations"
        description="Write tests carefully curated by our faculties."
        icon="🏆"
        buttonText="View"
        link={`/tests/proctored/${id}`}
      />
      <InfoCard
        title="Watch Classes"
        description="Original and dedicated classes for each chapter."
        icon="🎥"
        buttonText="View"
        link={`/learn/subjects/${id}`}
      />
      <InfoCard
        title="Practice Questions"
        description="Exam oriented questions and answers."
        icon="📜"
        buttonText="View"
        link={`/questions/${id}`}
      />
      <InfoCard
        title="General & Announcements"
        description="Latest updates and information."
        icon="🎓"
        buttonText="View"
        link={`/`}
      />
    </div>
  );
};

export default Exams;

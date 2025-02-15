import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../services/api";


const StudyMaterials = () => {
  const [studyMaterials, setStudyMaterials] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const response = await api.get(`/api/lecture-notes/?is_featured=true`);
        setStudyMaterials(response.data);
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
      }
    };

    fetchStudyMaterials();
  }, []);

  return (
    <div className="my-10 ">
                <h3 className="text-2xl sm:text-4xl md:mb-4 font-bold text-gray-800 font-inter">
          Featured Notes
        </h3>
        <hr className="mt-2 -mr-[40vw] mb-5 md:mb-8 "></hr>
      {studyMaterials?.length === 0 ? (
        <p className="text-gray-600 mt-4">No lecture notes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-4 md:gap-y-6 mt-4">
          {studyMaterials?.map((note, index) => {
            const hasPdf = !!note.pdf_file; // Check if pdf_file exists

            return hasPdf ? (
              <Link
                key={index}
                href={note.pdf_file}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="border border-gray-300 rounded-2xl shadow-sm transition-all hover:shadow-md overflow-hidden flex items-center p-4">
                  <span className="text-2xl">🗂️</span>
                  <div className="ml-4 flex-1">
                    <h4 className="font-inter font-semibold text-gray-900 truncate">
                      {note.pdf_title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 font-istok">
                      {note.pdf_type}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-sm overflow-hidden flex items-center p-4 bg-gray-50 cursor-not-allowed"
              >
                <span className="text-2xl">🗂️</span>
                <div className="ml-4 flex-1">
                  <h4 className="font-inter font-semibold text-gray-900 truncate">
                    {note.pdf_title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 font-istok">
                    {note.pdf_type}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;

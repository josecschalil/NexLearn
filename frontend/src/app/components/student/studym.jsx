import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const StudyMaterials = () => {
  const [StudyMaterials, setStudyMaterials] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      const response = await fetch(
        `${apiUrl}/api/lecture-notes/?is_featured=true`
      );

      if (response.ok) {
        const data = await response.json();
        setStudyMaterials(data);
      } else {
        console.error("Failed to fetch StudyMaterials");
      }
    };

    fetchStudyMaterials();
  }, []);

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold text-gray-800 font-instSansB mb">
        Lecture Notes
      </h3>
      {StudyMaterials?.length === 0 ? (
        <p className="text-gray-600 mt-4">No lecture notes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {StudyMaterials?.map((note, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm transition-all hover:shadow-md overflow-hidden "
            >
              <div className="p-4">
                <h4 className=" font-instSansB text-gray-900 truncate">
                  {note.pdf_title}
                </h4>

                <p className="text-sm text-gray-500 mt-1 font-istok">{note.pdf_type}</p>
              </div>
              <div className="w-full bg-teal-700 flex  justify-end px-4 py-2 ">
                <Link
                  href={`${note.pdf_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white  font-istok"
                >
                  Download
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;

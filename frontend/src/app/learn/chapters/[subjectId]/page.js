"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SubjectPage = () => {
  const { subjectId } = useParams(); 
  const [chapters, setChapters] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) {
      console.error("subjectId is undefined!");
      return;
    }

    const fetchChapters = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/chapters/subject/${subjectId}`
        );

        if (response.ok) {
          const data = await response.json();
          setChapters(data);
        } else {
          console.error("Failed to fetch chapters");
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchChapters();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>No chapters available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:bg-gray-50 md:py-8 font-jakarta md:px-6">
      <div className="max-w-5xl mx-auto bg-white md:shadow-md md:rounded-2xl p-6">
      
        <div className="flex-col justify-center gap-4 mb-6">
        <h2 className="text-2xl text-gray-700 font-instSansB mb-4">
      Chapters
          </h2>
          <div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 ">
            {chapters.map((chapter, index) => (
              <Link key={index} href={`${apiUrl}/learn/contents/${chapter.id}`}>
                <div className="w-full hover:border-gray-400   flex  items-center justify-between pl-2 pr-4 py-3 border rounded-xl">

                  <div className="flex items-center space-x-4">

                    <div className="h-10 w-10 flex items-center justify-center rounded-full">
                      <span
                        role="img"
                        aria-label="course-icon"
                        className="text-2xl"
                      >
                        {chapter.icon || "📘"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-md font-instSansB text-gray-800 line-clamp-1">
                        {chapter.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {chapter.contents} contents
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;

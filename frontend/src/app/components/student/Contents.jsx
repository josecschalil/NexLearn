import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../services/api";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Contents = () => {
  const [Videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/api/lecture-videos/?is_featured=true`);
        setVideos(response.data); // Axios automatically parses JSON
      } catch (error) {
        console.error("Failed to fetch Videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="font-inter ">
      <div className="mb-[4vh]">
        <h3 className="text-2xl sm:text-4xl md:mb-4 font-bold text-gray-800 font-inter">
          Featured Classes
        </h3>
        <hr className="mt-2 -mr-[40vw] "></hr>
        {Videos?.length === 0 ? (
          <p className="text-gray-600 mt-4">No videos available.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ">

            {Videos?.map((video, index) => (
              <Link
                key={index}
                href={`/learn/video/${video.id}`}
                className="group"
              >
                <div className="cursor-pointer">
                  
                  <div className="relative w-fit">
                    <img
                      className="aspect-video w-fit rounded-lg h-48 object-cover transition-transform duration-300 "
                      src={video.thumbnail}
                      alt={video.video_title}
                    />
                    <span className="absolute bottom-2 right-4 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration || "10:00"}
                    </span>
                    </div>
                   
            
                  
                  <div className="flex items-center space-x-3 mt-4">
                    <span className="text-3xl mb-2 -mt-1">📽️</span>
                    <div className="flex-1">
                      <h4 className="text-md font-semibold text-gray-900 line-clamp-2">
                        {video.video_title}
                      </h4>
                      <p className="text-sm font-istok text-gray-600 mt-1">
                        {video.subject || "Physics"} •{" "}
                        {video.language || "Hindi"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contents;

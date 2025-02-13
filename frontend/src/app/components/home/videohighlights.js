import React, { useEffect, useState } from "react";
import VideoCard from "../videocard";
import Link from "next/link";
import api from "../../services/api"; 

const VideoHighlights = () => {
  const [Videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/api/lecture-videos/?is_featured=true"); 
        setVideos(response.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch Videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className=" pt-16 bg-transparent mb-10 sm:mb-16 md:mb-24 font-instSansN max-w-6xl mx-auto px-6">
      <div className="flex flex-col items-center gap-4 ">
        <h2
          className="text-3xl sm:text-4xl lg:text-[54px] text-center font-instSansB"
          style={{ color: "#009C84" }}
        >
          Video Classes featuring the finest tutors.
        </h2>

        <p className="mt-4 lg:text-xl font-instSansB max-w-[980px] text-center">
          Experience the best in online education with our video classes led by
          expert tutors. Dive deep into concepts, get your doubts cleared, and
          learn at your own pace from the comfort of your home.
        </p>
        <div className="flex items-center mt-1 justify-between w-fit px-3 pr-2 py-2 border border-gray-600 rounded-full shadow-md hover:border-gray-900">
          <Link href="/featured" className="flex justify-between items-center gap-2">
            <p className="text-sm font-interi font-medium ">see more</p>
            <div className="flex items-center justify-center w-6 h-6 bg-teal-900 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 range1:px-16 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {Videos?.map((video, index) => (
            <div key={index}>
              <VideoCard
                link={video.thumbnail}
                url={`/learn/video/${video.id}`}
                title={video.video_title}
                faculty="George Sir"
                time="34 mins"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoHighlights;

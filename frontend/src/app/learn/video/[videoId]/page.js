"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const VideosPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      console.error("videoId is undefined!");
      return;
    }

    const fetchVideo = async () => {
      try {
        const response = await api.get(`/api/lecture-videos/${videoId}/`);
    
        // Directly use response.data
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false once the operation finishes
      }
    };
    

    fetchVideo();
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading video...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div>
        <p>Video not found! Please try refreshing the page or check back later.</p>
      </div>
    );
  }

  return (
<div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
    <div className="max-w-6xl mx-auto bg-white p-6">
      <div className=" gap-4 ">
      <h3 className="text-xl  xs:text-3xl sm:text-4xl  md:mb-4 font-bold text-gray-800 font-inter">
            {chapter?.name}
          </h3>
          <hr className="mt-2 -mr-[40vw] mb-4 md:mb-8"></hr>
      <div className="max-w-5xl mx-auto bg-white  rounded-2xl md:p-6">
        <div className="mt-4 md:p-4">
          <div
            className="video-container bg-black rounded-lg overflow-hidden"
            style={{ position: 'relative', paddingTop: '56.25%' }}
          >
            <iframe
              src={video.video_path}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              className="absolute top-0 left-0 w-full h-full"
              title={video.video_title}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div></div>
  );
};

export default VideosPage;

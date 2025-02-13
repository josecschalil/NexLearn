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
    <div className="min-h-screen bg-gray-50 py-8 font-jakarta px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <div className="mt-4 p-4">
          <h2 className="text-xl font-semibold mb-4">{video.video_title}</h2>
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
  );
};

export default VideosPage;

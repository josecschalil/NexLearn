import React, { useState, useEffect } from "react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Contents = () => {
  const [Videos, setVideos] = useState(null);

  useEffect(() => {

    const fetchVideos = async () => {
      const response = await fetch(`${apiUrl}/api/lecture-videos/?is_featured=true`);
      
      if (response.ok) {
        const data = await response.json();
        setVideos(data); 
      } else {
        console.error("Failed to fetch Videos");
      }
    };

    fetchVideos(); 
  } ,[]); 



  return (
    <div>
   <div>
  <h3 className="text-xl font-semibold text-gray-800 font-instSansB">Classes</h3>
  {Videos?.length === 0 ? (
    <p className="text-gray-600 mt-4">No videos available.</p>
  ) : (
    <div className="flex  mt-4 flex-wrap justify-start gap-x-11 gap-4 mx-auto">
      {Videos?.map((video, index) => (
        <Link    key={index} href={`/learn/video/${video.id}`}>
        <div
       
          className=" min-w-72"
        >
          <div className="border w-fit border-gray-300 rounded-lg shadow-sm transition-all hover:shadow-md" >
          <img
            src={video.thumbnail}
            alt={video.video_title}
            className="w-80 h-48 object-cover rounded-lg hover:scale-[1.02] transition-all duration-300"
          />
          </div>
          
            <h4 className="text-md px-2 py-2 font-semibold text-gray-900 font-instSansB truncate">
              {video.video_title}
            </h4>
        
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

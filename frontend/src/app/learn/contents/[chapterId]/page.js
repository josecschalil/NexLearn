"use client";
import { useParams } from "next/navigation";
import { useEffect ,useState} from "react";
import Link from "next/link";
import api from "../../../services/api";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ChapterPage = () => {
  const { chapterId } = useParams(); 
  const [ contents, setContents] = useState(null);
  const [ chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterId) {
      console.error("course is undefined!");
      return;
    }

    const fetchChapterId = async () => {
      try {
        const response = await api.get(`/api/chapters/${chapterId}`);
    
        // Directly use response.data
        setChapter(response.data);
      } catch (error) {
        console.error("Error fetching chapter detail:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false once operation finishes
      }
    };
    

    fetchChapterId();
  }, [chapterId]);


  useEffect(() => {
      if (!chapterId) {
        console.error("subjectId is undefined!");
        return;
      }
  
      const fetchContents = async () => {
        try {
          const response = await api.get(`/api/lecture-videos/?chapter_id=${chapterId}`);
      
          // Directly use response.data
          setContents(response.data);
        } catch (error) {
          console.error("Error fetching contents:", error);
        } finally {
          setLoading(false); // Ensure loading is set to false once operation finishes
        }
      };
      
  
      fetchContents();
    }, [chapterId]);


  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
    <div className="max-w-6xl mx-auto bg-white p-6">
      <div className=" gap-4 ">
      <h3 className="text-xl  xs:text-3xl sm:text-4xl  md:mb-4 font-bold text-gray-800 font-inter">
            {chapter?.name}
          </h3>
          <hr className="mt-2 -mr-[40vw] mb-4 md:mb-8"></hr>

        {contents?.length === 0 ? (
          <p className="text-gray-600 mt-4">No videos available.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ">

            {contents?.map((video, index) => (
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
    </div>
  );
};

export default ChapterPage;

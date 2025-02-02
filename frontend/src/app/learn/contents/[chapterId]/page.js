"use client";
import { useParams } from "next/navigation";
import { useEffect ,useState} from "react";
import VideoCard2 from "@/app/components/videocard2";
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
    <div className="min-h-screen md:bg-gray-50 md:py-8 font-jakarta md:px-6">
      <div className="max-w-5xl mx-auto bg-white md:shadow-md md:rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 font-instSansB mb-10 mt-3 ml-4 ">
          {chapter?.name}
        </h2>

        <ul className="mt-4 mx-4 grid max2:grid-cols-1 grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-20 md:gap-y-10">
          {contents?.map((video) => (
            <VideoCard2
              key={video.id}
              link={video.thumbnail}
              url={`/learn/video/${video.id}`}
              title={video.video_title}

            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChapterPage;

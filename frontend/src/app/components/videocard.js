import React from "react";
import Image from "next/image";
import Link from "next/link";

const VideoCard = ({ title, faculty, time, link, url }) => {
  return (
    <div className="text-black hover:scale-[1.02] transition duration-300 flex justify-center items-center font-montserrat font-semibold">
      <Link href={url} passHref>
      
          <div className="">
          <img
            src={link}
            alt="Video Thumbnail"
            className="rounded-2xl h-48  aspect-video shadow-md object-cover"
          />
          </div>
       

        <div className="flex flex-col items-center mt-3 gap-1 font-jakarta   ">
          <p className="text-center text-sm md:text-md ">{title}</p>
          {/* <div className="flex  px-4 py-1 mt-1 rounded-full text-xs   text-gray-800  bg-gray-300 bg-opacity-25">
            <p className=" ">
              {faculty}
            </p>
            <div className="mx-2 my-auto w-1 h-1  rounded-full  bg-black"></div>
            <p className="">
              {time}
            </p>
          </div> */}
        </div>
      </Link>
    </div>
  );
};
export default VideoCard;

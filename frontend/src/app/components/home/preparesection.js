import React from "react";
import Link from "next/link";
const PrepareSection = () => {
  return (
    <section className="bg-gradient-to-r from-[#009A80] to-[#FFF5EF] p-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <div className="">
          <h1 className="text-3xl  text-center md:text-left font-instSansB leading-tight text-black">
            Prepare for your tests and entrance with us.
          </h1>
          <p className="text-gray-700 text-center md:text-left font mt-4">
            Explore our Featured Section for free study materials, including
            test papers, questions, and video lessons.
          </p>
        </div>
        {/* Right Content */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: "Courses",
              icon: "🎓",
              desc: "Structured lessons covering concepts and shortcuts.",
              link: "/courses",
            },
            {
              title: "Why Us?",
              icon: "💡",
              desc: "Perfectly Curated Questions for each individual.",
              link: "/about",
            },
            {
              title: "Test Series",
              icon: "📝",
              desc: "Full-length and topic-wise tests with detailed analysis.",
              link: "/featured",
            },
            {
              title: "Playlists",
              icon: "📚",
              desc: "Curated videos for quick learning and strategies.",
              link: "/featured",
            },
          ].map((item, idx) => (
            <Link key={idx} href={item.link}>
              {" "}
              <div className=" flex items-center gap-2 text-md bg-white px-1 font-jakarta md:font-inter lg:px-4 bg-opacity-65 shadow-md rounded-lg py-4 text-gray-900 hover:scale-105 transition-all duration-300">
                <span className="text-xl sm:text-3xl pl-2 sm:pl-0">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-bold  sm:px-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 ml-1 mt-1 hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrepareSection;

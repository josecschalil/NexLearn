import React from "react";

const SuccessStories = () => {
const stories = [
  {
    quote:
   `Shiv Sir's guidance transformed my approach to physics and problem-solving. I highly recommend him to any JEE aspirant. His teaching style is truly exceptional. His ability to make complex topics simple was invaluable during my preparation.`,
    name: "Ojas",
    designation: "IIT Bombay, Electrical Engineering",
    img: "/img.svg",
    image: "/testimony/ojas.png",
  },
  {
    quote:
      "Mr. Shiv Narayan Bishnoi's patient guidance and clear explanations made even the most complex topics simple. I owe much of my success to his unwavering belief in me. His dedication to his students is unparalleled.",
    name: "Rahul Chauhan",
    designation: "NIT Calicut, CSE",
    img: "/img2.svg",
    image: "/testimony/rahul.png",
  },
  {
    quote:
      "I am incredibly grateful to have had Shiv Sir as my physics teacher. His passion for teaching and unwavering support helped me succeed. I will always be thankful for the knowledge and confidence he instilled in me.",
    name: "Sejal",
    designation: "IIT Delhi",
    img: "/img2.svg",
    image: "/testimony/sejal.png",
  },
];


  return (
    <section className="w-full bg-gradient-to-r from-teal-500 to-green-100 py-16 font-jakarta">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black font-instSansB">
          Our Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 px-6 items-stretch">
          {stories.map((story, idx) => (
            <div key={idx} className="items-stretch ">
              <div
                className={`${
                  idx % 2 === 1 ? "bg-gray-800 text-white bg-opacity-75" : "bg-white"
                } p-6 py-6 pb-10 text-center relative rounded-3xl shadow-md md:h-2/3 `}
              >
                <img
                  className="h-5 w-5 mb-4 mx-auto"
                  src={story.img}
                  alt={story.name}
                />
                <blockquote className=" text-sm">
                  “{story.quote}”
                </blockquote>
              </div>
              <div className="mt-4 flex flex-col items-center text-center gap-1">
                <img
                  className="w-12 h-12 rounded-full border-2 hidden md:block border-gray-900 object-cover"
                  src={story.image}
                  alt={story.name}
                />
                <div>
                  <h4 className="font-bold text-sm mb-1">{story.name}</h4>
                  <p className="text-gray-600 text-sm">{story.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

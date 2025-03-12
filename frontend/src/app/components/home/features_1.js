import React from "react";

const Features_1 = () => {
  const features = [
    {
      id: 1,
      title: "Expert Faculty",
      description:
        "Learn from experienced educators with proven track records.",
      image: "/point.svg",
    },
    {
      id: 2,
      title: "Flexible Study Options",
      description:
        "Watch classes anytime, anywhere with our structured video lessons.",
      image: "/point.svg",
    },
    {
      id: 3,
      title: "Comprehensive Material",
      description:
        "Access in-depth notes, curated practice problems, and detailed solutions.",
      image: "/point.svg",
    },
  ];

  return (
    <section className=" py-[6vh] nmd:py-[10vh] bg-none flex flex-col nmd:flex-row max-w-6xl mx-auto px-6 font-jakarta">
      <img
        className="hidden nmd:absolute -right-[100px] -z-10 "
        src="/Vector.png"
      ></img>
      <div className=" my-auto flex-1 hidden nmd:block ">
        <img
          src="/shap1e.svg"
          alt="Student Studying"
          className="w-full  max-w-[530px] max-h-[530px]"
        />
      </div>
      <div className="flex-1 container mx-auto nmd:px-6  text-black nmd:ml-10 ">
        <h2 className="text-3xl lg:text-4xl text-center nmd:text-left font-instSansB nmd:max-w-[500px] text-gray-800 leading-[1.2em]">
          <span style={{ color: "#009D86" }}>Master Every Concept with</span>{" "}
          Curated Questions.
        </h2>
        <p className="mt-6 max1:text-md text-center nmd:text-left text-[1em] nmd:max-w-[550px]">
          Get handpicked questions tailored to your learning needs. Our smart
          algorithm analyzes your weak areas and provides targeted practice,
          ensuring efficient and effective preparation.
        </p>

        <div className="flex flex-col max-h-[700px] gap-2 nmd:gap-2 rounded mt-3 ">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="hover:px-4  p-3 -ml-1 hover:ml-4 hover:bg-[#6D6D6D] rounded-[30px] hover:shadow-[0px_4px_3px_rgba(0,0,0,0.4)]  flex flex-row transition-all duration-400 w-fit cursor-pointer group"
            >
              <img
                src="/point.svg"
                alt="Student Studying"
                className="w-full max-w-[50px] max-h-[50px] mr-3 my-auto"
              />
              <div className="text-left pr-2">
                <h3 className="font-bold text-lg text-[#006B5B] group-hover:text-white">
                  {feature.title}
                </h3>
                <p className=" text-black text-md nmd:max-w-[350px]  group-hover:text-white">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features_1;

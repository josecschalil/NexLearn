import React from "react";
import Link from "next/link";
const StartLearning = () => {
  return (
    <section className="py-16 bg-white text-black text-center">
      <h2 className="text-3xl font-instSansB">Start Learning with Us</h2>

      <div className=" flex text-sm justify-center gap-4 font-jakarta">
        <div className="mt-6 flex justify-center lg:justify-start space-x-4">
          <a
            href="/courses"
            className="bg-teal-700  font-bold relative z-10 font-inter hover:shadow-lg rounded-sm text-white px-6  py-2 text-sm  transition duration-300 ease-in-out hover:bg-teal-800"
          >
            View Our Plans
          </a>

          <a
            href="/signup"
            className="border font-inter font-bold border-black px-6  py-2  rounded-sm text-sm  hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out "
          >
            Start Learning
          </a>
        </div>
      </div>
      <p className="text-gray-700 mt-6 px-4">
        Enroll to our courses before the slots fill out.
      </p>
    </section>
  );
};

export default StartLearning;

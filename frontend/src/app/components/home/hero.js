"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const Hero = () => {

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  const heroData = {
    MainText: "Ace Your Exams with Confidence.",
    SubHeading: "Practice, Analyze, and Improve.",
    Description:
      "Track your progress with real-time analytics, practice custom tests, and stay ahead with exam-focused preparation. Join the revolution in online education today.",
  };

  const animateHero = () => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  };

  useEffect(() => {
    animateHero(); 
  },[]);
  return (
    <div
      className="px-6 font-inter mx-auto hero-section relative"
      style={{ backgroundColor: "#EBFFF9" }}
      ref={heroRef}
    >
      <img src="/elements.png" className="absolute z-0 h-[500px] opacity-30 lg:opacity-100 -top-[200px] left-[00px]"></img>
      <img src="/elements.png" className="absolute z-0 h-[500px] opacity-30 lg:opacity-100 -bottom-[200px] right-[00px]"></img>
      <div className="hero-overlay w-full h-[80vh] -mt-10 sm:mt-0  sm:h-[87vh] flex flex-col items-center justify-center text-center">

        <div style={{ backgroundColor: "#EBFFF9" }} className="flex items-center mb-6 z-10 relative  justify-between w-fit px-3 pr-2 py-2 border border-gray-600 rounded-full shadow-md hover:border-gray-900">
          <Link href="/signup" style={{ backgroundColor: "#EBFFF9" }} className=" flex  rounded-2xl justify-between items-center gap-2">
            <p className="text-sm font-interi font-medium relative z-10 "
             
             >{heroData.SubHeading}</p>
            <div className="flex items-center justify-center w-6 h-6 bg-teal-900 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <h1 ref={titleRef} className="px-4 text-5xl font-instSansB sm:text-6xl font-bold mb-6">
          {heroData.MainText}
        </h1>

        <p
          ref={descriptionRef}
          className="px-4 text-lg sm:text-xl font-inter font-semibold max-w-3xl mb-10 leading-relaxed"
        >
          {heroData.Description}
        </p>

        <div ref={buttonsRef} className="flex gap-6 px-6">
          <a
            href="/courses"
            className="border font-inter relative z-30 font-bold border-black px-6 sm:px-8 py-[2px]  rounded-sm text-sm sm:text-lg hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out"
          >
            Courses
          </a>
          <a
            href="/signin"
            className="bg-teal-700 font-bold relative z-50 font-inter hover:shadow-lg rounded-sm text-white px-6 sm:px-8 py-[5px] text-sm sm:text-lg transition duration-300 ease-in-out hover:bg-teal-800"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

"use client";

import Hero from "./components/home/hero";
import Sections from "./components/home/sections/sections";
import PrepareSection from "./components/home/preparesection";
import Features_1 from "./components/home/features_1";
import FeaturedCourses from "./components/home/featuredcourses";
import SuccessStories from "./components/home/successstories";
import VideoHighlights from "./components/home/videohighlights";
import FAQ from "./components/home/faq";
import StartLearning from "./components/home/startlearning";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden bg-white font-inter text-slate-950">
      <Hero />
      <Sections />
      <PrepareSection />
      <Features_1 />
      <FeaturedCourses />
      <SuccessStories />
      <VideoHighlights />
      <FAQ />
      <StartLearning />
      <Footer />
    </main>
  );
}

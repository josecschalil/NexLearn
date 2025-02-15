"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import api from "../services/api"; 

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/courses"); 
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
    <div className="max-w-6xl mx-auto bg-white py-8  rounded-xl p-6">
    <h3 className="text-xl sm:text-2xl md:text-4xl font-bold font-inter text-gray-800">Courses</h3>
      <hr className="mt-2 -mr-[40vw] mb-6 md:mb-8"></hr>

      <div className="grid max2:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {courses.map((course) => (
          <ProductCard key={course.id} course={course} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default CoursesPage;

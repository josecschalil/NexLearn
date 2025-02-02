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
    <div className="max-w-7xl mx-auto bg-white py-8 font-poppins rounded-xl p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Courses</h2>
      <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

      <div className="grid max2:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {courses.map((course) => (
          <ProductCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

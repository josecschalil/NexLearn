"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import api from "../services/api";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/courses");
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (selectedExam) {
      filtered = filtered.filter((course) => course.exam_type === selectedExam);
    }
    if (selectedType) {
      filtered = filtered.filter(
        (course) => course.course_type === selectedType
      );
    }
    setFilteredCourses(filtered);
  }, [selectedExam, selectedType, courses]);

  const examFilters = ["JEE", "NEET"];
  const typeFilters = ["Chapter-wise", "Class 11th", "Class 12th", "Combined"];

  return (
    <div className="min-h-screen md:pb-8 font-jakarta md:pr-6 overflow-x-hidden">

    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-64 sm:min-h-[100vh]  pl-8 pt-16 hidden md:block border-r ">
        <h3 className="text-xl font-bold font-inter text-gray-800 mb-4 border-b pb-4">Filters</h3>
  
        <h4 className="font-semibold  mb-4">Exam</h4>
        <div className="flex flex-col gap-3 mb-4  border-b pb-8">
          {examFilters.map((exam) => (
            <label key={exam} className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={selectedExam === exam}
                onChange={() => setSelectedExam(selectedExam === exam ? null : exam)}
                className="w-4 h-4 rounded-sm border-gray-300"
              />
              {exam}
            </label>
          ))}
        </div>
  
        <h4 className="font-semibold  mb-4 ">Type</h4>
        <div className="flex flex-col gap-3 border-b pb-4">
          {typeFilters.map((type) => (
            <label key={type} className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={selectedType === type}
                onChange={() => setSelectedType(selectedType === type ? null : type)}
                className="w-4 h-4 rounded-sm border-gray-300"
              />
              {type}
            </label>
          ))}
        </div>
      </div>
  
      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto bg-white py-8 pt-16 px-6 rounded-xl">
        <h3 className="text-xl xs:text-3xl sm:text-4xl font-bold font-inter text-gray-800 mb-6">Courses</h3>
        <hr className="mt-2 -mr-[40vw] mb-6 md:mb-8" />
  
        {/* Courses List */}
        <div className="grid max2:grid-cols-1 range1:px-10 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => <ProductCard key={course.id} course={course} />)
          ) : (
            <p className="text-center text-gray-500">No courses found</p>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CoursesPage;

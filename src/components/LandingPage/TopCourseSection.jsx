import React, { useEffect, useState } from "react";
import LandingPageServices from "../../services/LandingPageServices";
import { useNavigate } from "react-router-dom";
import CourseCard from "../common/CourseCard";

const TopCourseSection = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  useEffect(() => {
    const featchCourses = async () => {
      try {
        const response = await LandingPageServices.getTopCourses();

        if (response.success) {
          setCourses(response.data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    featchCourses();
  }, []);

  return (
    <div className=" px-20 py-10">
      {/* heading */}
      <div className="flex flex-row justify-between">
        <div className="font-bold text-2xl">Top Course</div>
        {/* icons */}
        <div className="flex flex-row justify-between gap-5">
          <button
            onClick={() => navigate("/Courses")}
            className="text-xl text-blue-700 font-semibold"
          >
            See All
          </button>
        </div>
      </div>
      {/* content */}
      <div className="grid  sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 py-10 ">
        {courses.map((course, index) => {
          return (
            <CourseCard key={index} course={course} renderStars={renderStars} />
          );
        })}
      </div>
    </div>
  );
};

export default TopCourseSection;

// src/components/CourseCard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, renderStars }) => {
  const navigate = useNavigate();

  return (
    <button
      className="flex flex-col justify-between bg-white   min-h-full border border-gray-200 rounded-2xl shadow-md overflow-hidden"
      onClick={() => navigate(`/Courses/CourseDetails/${course.id}`)}
    >
      <div className="relative px-3 py-3 ">
        <img
          src={course.coverURL}
          alt={course.courseName}
          className="rounded-2xl w-full h-48 object-cover border-2 border-blue-300 "
        />
        <div className="absolute top-6 left-6 border border-gray-400/80 bg-black/20 backdrop-blur-md shadow-md text-xl text-white font-bold px-4 py-1 rounded-2xl">
          {course.categoryName}
        </div>
      </div>

      <div className="flex flex-col justify-between items-start px-3 py-3">
        <h3 className="text-2xl font-semibold">{course.title}</h3>
        <p className="text-lg font-semibold text-gray-600">
          By {course.instructorName}
        </p>

        <div className="flex items-center mt-2 font-bold text-2xl">
          {renderStars(course.rate)}
        </div>

        <div className="mt-2 text-gray-700">
          <span>
            <span className="font-bold">{course.totalHours}</span> Total Hours,{" "}
          </span>
          <span>
            <span className="font-bold">{course.totalLectures}</span> Lectures,{" "}
          </span>
          <span className="font-semibold">{course.level}</span>
        </div>

        <div className="mt-3 font-bold text-xl">${course.cost}</div>
      </div>
    </button>
  );
};

export default CourseCard;

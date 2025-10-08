import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import LandingPageServices from "../../services/LandingPageServices";

const TopInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const featchInstructors = async () => {
      try {
        const response = await LandingPageServices.getTopInstructors();

        if (response.success) {
          setInstructors(response.data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    featchInstructors();
  }, []);

  return (
    <div className=" px-20 py-10">
      {/* heading */}
      <div className="flex flex-row justify-between">
        <div className="font-bold text-2xl">Top Insructors</div>
        {/* icons */}
        <div className="flex flex-row justify-between gap-5">
          {/* left arrow */}
          <div className="bg-slate-400 px-4 py-2 text-white rounded-lg text-2xl font-bold">
            <IoIosArrowBack />
          </div>
          {/* right arrow */}
          <div className="bg-slate-400 px-4 py-2 text-white rounded-lg text-2xl font-bold">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      {/* content */}
      <div className="grid  sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-10 py-10 ">
        {instructors.map((instructor, index) => {
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden"
            >
              <div className="relative p-4 ">
                <img
                  src={instructor.profilePictureURL}
                  alt={"gre"}
                  className=" rounded-2xl w-full h-48 object-cover"
                />
              </div>
              <div className="flex flex-col   p-4">
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-3xl font-semibold">
                    {instructor.fullName}
                  </h3>
                  <p className="text-xl font-semibold text-gray-600">
                    {instructor.jobTitle}
                  </p>
                </div>
                <div
                  className="flex flex-row justify-between py-4 mx-3 border-t border-t-gray-400
                  items-center mt-2 font-bold text-xl text-gray-600"
                >
                  <div>
                    <span className={"text-yellow-400 pr-2"}>★</span>
                    {instructor.rate}
                  </div>
                  <div>{instructor.numberOfStudents} students</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopInstructor;

import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { FaCode } from "react-icons/fa6"; // front end
import { IoServerOutline } from "react-icons/io5"; // backend
import { LuAtom } from "react-icons/lu"; // UI/UX
import { LuTelescope } from "react-icons/lu"; // FULL stack
import LandingPageServices from "../../services/LandingPageServices";
import { useAtom } from "jotai";
import { CategoryAtom } from "../../atoms/LandingPage";

const TopCategorySection = () => {
  const [categories, setCategories] = useAtom(CategoryAtom);
  const iconMap = {
    LuTelescope: LuTelescope,
    IoServerOutline: IoServerOutline,
    FaCode: FaCode,
    LuAtom: LuAtom,
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await LandingPageServices.getCategories();

        // console.log(response);
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className=" px-20 py-10">
      {/* heading */}
      <div className="flex flex-row justify-between">
        <div className="font-bold text-2xl">Top Categories</div>
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
      <div className="grid  sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 py-10 ">
        {categories.map((cat, index) => {
          const IconComponent = iconMap[cat.icon];
          return (
            <div
              key={index}
              className="flex flex-col justify-around items-center gap-3 bg-white border-2 border-sky-100  shadow-lg px-10 py-10 rounded-2xl"
            >
              {/* icon */}
              <div className="bg-blue-100 p-8 text-5xl text-blue-700 font-bold rounded-full">
                <IconComponent />
              </div>
              {/* title */}
              <div className="text-2xl font-bold ">{cat.name}</div>
              {/* number of courses */}
              <div className="text-lg font-semibold text-gray-500">
                {cat.courseCount} courses
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategorySection;

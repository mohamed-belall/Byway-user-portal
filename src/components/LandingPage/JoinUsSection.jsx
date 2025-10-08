import React from "react";
import JoinusImage1 from "../../assets/joinus1.png";
import JoinusImage2 from "../../assets/joinus2.png";

const JoinUsSection = () => {
  const joinItems = [
    {
      title: "Become an Instructor",
      description:
        "Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love.",
      buttonText: "Start Your Instructor Journey",
      image: JoinusImage1,
      bgColor: "bg-purple-200",
      reverse: false,
    },
    {
      title: "Transform your life through education",
      description:
        "Learners around the world are launching new careers, advancing in their fields, and enriching their lives.",
      buttonText: "Checkout Courses",
      image: JoinusImage2,
      bgColor: "bg-blue-200",
      reverse: true,
    },
  ];

  return (
    <div className="px-40 py-20 flex flex-col  gap-20">
      {joinItems.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center md:flex-row items-center  gap-10 ${
            item.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className={`  flex justify-center items-center`}>
            <img
              src={item.image}
              alt={item.title}
              className="w-140 h-140 object-cover rounded-2xl"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6 max-w-lg">
            <h2 className="text-3xl font-bold">{item.title}</h2>
            <p className="text-lg text-gray-600">{item.description}</p>
            <button className="bg-black text-white px-6 py-3 rounded-xl w-fit font-semibold hover:bg-gray-800 transition">
              {item.buttonText} →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinUsSection;

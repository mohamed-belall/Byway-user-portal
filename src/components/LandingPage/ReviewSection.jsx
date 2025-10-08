import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewSection = () => {
  const reviews = [
    {
      text: `"Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia."`,
      name: "Jane Doe",
      role: "Designer",
      image:
        "https://img.freepik.com/free-photo/front-view-smiley-handsome-man-with-crossed-arms_23-2148946218.jpg?t=st=1759241722~exp=1759245322~hmac=83bd11e284420c6478fe357d0e682897b1fa8bf5a9e69657648c8f2b23b5834f&w=1480",
    },
    {
      text: `"The platform has completely changed how I learn. The courses are structured clearly and the instructors are highly skilled."`,
      name: "Ali Hassan",
      role: "Software Engineer",
      image:
        "https://img.freepik.com/free-photo/confident-businessman-portrait-smiling_23-2148221808.jpg?w=1480",
    },
    {
      text: `"I love the interactive lessons! They made complex topics feel easy to understand and fun to learn."`,
      name: "Sara Ibrahim",
      role: "Student",
      image:
        "https://img.freepik.com/free-photo/young-beautiful-woman-smiling-looking-confident_23-2148302203.jpg?w=1480",
    },
  ];
  return (
    <div className=" bg-myBg px-20 py-10">
      {/* heading */}
      <div className="flex flex-row justify-between">
        <div className="font-bold text-5xl">What Our Customer Say About Us</div>
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
      <div className="grid  sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-10 py-10  ">
        {reviews.map((review, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-5 justify-between bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden p-10 "
            >
              <div className="text-blue-700">
                <FaQuoteLeft size={35} />
              </div>
              <div className="text-2xl">{review.text}</div>
              {/* review by */}
              <div className="flex flex-row items-center gap-4 ">
                <div className=" ">
                  <img
                    className="rounded-full w-20 h-20 object-cover"
                    src={review.image}
                    alt=""
                  />
                </div>

                <div>
                  <div className="text-2xl font-bold">{review.name}</div>

                  <div className="text-lg font-semibold text-gray-500">
                    {review.role}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;

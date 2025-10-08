import React from "react";
import LmsImage from "../../assets/LandingPage1.png";

const HeroSection = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-32 px-20">
      {/* left */}
      <div className="w-1/2 flex flex-col gap-12 ">
        <div className="text-7xl font-bold">
          Unlock Your Potential with Byway
        </div>
        <div className="text-2xl text-gray-800">
          Welcome to Byway, where learning knows no bounds. We believe that
          education is the key to personal and professional growth, and we're
          here to guide you on your journey to success.
        </div>
        <div>
          <div className="inline px-10 py-5 text-white rounded-xl text-xl bg-blue-500">
            Start Your Journy
          </div>
        </div>
      </div>
      {/* right */}
      <div className="w-1/2 pt-10">
        <img src={LmsImage} alt="lms.jpg" className="object-fill" />
      </div>
    </div>
  );
};

export default HeroSection;

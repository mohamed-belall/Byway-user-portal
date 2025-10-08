import React from "react";

import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";

const PurchaseCompletePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5">
      <IoCheckmarkCircle size={300} className="  text-green-600 " />

      <div className="font-bold text-6xl">Purchase Complete</div>
      <div className="font-bold text-2xl text-gray-500">
        You Will Revecive a confirmation email soon!
      </div>
      <button
        className="px-25 py-5 bg-black text-white rounded-xl"
        onClick={() => navigate("/LMS")}
      >
        Back to home
      </button>
    </div>
  );
};

export default PurchaseCompletePage;

import React from "react";
import CountUp from "react-countup";

const CounterSection = () => {
  return (
    <div className="flex flex-row justify-around bg-myBg py-10 my-10">
      {/*  */}
      <div className="flex flex-col justify-between items-center gap-3 px-13 border-r-6 border-gray-300">
        <div className="font-bold text-4xl text-primary">
          <CountUp start={0} end={250} duration={2} />+
        </div>
        <div className="text-lg font-semibold">Course By Our Best Mentors</div>
      </div>
      {/*  */}
      <div className="flex flex-col justify-between items-center gap-3 px-13 border-r-6 border-gray-300">
        <div className="font-bold text-4xl">
          <CountUp start={0} end={1000} duration={2} />+
        </div>
        <div className="text-lg ">Course By Our Best Mentors</div>
      </div>
      {/*  */}
      <div className="flex flex-col justify-between items-center gap-3 px-13 border-r-6 border-gray-300">
        <div className="font-bold text-4xl">
          <CountUp start={0} end={15} duration={2} />+
        </div>
        <div className="text-lg ">Course By Our Best Mentors</div>
      </div>
      {/*  */}
      <div className="flex flex-col justify-between items-center gap-3 px-13">
        <div className="font-bold text-4xl">
          {" "}
          <CountUp start={0} end={2400} duration={2} />+
        </div>
        <div className="text-lg ">Course By Our Best Mentors</div>
      </div>
    </div>
  );
};

export default CounterSection;

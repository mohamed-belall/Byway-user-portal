import { Range } from "react-range";
import { useState } from "react";

const LectureRangeSlider = () => {
  const STEP = 1;
  const MIN = 1;
  const MAX = 100;

  return (
    <div className="w-80">
      {/* Label */}
      <div className="mb-4 text-sm font-medium text-gray-700">
        Lectures: <span className="font-bold">{values[0]}</span> -{" "}
        <span className="font-bold">{values[1]}</span>
      </div>

      {/* Slider */}
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => setValues(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full bg-gray-200 rounded-full relative"
          >
            <div
              className="absolute h-2 bg-indigo-500 rounded-full text-2xl"
              style={{
                left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                right: `${100 - ((values[1] - MIN) / (MAX - MIN)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            className="w-5 h-5 bg-indigo-600 rounded-full shadow flex items-center justify-center text-xs text-white"
          >
            {values[index]}
          </div>
        )}
      />

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
    </div>
  );
};

export default LectureRangeSlider;

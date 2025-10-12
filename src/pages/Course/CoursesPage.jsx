import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaChevronDown, FaStar } from "react-icons/fa6";
import FilterDropdown from "../../components/common/FilterDropdown";

import { Range } from "react-range";
import { useAtom } from "jotai";
import { CategoryAtom } from "../../atoms/LandingPage";
import { useNavigate } from "react-router-dom";
import LandingPageServices from "../../services/LandingPageServices";
import CoursePageServices from "../../services/CoursePageServices";
import Pagination from "../../components/common/Pagination";
import CourseCard from "../../components/common/CourseCard";
import { CourseFiltersAtom } from "../../atoms/CourseAtom";

const CoursesPage = () => {
  // opening states
  const [ratingOpen, setRatingOpen] = useState(true);
  const [lectureOpen, setlectureOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);

  // rating
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setCourseFilter((prev) => ({ ...prev, Rate: i }))}
          className={`text-2xl ${
            i <= courseFilter.Rate ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400 transition-colors`}
        >
          ★
        </button>
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  // number of lecture
  const lectureNumberOptions = [
    { label: "1-15", value: [1, 15] },
    { label: "16-30", value: [16, 30] },
    { label: "31-45", value: [31, 45] },
    { label: "More than 45", value: [46] },
  ];

  // price
  const STEP = 1;
  const MIN = 1;
  const MAX = 10000;

  const [priceRange, setPriceRange] = useState([10, 5000]);

  const [categories, setCategories] = useState([
    { Id: 1, lable: "Fullstack", status: true },
    { Id: 2, lable: "Backend", status: true },
    { Id: 3, lable: "Frontend", status: true },
    { Id: 4, lable: "UX/UI Design", status: true },
  ]);

  const [courseFilter, setCourseFilter] = useAtom(CourseFiltersAtom);

  const fetchCorses = async () => {
    try {
      const response = await CoursePageServices.getCourses({
        pageSize: courseFilter.pageSize,
        pageIndex: courseFilter.pageIndex,
        Rate: courseFilter.Rate,
        NumberOfLecture: courseFilter.NumberOfLecture,
        price: courseFilter.price,
        Category: courseFilter.Category,
        Search: courseFilter.Search,
        Sort: courseFilter.Sort,
      });

     
      if (response.success) {
        setCourses(response.data.data);
      }
    } catch (err) {
      console.error(err.message);
    } 
  };

  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // const navigate = useNavigate();
  const renderStars = (Rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  useEffect(() => {
    const featchCourses = async () => {
      try {
        const response = await CoursePageServices.getCourses({
          pageIndex: 1,
          pageSize: 10,
        });

    
        if (response.success) {
          setCourses(response.data.data);
          setPageCount(response.data.count);
        }
      } catch (err) {
        console.error(err.message);
      } 
    };

    featchCourses();
  }, []);
  useEffect(() => {
    fetchCorses();
  }, [courseFilter]);

  const clearFilter = () => {
    setCourseFilter({
      pageSize: 8,
      pageIndex: 1,
      Rate: null,
      NumberOfLecture: null,
      price: null,
      Category: [],
      Search: null,
      Sort: null,
    });
  };

  return (
    <div className="flex flex-col gap-4 px-10 py-15">
      <div className="text-4xl font-bold">Design Course</div>
      <div className="text-xl font-semibold">All Development Courses</div>

      {/* filter and sorted */}
      <div className="flex flex-row justify-between">
        <div>
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg font-medium"
            onClick={() => clearFilter()}
          >
            <span>
              <IoFilter />
            </span>
            Clear Filter
          </button>
        </div>
        <div className="flex flex-row items-center gap-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for course"
            className="px-4 py-2 border rounded-lg font-medium"
            onChange={(e) => {
              setCourseFilter((prev) => ({ ...prev, Search: e.target.value }));
            }}
          />

          <FilterDropdown />
        </div>
      </div>

      {/* course section */}
      <div className=" flex flex-row min-h-screen">
        {/* filters */}
        <div className=" w-1/5  flex flex-col gap-7 mx-4">
          {/* rating */}
          <div className="">
            <button
              className="filter-button"
              onClick={() => {
                setRatingOpen(!ratingOpen);
                setCourseFilter((prev) => ({ ...prev, Rate: null }));
              }}
            >
              <h3>Rating</h3>
              <FaChevronDown className={`${ratingOpen ? "rotate-180" : ""}`} />
            </button>
            {ratingOpen ? (
              <div className="px-3 py-3">{renderStarRating()}</div>
            ) : (
              ""
            )}{" "}
          </div>

          {/* number of lec */}
          <div className="">
            <button
              className="filter-button"
              onClick={() => {
                setlectureOpen(!lectureOpen);
              }}
            >
              <h3>Number Of Lectures</h3>
              <FaChevronDown className={`${lectureOpen ? "rotate-180" : ""}`} />
            </button>
            {lectureOpen ? (
              <div className="px-3 py-3">
                {lectureNumberOptions.map((opt, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="lectures"
                          value={opt.value}
                          className="mr-2"
                          onClick={() => {
                            setCourseFilter((prev) => ({
                              ...prev,
                              NumberOfLecture: opt.value,
                            }));
                           
                          }}
                        />
                        {opt.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}{" "}
          </div>

          {/* price */}
          <div className="">
            <button
              className="filter-button"
              onClick={() => {
                setPriceOpen(!priceOpen);
              }}
            >
              <h3>Price</h3>
              <FaChevronDown className={`${priceOpen ? "rotate-180" : ""}`} />
            </button>
            {priceOpen ? (
              <div className="px-3 py-6">
                <Range
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  values={priceRange}
                  onChange={(vals) => {
                    setPriceRange(vals);
                    setCourseFilter((prev) => ({ ...prev, price: vals }));
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="h-2 w-full bg-gray-200 rounded-full relative "
                    >
                      <div
                        className="absolute h-2 bg-indigo-500 rounded-full "
                        style={{
                          left: `${
                            ((priceRange[0] - MIN) / (MAX - MIN)) * 100
                          }%`,
                          right: `${
                            100 - ((priceRange[1] - MIN) / (MAX - MIN)) * 100
                          }%`,
                        }}
                      />
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, index }) => (
                    <>
                      <div
                        key={index}
                        {...props}
                        className="w-5 h-5 bg-indigo-600 rounded-full shadow flex items-center justify-center  text-white"
                      >
                        <div className="text-black absolute top-6 font-bold">
                          {priceRange[index]}
                        </div>
                      </div>
                    </>
                  )}
                />
              </div>
            ) : (
              ""
            )}{" "}
          </div>

          {/* category */}
          <div className="">
            <button
              className="filter-button"
              onClick={() => {
                setCategoryOpen(!categoryOpen);
              }}
            >
              <h3>Category</h3>
              <FaChevronDown
                className={`${categoryOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoryOpen ? (
              <div className="px-3 py-3">
                {categories.map((cat, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          name="category"
                          checked={courseFilter.Category.includes(cat.Id)}
                          value={cat.Id}
                          className="mr-2"
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            setCourseFilter((prev) => ({
                              ...prev,
                              Category: checked
                                ? [...prev.Category, parseInt(value)]
                                : prev.Category.filter(
                                    (id) => id !== parseInt(value)
                                  ),
                            }));
                      
                          }}
                        />
                        {cat.lable}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}{" "}
          </div>
        </div>

        <div className="w-4/5 pl-10">
          {/* courses */}

          {courses.length == 0 ? (
            <div className="text-center  text-6xl my-20">
              Oops! No courses match your search criteria
            </div>
          ) : (
            <div className=" grid items-center justify-center sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 py-10 ">
              {courses.map((course, index) => {
                return (
                  <CourseCard
                    key={index}
                    course={course}
                    renderStars={renderStars}
                  />
                );
              })}
            </div>
          )}

          {/* pagination */}
          <Pagination
            filters={courseFilter}
            setFilters={setCourseFilter}
            totalCount={pageCount}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

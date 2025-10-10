import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa6"; // front end
import { IoServerOutline } from "react-icons/io5"; // backend
import { LuAtom } from "react-icons/lu"; // UI/UX
import { LuTelescope } from "react-icons/lu"; // FULL stack
import { SlGraduation } from "react-icons/sl";
import { IoPlayOutline } from "react-icons/io5";
import { BsAward } from "react-icons/bs";
import facebookIcon from "../../assets/icons/facebook.png";
import githubIcon from "../../assets/icons/GitHub.png";
import googleIcon from "../../assets/icons/google.png";
import xIcon from "../../assets/icons/x.png";
import microsoftIcon from "../../assets/icons/microsoft.png";
import CoursePageServices from "../../services/CoursePageServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../components/common/CourseCard";
import { useAtom } from "jotai";
import { cartWithPersistenceAtom } from "../../atoms/cartAtom";
import useCartServices from "../../services/CartServices";
import DOMPurify from "dompurify";
import LoadingSpinner from "../../components/common/Spinner/LoadingSpinner";

const CourseDetailsPage = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [topCourses, settopCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();
  const iconMap = {
    LuTelescope: LuTelescope,
    IoServerOutline: IoServerOutline,
    FaCode: FaCode,
    LuAtom: LuAtom,
  };

  // cards
  const [cart, setCart] = useAtom(cartWithPersistenceAtom);
  const { getCartItems, addToCart } = useCartServices();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDetails = await CoursePageServices.getCourseById(id);
        setCourse(courseDetails.data);

        const topCourses = await CoursePageServices.getTopCoursesWithCategoryId(
          courseDetails.data.categoryId
        );
        settopCourses(topCourses.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-red-600">
          Course not found
        </h2>
      </div>
    );
  }

  const shareOptions = [
    {
      name: "Facebook",
      img: facebookIcon,
    },
    { name: "GitHub", img: githubIcon },
    { name: "Google", img: googleIcon },
    { name: "X", img: xIcon },
    {
      name: "Microsoft",
      img: microsoftIcon,
    },
  ];
  const renderStars = (Rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  const renderIcon = (icon) => {
    const IconComponent = iconMap[icon];
    return <IconComponent className="text-3xl" />;
  };

  // const isInCart = cart.some((c) => c.id === course.id);

  const isInCart = Array.isArray(cart)
    ? cart.some((c) => c.id === course.id)
    : cart.items?.some((c) => c.id === course.id);

  const handleAddToCart = async () => {

    setLoading2(true);
    if (!isInCart) {
      try {
        const response = await addToCart(course.id);

        if (response.success) {
        
          const updatedCart = await getCartItems();
        
          if (updatedCart.success) {
          
            setCart(updatedCart.data);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
       
        setLoading2(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col  ">
        {/* preif */}
        <div className=" bg-myBg">
          <div className=" w-1/2 flex flex-col  px-20 gap-5 pt-20 pb-10">
            {/* title */}
            <h1 className="text-4xl font-bold">{course?.title}</h1>

            {/* description */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(course.description),
              }}
            ></div>

            {/* rate + number of lec + number of total hours + level */}
            <div className="flex flex-row gap-2 items-center">
              <div className="text-xl">
                {course.rate} {renderStars(course.rate)}
              </div>
              <div> | {course.totalHours} Total Hours.</div>
              <div>{course.totalLectures} Lectures.</div>
              <div>{course.level} </div>
            </div>

            {/*  created by */}
            <div className="flex flex-row items-center gap-2">
              <div>
                <img
                  className="rounded-full w-15 h-15 object-cover"
                  src={
                    course.instructor.profilePictureURL ||
                    "https://img.freepik.com/free-photo/front-view-smiley-h"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-row items-center gap-1 font-semibold">
                <div>Created By</div>
                <div className="text-blue-700 font-semibold">
                  {course.instructor.fullName}
                </div>
              </div>
            </div>

            {/* category */}
            <div className="flex flex-row items-center gap-2  shadow shadow-blue-300 bg-white w-fit rounded-2xl px-4 py-2">
              {/* <mycategoryIcon className="text-3xl" /> */}
              {renderIcon(course.categoryIcon)}
              <p className="text-lg">{course.categoryName}</p>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="w-2/3 grid grid-cols-6 gap-10 pb-5 mx-20 my-10 border-b-2 border-b-gray-200">
          <button className="px-7 py-4 bg-myBg rounded-xl border border-blue-200">
            Description
          </button>
          <button className="px-7 py-4  rounded-xl border border-blue-200">
            Instructors
          </button>
          <button className="px-7 py-4  rounded-xl border border-blue-200">
            Content
          </button>
          <button className="px-7 py-4  rounded-xl border border-blue-200">
            Review
          </button>
        </div>

        {/* descriptions and certifications */}
        <div className="w-2/3 flex flex-col gap-7 mx-20 my-1  pr-10 border-b-2 border-b-gray-200">
          {/*  descriptions */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Course Description</h1>
            <p
              className="text-xl text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(course.description),
              }}
            ></p>
          </div>
          {/* certifications */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Certification</h1>
            <p
              className="text-xl text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(course.cirtification),
              }}
            ></p>
          </div>
          <div></div>
        </div>

        {/* instructor */}
        <div className="w-2/3 flex flex-col gap-7 mx-20 my-1 py-6 pr-10 border-b-2 border-b-gray-200">
          {/* instructor heading */}
          <h1 className="text-2xl font-bold">Instructor</h1>
          {/* instructor name and job title */}
          <div>
            <h1 className="text-2xl font-semibold text-blue-600">
              {course.instructor.fullName}
            </h1>
            <h3>{course.instructor.jobTitle}</h3>
          </div>

          {/* instructor image adn some detales */}
          <div className="flex flex-row gap-4 items-center">
            <div>
              <img
                className="rounded-full w-30 h-30 object-cover border-2 border-pink-600"
                src={
                  course.instructor.profilePictureURL ||
                  "https://img.freepik.com/free-photo/front-view-smiley-handsome-man-with-crossed-arms_23-2148946218.jpg?t=st=1759241722~exp=1759245322~hmac=83bd11e284420c6478fe357d0e682897b1fa8bf5a9e69657648c8f2b23b5834f&w=1480"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex flex-row items-center gap-2">
                <SlGraduation className="text-2xl " />
                <p className="text-lg font-semibold">40,445 Reviews</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <IoPlayOutline className="text-2xl " />
                <p className="text-lg font-semibold">
                  {course.instructor.totalStudents} Students
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <BsAward className="text-2xl " />
                <p className="text-lg font-semibold">
                  {course.instructor.totalCourses} Coruses
                </p>
              </div>
            </div>
          </div>

          {/* insttructor breif */}

          <div className="text-xl text-gray-700 pr-10">
            {course.instructor.bio}
          </div>
        </div>

        {/* content */}
        <div className="w-2/3 flex flex-col gap-7 mx-20 my-1 py-6 pr-10 border-b-2 border-b-gray-200">
          {/* heading */}
          <h1 className="text-2xl font-bold">Countent</h1>
          {/* content details */}
          <div className="flex flex-col border-2 border-b-0 border-gray-200 rounded-xl ">
            {course.contents.map((content, index) => (
              <div
                key={index}
                className="flex flex-row justify-between px-10 py-5  border-b-2 border-b-gray-200  rounded-xl"
              >
                {/* content name */}
                <div className="text-2xl font-semibold">{content.name}</div>
                {/* content lec and hours */}
                <div className="flex flex-row gap-5">
                  <div>{content.lectureNumber} Lecture</div>
                  <div>{content.durationInMinutes} Hour</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* reviews */}
        <div className=" flex flex-col gap-7 mx-20 my-1 py-6 pr-10 ">
          {/* heading */}
          <h1 className="text-2xl font-bold">Learner Review</h1>
          <div className="flex flex-row gap-20 justify-between">
            {/* review */}
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-row items-center gap-3 ">
                <div className="text-3xl font-bold">
                  <span className={"text-yellow-400"}>★</span> 4.5
                </div>
                <div className="text-xl font-semibold text-gray-600">
                  146,951 Reviews
                </div>
              </div>
              <div>
                <div className="text-2xl ">
                  {renderStars(5)} <span className="text-xl">80%</span>
                </div>
                <div className="text-2xl ">
                  {renderStars(4)} <span className="text-xl">10%</span>
                </div>
                <div className="text-2xl ">
                  {renderStars(3)} <span className="text-xl">5%</span>
                </div>
                <div className="text-2xl ">
                  {renderStars(2)} <span className="text-xl">3%</span>
                </div>
                <div className="text-2xl ">
                  {renderStars(1)} <span className="text-xl">1%</span>
                </div>
              </div>
            </div>
            {/* user reviews  */}
            <div className="flex flex-3 flex-col gap-5 ">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="flex  flex-row items-start  border-2 border-gray-300 rounded-2xl px-10 py-5"
                >
                  {/* user */}
                  <div className="flex flex-1 flex-row items-center gap-3">
                    <img
                      className="rounded-full w-13 h-13 object-cover"
                      src="https://img.freepik.com/free-photo/front-view-smiley-handsome-man-with-crossed-arms_23-2148946218.jpg?t=st=1759241722~exp=1759245322~hmac=83bd11e284420c6478fe357d0e682897b1fa8bf5a9e69657648c8f2b23b5834f&w=1480"
                      alt=""
                    />
                    <h3 className="font-bold"> yasser ahmed</h3>
                  </div>
                  {/* review */}
                  <div className="flex flex-2 flex-col gap-4">
                    <div className="flex flex-row gap-20">
                      {/* review rate */}
                      <div className="font-bold text-lg">
                        <span className={"text-yellow-400"}>★</span> 5
                      </div>
                      {/* review date */}
                      <div className="text-lg">
                        Reviewed on 22nd March, 2024
                      </div>
                    </div>
                    <div className="text-xl text-gray-700">
                      I was initially apprehensive, having no prior design
                      experience. But the instructor, John Doe, did an amazing
                      job of breaking down complex concepts into easily
                      digestible modules. The video lectures were engaging, and
                      the real-world examples really helped solidify my
                      understanding.
                    </div>
                  </div>
                </div>
              ))}

              <button className="px-7 py-4  rounded-xl border-2 text-xl font-semibold w-1/5">
                View More Reviews
              </button>
            </div>
          </div>
        </div>

        {/* more course like this */}
        <div className=" flex flex-col gap-7 mx-20 my-1 py-6 pr-10 ">
          {/* heading */}
          <h1 className="text-2xl font-bold">More Course Like This</h1>
          <div className="grid  sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 py-10 ">
            {topCourses.map((course, index) => {
              return (
                <CourseCard
                  key={index}
                  course={course}
                  renderStars={renderStars}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* course Card  */}
      <div className="absolute top-20 right-1 bg-white w-100 flex flex-col gap-3 mx-20 my-10  p-5 border-2 border-gray-200 rounded-2xl shadow-lg">
        <img
          className=" rounded-2xl w-full h-48 object-cover"
          src={course.coverURL}
          alt=""
        />
        <h1 className="text-2xl font-bold py-2">$ {course.cost}</h1>
        <button
          className={
            isInCart
              ? "text-lg font-semibold bg-white text-gray-400 border-2 rounded-xl py-3"
              : loading2
              ? "flex justify-center text-lg font-semibold bg-black/20 text-white   rounded-xl py-3"
              : "text-lg font-semibold bg-black text-white  rounded-xl py-3"
          }
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added" : loading2 ? <LoadingSpinner/> : "Add to Cart"}
        </button>
        <button
          className="text-lg font-semibold border-2 rounded-xl py-3"
          disabled
        >
          Buy Now
        </button>
        <div className="border-t-2 border-t-gray-300 py-3 my-3">
          <h1>Share</h1>
          <div className="flex gap-4">
            {shareOptions.map((option, idx) => (
              <a
                key={idx}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
                title={option.name}
              >
                <img src={option.img} alt={option.name} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsPage;

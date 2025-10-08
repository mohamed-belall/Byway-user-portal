import CounterSection from "../components/LandingPage/CounterSection";
import HeroSection from "../components/LandingPage/HeroSection";
import JoinUsSection from "../components/LandingPage/JoinUsSection";
import ReviewSection from "../components/LandingPage/ReviewSection";
import TopCategorySection from "../components/LandingPage/TopCategorySection";
import TopCourseSection from "../components/LandingPage/TopCourseSection";
import TopInstructor from "../components/LandingPage/TopInstructor";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <CounterSection />
      <TopCategorySection />
      <TopCourseSection />
      <TopInstructor />
      <ReviewSection />
      <JoinUsSection />
    </div>
  );
};

export default LandingPage;

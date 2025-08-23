import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

   const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.find((course) => course.tag === value); // ✅ CHANGE (used find instead of filter)
    if (result) {
      setCourses(result.courses);
      setCurrentCard(result.courses[0].heading);
    }
  };

  return (
    <div >
      <div >
        <div className="my-10 text-center text-4xl font-semibold">
          Unlock the <HighlightText text={" Power of Code"} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
        <div className="hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-5 ">
          {tabsName.map((tab, index) => (
            <div
              key={index}
                 onClick={() => setMyCards(tab)}
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === tab
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className=" lg:block lg:h-[200px]">
          <div className="gap-10 justify-center lg:gap-0 flex lg:justify-between  w-full lg:bottom-[0] lg:left-[50%] mt-10 text-black lg:mb-0 mb-7 lg:px-0 px-3">
              {courses.map((tab, index) => (
          <CourseCard
            key={index}
            cardData={tab}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
          </div>
          </div>
        </div>
      </div>
   
  );
};

export default ExploreMore;

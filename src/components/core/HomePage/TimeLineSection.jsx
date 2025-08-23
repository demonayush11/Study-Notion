import React from "react"

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
]
const TimeLineSection = () => {
  return (
    <div>
      <div className="mb-20 flex flex-col items-center gap-20 lg:flex-row">
        <div className="flex flex-col gap-14 lg:w-[45%] lg:gap-3">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-col lg:gap-3 " key={index}>
                <div className="flex gap-6" key={index}>
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_0_62px_0] shadow-[#00000012] ">
                    <img src={element.Logo} alt=""/>
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">
                      {element.heading}
                    </h2>
                    <p className="text-base">{element.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    timeline.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 w-[26px] border-r border-dotted border-richblack-100 bg-richblack-400/0`}
                ></div>
              </div>
            )
          })}
        </div>
        <div className="relative mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
            <img className="shadow-[20px_20px_rgba(255,255,255)]" src={timelineImage} alt="timeLineImage" />
            <div className="absolute lg:left-[51%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                    <p className="text-3xl font-bold w-[75px]"> 10</p>
                    <p className="text-caribbeangreen-300 text-sm w-[75px]"> Years  Experience</p>
                </div>
                <div className="flex gap-5 items-center lg:px-14 px-7">
                        <p className="text-3xl font-bold w-[75px]"> 250</p>
                    <p className="text-caribbeangreen-300 text-sm w-[75px]">Types of Courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection

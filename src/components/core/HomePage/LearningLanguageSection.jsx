import React from "react"

import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Know_Your_Progress from "../../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import HighlightText from "./HighlightText"
import Button from "./Button"

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="my-10 text-center text-4xl font-semibold">
        Your swiss knife for <HighlightText text={"learning any language"} />
        <div className="mx-auto mt-3 text-center text-base font-medium leading-6 text-richblack-700 lg:w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img
            src={Know_Your_Progress}
            alt="knowurprogress"
            className="object-contain  lg:-mr-32 "
          />
          <img
            src={compare_with_others}
            alt="comparewithothers"
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            src={plan_your_lesson}
            alt="plan ur lesson"
            className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />
        </div>
      </div>
      <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
        <Button active={true} linkto={"./signup"}>
        <div>Learn More</div></Button>
      </div>
    </div>
  )
}

export default LearningLanguageSection

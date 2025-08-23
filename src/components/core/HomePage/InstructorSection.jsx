import React from "react"
import { FaArrowRight } from "react-icons/fa6"

import Instructor from "../../../assets/Images/Instructor.png"
import Button from "./Button"
import HighlightText from "./HighlightText"

const InstructorSection = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col items-center gap-20 lg:flex-row">
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt="instructor"
            className="shadow-[-20px_-20px_0_0] shadow-white"
          />
        </div>
        <div className="flex w-[50%] flex-col gap-10">
          <div className="w-[50%] text-4xl font-semibold">
            Become an
            <HighlightText text={"instructor"} />
          </div>
          <p className="w-[90%] text-justify text-[16px] font-medium text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
         
            <Button active={true} linkto={"./signup"}>
            <div className="flex flex-row gap-2 items-center">
              Start Teaching Today
              <FaArrowRight />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection

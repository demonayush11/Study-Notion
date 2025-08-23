import React from "react"
import { FaArrowRight } from "react-icons/fa6"
import { Link } from "react-router-dom"

import Banner from "../assets/Images/banner.mp4"
import Button from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import HighlightText from "../components/core/HomePage/HighlightText"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from "../components/Common/Footer"
import ExploreMore from "../components/core/HomePage/ExploreMore"


const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div
        className="p-1relative mx-auto mt-16 flex w-11/12 max-w-maxContent flex-col items-center 
      justify-between text-white"
      >
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>

              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="mt-7 text-center text-4xl font-semibold">
          <p>
            Empower Your Future
            <HighlightText text={"Coding Skills"} />
          </p>
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedb ack from
          instructors
        </div>
        <div className="mt-8 flex flex-row gap-7">
          <Button active={true} linkto={"/signup"}>
            Learn More{" "}
          </Button>

          <Button active={false} linkto={"/login"}>
            Book a Demo
          </Button>
        </div>
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        <div>
          {/* code section 1 */}
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"coding potential"} /> with our
                online courses
              </div>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codecolor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        <div>
          {/* code section 1 */}
          <div>
            <CodeBlocks
              position="lg:flex-row-reverse"
              heading={
                <div className="text-4xl font-semibold">
                  Start <HighlightText text={"coding in seconds"} />
                </div>
              }
              subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              ctabtn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
              codecolor={"text-white"}
              backgroundGradient={<div className="codeblock2 absolute"></div>}
            />
          </div>
        </div>
        <ExploreMore/>
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-5">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <Button active={true} linkto={"/signup"}>
                <div className="flex flex-row items-center gap-3">
                  Explore full catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/signup"}>
                <div className="flex flex-row items-center gap-3">
                  Learn More
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto  flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-7">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="lg:w-[45%] text-4xl font-semibold">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>
           <TimeLineSection />

        <LearningLanguageSection />
        </div>
       
      </div>
      {/* section 3 */}
        <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white ">
        <InstructorSection/>
        
        <h2 className="text-center font-semibold text-4xl mt-10">Reviews from other learners</h2>
         
        </div>
      {/* footer */}
      <Footer/>
    </div>
  )
}

export default Home

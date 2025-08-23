import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import Footer from "../components/Common/Footer"
function Signup() {
  return (
   <>
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
    <div>
        <Footer />
    </div>
   </>
  )
}

export default Signup

const {instance}=require("../config/razorpay");
const Course =require("../models/Course");
const User =require("../models/User");
const mailSender =require("../utils/mailSender");
const {courseEnrollmentEmail} =require("../mail/templates/courseEnrollmentEmail");
// const  mongoose  = require("mongoose");
const mongoose =require("mongoose");

//capture thepayment and initiate the razorpay option
exports.capturepayment =async (req,res) =>{
  try{
        //get courseId andUserId
    const {course_id} =req.body;
    const userId=req.user.id;
    //validation
    //validcourseId
    if(!course_id){
        return res.json({
            success:false,
            message:"Please provide valid course id",
        });
    }
    //valid courseDetails
    let course;
    try{
        course =await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:"could not find course details"
            });
        }
        //user already pay for the same course
        // const uid =new mongoose.Types.ObjectId(userId);
        const uid =new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:'student is already enrolled'
            });
        }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'error',
            error:message.error,
        })
    }

    //order create
    const amount=course.price;
    const currency="INR";

    const options ={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };
    try{
         const paymentResponse =await instance.orders.create(options);
         console.log(paymentResponse);
    }
    catch(error){
       console.log(error);
       res.json({
         success:false,
         message:"could not initiate the order"
       })
    } 
  }
  catch(error){

  }
}
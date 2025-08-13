const {instance}=require("../config/razorpay");
const Course =require("../models/Course");
const User =require("../models/User");
const mailSender =require("../utils/mailSender");
const {courseEnrollmentEmail} =require("../mail/templates/courseEnrollmentEmail");
// const  mongoose  = require("mongoose");
const mongoose =require("mongoose");

//capture thepayment and initiate the razorpay option
exports.capturePayment =async (req,res) =>{

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
         //return response
         return res.status.json({
            succes:true,
            courseName:course.courseNmae,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
         });
    }
    catch(error){
       console.log(error);
       res.json({
         success:false,
         message:"could not initiate the order"
       })
    } 
}

    //verify signature of razorpay and server
exports.verifySignature =async(req,res) =>{
         const webhookSecret ="12345678";

         const signature =req.headers["x-razorpay-signature"];

         const shasum =crypto.createHmac("sha256",webhookSecret);
         shasum.update(JSON.stringify(req.body));
         const digest =shasum.digest("hex");

         if(signature===digest){
            console.log("payment is authorised");

            const {courseId,userId} =req.body.payload.payment.entity.notes;
            
            try{
                 //fulfil the action

                 //find the course and enroll the udent in it
                 const enrollcourse = await Course.findOneAndUpdate(
                    {_id:courseId},
                    {$push:{studentsEnrolled: userId}},
                    {new:true},
                 );

                 if(!enrollcourse){
                    return res.status(500).json({
                        success:false,
                        message:"course not found",
                    });
                 }
                 console.log(enrollcourse);

                 //find the student and add the course to their list enroled courss me
                 const enrolledStudent =await User.findOneAndupdate(
                    {_id:userId},
                    {$push:{course:courseId}},
                    {new:true},
                 );
                 console.log(enrolledStudent);

                 //mail send  for confirmation
                 const emailResponse =await mailSender(
                    enrolledStudent.email,
                    "congratulation from StudyNotion",
                    "Congratulatuon,you are onboarded into new study notion course",                 
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and Course added",
                });
            }
            catch(error){
               return res.status(500).json({
                status:false,
                message:  error.message,
               })
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"invalid request",
            })
        }
    };
  

const RatingAndReview =require("../models/RatingAndReview");
const Course =require("../models/Course");
const mongoose=require("mongoose");

//createRating
exports.createRating =async(req,res) =>{
    try{
        //get user id
        const userId =req.user.id;
        //fetchdata from req body
        const {rating,review,courseId} =req.body;
        const courseDetails =await Course.findOne(
                                      {_id:courseId,
                                        studentsEnrolled:{$elemMatch:{$eq:userId}},
                                      });
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            });
        }
        //check  if user is already reviewed the course
        const alreadyReviewed= await RatingAndReview.findOne({
                                            user:userId,
                                            course:courseId,
                                                });
                     if(alreadyReviewed){
                        return res.status(403).json({
                            success:false,
                            message:'course is already reviewded by the user',
                        });
                     };
                     //create rating and review
                     const ratingReview =await RatingAndReview.create({
                        rating,review,
                        course:courseId,
                        user:userId,
                     }); 
                     //update course with  this rating/review
                    const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
                        {
                            $push:{
                                ratingAndReviews:ratingReview._id,
                            }
                        },
                        {new:true});
                        console.group(updatedCourseDetails);
                        //return response
                        return res.status(200).json({
                            success:true,
                            message:"Rating And review created successfully",
                            ratingReview,
                        })

    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }
}
//getAveragerating
exports.getAverageRating =async (req,res) =>{
    try{
          //get courseId
          const courseId =req.body.courseId;
//calculate avg rating 
const result =await RatingAndReview.aggregate([
    {
        $match:{
            course:new mongoose.Types.ObjectId(courseId),
        }
    },
    {
        $group:{
            _id:nulll,
            averagerating:{$avg:"$rating"},
        }
    }

    ])
    //return rating
    if(result.length>0){
       return res.status(200).json({
        sucess:true,
        averageRating:result[0].averageRating,
       })
    }
    //if no rating exists
    return res(200).json({
        success:true,
        message:'Average rating 0,no rating given till now',
        averageRating:0,
    })    
     }
    catch(error){
        console.log(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }

}
//getAllRatingAndreviews

exports.getAllRating =async (req,res) =>{
    try{
          const allreviews =await RatingAndReview.find({})
                                  .sort({rating:"desc"})
                                  .populate({
                                    path:"user",
                                    select:"firstName lastname email image",
                                  })
                                  .populate({
                                    path:"course",
                                    select:"courseName",
                                  })
                                  .exec();

            return res.status(200).josn({
                success:true,
                message:"All reviews fetched successfully",
                data:allreviews, 
            });
    }
    catch(error){
            console.log(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }
}

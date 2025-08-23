const Course =require("../models/Course");
const Category=require("../models/Category");
const User =require("../models/User");
const {uploadImageToCloudinary} =require("../utils/imageUploader");
 
//createCourse handler function
exports.createCourse =async (req,res) =>{
    try{

        //fetch dataconst 
        const {courseName,courseDescription,whatYouwillLearn,price,category} =req.body;

        //get thumbnail
        const thumbnail =req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouwillLearn  || !price  || !category  || !thumbnail){
          return res.status(400).json({
            success:false,
            message:'All fields are required',
          });
        }
        //check for instructor
        const userId =req.user.id;
        const instructorDetails =await User.findById(userId);
        console.log("Instructor details: ",instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found'
            });
        }
        //check for tag
        const categoryDetails =await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'category Details not found'
            });
        }
        //upload image to thumbnail
        const  thumbnailImage =await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for the new course
        const newCourse =await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouwillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url, 
        });

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );
        //update the tag schema
        //TODO:homework


        //return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
};


//getAllcourses handler function
exports.showAllCourse=async (req,res)=>{
    try{

        const allCourse= await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnroled:true,
        }).populate("instructor").exec(); 

        //response
        return res.status(200).json({
            success:true,
            message:"data fetched successfuly",
            data:allCourse,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        });
    }
};
// get course details

exports.getCourseDetails = async (req,res)=>{
    try{
        //get ifd
        const {courseId} =req.body;
        //find course details
        const courseDetails =await Course.find(
            {_id:courseId})
                 .populate(
             {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
             }
        )
        .populate("category")
        // .populate("ratingAndreviews")  
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        .exec();
        
        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId}`,

           });
        };
        //return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails,
        });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        messsage:error.message,
      })
    }
}
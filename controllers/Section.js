const Section=require("../models/Section");
const Course=require("../models/Course");

exports.createSection =async (req,res) =>{
    try{
        //data fetch
        const {sectionName, courseId} =req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                status:false,
                message:'missing properties',
            });
        }
        //create section
         const newSection =await Section.create({sectionName});
         //update course with section ObjectId
         const updatedCourseDetails =await Course.findByIdAndUpdate(
         
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        );
        //HW:use populate to replace sections/sub-sections both in the updatedcoursedetails\
        //return response
        return res.status(200).json({
            success:true,
            message:'section created successfully',
            updatedCourseDetails,
        })
         
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to create section",
            error:error.message,
            
        })
    }
};

exports.updateSection =async (req,res) =>{
    try{
         
        //dat input
        const {sectionName,sectionId}=req.body;
        //data validation
          if(!sectionName || !sectionId){
            return res.status(400).json({
                status:false,
                message:'missing properties',
            });
        }
        //update data
        const section =await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true}); 

        //return response
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to update section",
            error:error.message,
            
        })
    }
};

exports.deleteSection =async (req,res) =>{
    try{
       //get Id-asuming that we are sending Id in params
       const {sectionId} =req.params;
       //TODO:do we need to delete the entry from course schema?
       //use findByIdAndDelete
       await Section.findByIdAndDelete(sectionId);
       //return response
       return res.status(200).json({
        success:true,
        message:'section deleted successfully',
       })
    }
    catch(error){
             return res.status(500).json({
            success:false,
            message:"unable to delete section",
            error:error.message,
            
        })
    }
}
const Profile=require("../models/Profile");
const User =require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.updateProfile =async(req,res) =>{
    try{
        //getdata
        const {dateOfBiirth="",about="",contactNumber,gender} =req.body;
        //get userID
        const id=req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:true,
                message:"please enter all fields",
            });
        } 
        // find profile
        const userdetails =await User.findById(id);
        const profileId =userdetails.additionalDetails;
        const profileDetails =await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth=dateOfBiirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;
        await profileDetails.save();
        //return response
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails,
        })
    }
    catch(error){
      return res.status(500).json({
        success:true,
        message:"something got wrong",
        error:error.message,
      })
    }
};

//delete account
exports.deleteAccount=async (req,res) =>{
    try{
     //get id
     const id=req.user.id;
     //validation
     const userDetails =await User.findById(id);
     if(!userDetails){
        return res.status(404).json({
            success:false,
            message:'user not found',
        })
     }
     //delete prpofile
     await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
     //delete user
     await User.findByIdAndDelete({_id:id});
     //return response
     return res.status(200).json({
        success:true,
        message:"user deleted successfully",

     })
    }
    catch{
       return res.status(500).json({
        success:false,
        message:"user cannot be deleted",
       })
    }
};

exports.getAllUserDetails =async (req,res) =>{

    try{
        //get id
        const id=req.user.id;

        //validation and user details
        const userDetails =await User.findById(id).populate("additionalDetails").exec();
        //retur response
        return res.status(200).json({
            success:true,
            message:'User Data fetched successfully',
            userDetails,
        });
    }
    catch(error){
        return res(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    // console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


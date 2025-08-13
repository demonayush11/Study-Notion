const Category =require("../models/Category");

// replace all tags with category

//create tag ka handeller function

exports.createCategory =async (req,res) =>{
    try{

        //fetch data
        const{name,description} =req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //create entry in db
        const CategoryDetails =await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:"tag created successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:lfalse,
            message:error.message,
        })
    }
};

//getAll tags handler function
exports.showAllCategories =async (req,res) =>{
    try{
           const allCategory =await Category.find({},  {name:true,description:true});
           res.status(200).json({
            success:true,
            message:"all categories returned successfully",
            allCategory, 
           })
    }
    catch(error){
         return res.status(500).json({
            success:lfalse,
            message:error.message,
        })
    }
}
//categorypagedetails
exports.categoryPageDetails =async (req,res) =>{
    try{
       //get categoryId
       const {categoryId}=req.body; 
       //get courses for specified categoryId
       const selectcategory =await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
       //validation
       if(!selectcategory){
        return res.status(404).json({
            success:false,
            message:'Data Not Found',
        });
       }
       //get courses for different categories
       const differentCategories =await Category.find({
                                                 _id:{$ne:categoryId},                                          
                                                  })
                                                  .populate("courses")
                                                  .exec();

        //get top selling course
        const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectcategory,
                differentCategories,
                mostSellingCourses,
            }
        })
    }
    catch(error){
        return res.status(500).json({
            success:lfalse,
            message:error.message,
        })
    }
}
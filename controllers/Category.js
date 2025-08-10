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
exports.showAllCategory =async (req,res) =>{
    try{
           const allCategory =await Category.find({},  {name:true,description:true});
           res.status(200).json({
            success:true,
            message:"all tags returned successfully",
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
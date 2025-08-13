const mongoose=require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        // newUrlParser:true,
        // newUnifiedTopology:true
    })
    .then(()=>{console.log("db connection success")})
    .catch((err)=>{
        console.log("db connection issue");
        console.log(err);
        process.exit(1); 
    })
}
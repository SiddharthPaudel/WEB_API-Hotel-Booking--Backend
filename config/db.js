const mongoose=require("mongoose");


const connectDB=async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Quick_Stay");
        console.log("mongodb connected")
    }
    catch(e){
        console.log("mongodb not connected")
    }
}

module.exports=connectDB;
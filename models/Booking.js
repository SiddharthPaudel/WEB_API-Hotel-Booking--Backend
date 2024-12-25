const mongoose=require("mongoose");


const bookSchema=new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customers"
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotels"
    },
    checkInDate:{
        type:String,
        required:true
    },
    checkOutDate:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
    
});

const Book=mongoose.model("books",bookSchema);
module.exports=Book;
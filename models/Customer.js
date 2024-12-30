const mongoose=require("mongoose");


const customerSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,
        required:true
    }
})

const Customer=mongoose.model("customers",customerSchema);
module.exports=Customer;
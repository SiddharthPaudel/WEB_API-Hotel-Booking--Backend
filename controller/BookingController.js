
const Booking=require("../models/Booking")
const findAll=async(req,res)=>{

    try{
    const book= await Booking.find(); 
    res.status(200).json(book);
    }
    catch(e){
        res.json(e);
    }
};

const saveAll=async(req,res)=>{
    try{
    const books=new Booking(req.body);
    await books.save();
    res.status(201).json(books)
    }
    catch(e){
        res.json(e);// status code is required for  better code 
    }
};




module.exports={
    findAll,
    saveAll,
   
}
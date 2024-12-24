
const Customer=require("../models/Customer")
const findAll=async(req,res)=>{

    try{
    const customers= await Customer.find(); 
    res.status(200).json(customers);
    }
    catch(e){
        res.json(e);
    }
};

const saveAll=async(req,res)=>{
    try{
    const customers=new Customer(req.body);
    await customers.save();
    res.status(201).json(customers)
    }
    catch(e){
        res.json(e);// status code is required for  better code 
    }
};

const findById=async(req,res)=>{
    try{
        const{id}=req.params;
        const customers=await Customer.findById(id);
        res.status(200).json(customers);

    }catch(e){
        res.json(e);
    }
};

const deleteById=async(req,res)=>{
    try{
        const {id}=req.params;
        const customers=await Customer.findByIdAndDelete(id);
        res.status(200).json("deleted sucessfully");

    }catch(e){
        res.json(e);
    }
};

const update=async(req,res)=>{
    try{
        const customers=await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(201).json(customers);

    }catch(e){
        res.json(e);
    }
};


const info =()=>{
}

module.exports={
    findAll,
    saveAll,
    findById,
    deleteById,
    update
}
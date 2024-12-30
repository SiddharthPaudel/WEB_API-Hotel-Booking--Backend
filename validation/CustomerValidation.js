const joi=require("joi");


const customerSchema=joi.object({
    username:joi.string().required(),
    email:joi.string().required().email(),
    contact_no:joi.string().required()
})


function CustomerValidation(req,res,next){
    const {username,email,contact_no}=req.body;
    const {error}=customerSchema.validate({username,email,contact_no})
    if(error){
     return res.json(error)
    }
    next()
}


module.exports=CustomerValidation;
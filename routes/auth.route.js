const express = require('express');
const Users = require('../models/user')
const routes = express.Router();
const httpErrors= require('http-errors');
const bcrypt = require ('bcrypt')
const jwt=require('jsonwebtoken')


routes.post('/register',async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(!email||!password)throw httpErrors.BadRequest();

        const Exists =await Users.findOne({email:email})

    if(Exists)throw httpErrors.Conflict(`${email}is already been used`);
    
    const hash=  await bcrypt.hash(password,10);
    const user = new Users({email:email,password:hash})
    const saveUser=await user.save()
    res.send(saveUser)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
   
});
routes.get('/login',async(req,res,next)=>{
    // req.send({type:"login is successful"})
   try{
    const result = await Users.find();
    res.send(result);
   }
   catch(error){
    console.log(error.message)
    next(error)
   }
});
routes.delete('/userDelete',(req,res,next)=>{
    res.send({type:"user has been deleted"})
});
routes.delete('/logout',(req,res,next)=>{
    res.send({type:"logout route"})
});
routes.post('/login',async(req,res)=>{

    try{
        //check if email is valid

        //find user by email
        const {email,password}= req.body
        const user = await Users.findOne({email});
        if(!user){
            throw httpErrors.Conflict(`${email} does not exist in our database, please consider signing up`)
        }
        //compare passwords
        const isPasswordisvalid= await bcrypt.compare(password,user.password)
        //if passwords dont match

        if(!isPasswordisvalid){
            return res.status(401).json({message:'invalid password'})
        }
        //generate jwt token
        const token = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.send({
            status:"200",
            type:"Bearer",
            token:token
        })
    }
    catch (err){
        console.error(err)
        res.status(500).json({message:'server error'});
    }
});

routes.post('/refresh-toke',async(req,res)=>{
    res.send('refresh-token route')
})
module
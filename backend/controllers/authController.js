const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const pool=require('../config/db')



const signup=async(req,res)=>{
    const {email , password}= req.body;
    try{
    const hashedPassword= await bcrypt.hash(password,10);
    const result=await pool.query('Insert into users(email,password) values($1,$2)Returning *',[email,hashedPassword]);
    res.json({user:result.rows[0]});
    }catch(err){
        res.status(500).json({message: err.message});
    }

}; 

const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
    const result=await pool.query('Select * from users where email=$1',[email]);
    const user=result.rows[0];
    if(!user){
        return res.status(400).json({message:"User Not found"});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Incorrect Password"});
    }

    const token=jwt.sign(
        {id:user.id,email:user.email},
        "secretkey",
        {expiresIn:"1h"}

    );
    res.json({token});
}catch(err){
    res.status(500).json({message:err.message});
}

}
module.exports={signup,login};
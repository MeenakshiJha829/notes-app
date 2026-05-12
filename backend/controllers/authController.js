const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const pool=require('../config/db')



const signup=async(req,res)=>{
    const {email , password}= req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email or password missing" });
    }
    try{
    const hashedPassword= await bcrypt.hash(password,10);
    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    if (existingUser.rows.length > 0) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    const result=await pool.query('Insert into users(email,password) values($1,$2) Returning *',[email,hashedPassword]);
    res.json({user:result.rows[0]});
    }catch (err) {
        console.log("BACKEND ERROR:", err.message);
        res.status(500).json({
            message: err.message
        });
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
    res.status(500).json({message: err.message || "Internal Server Error",
        error: err});
}

}
module.exports={signup,login};
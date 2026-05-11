const express = require('express');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const authMiddleware=require("./middlewares/authMiddlewares");
const notesRoutes=require('./routes/notesRoutes');

const app=express();


app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);

app.get('/protected',authMiddleware,(req,res)=>{
    res.json({message:"You are authorized",user:req.user});
})



module.exports=app;


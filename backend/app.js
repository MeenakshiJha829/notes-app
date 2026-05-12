const express = require('express');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const authMiddleware=require("./middlewares/authMiddlewares");
const notesRoutes=require('./routes/notesRoutes');
const pool = require("./config/db");

const app=express();


app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);

console.log("DB URL:", process.env.DATABASE_URL);

app.get("/db-check", async (req, res) => {
     try {
        const result = await pool.query("SELECT current_database(), current_user");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/protected',authMiddleware,(req,res)=>{
    res.json({message:"You are authorized",user:req.user});
})



app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});



module.exports=app;


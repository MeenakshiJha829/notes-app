const pool= require('../config/db');

const createNote=async(req ,res)=>{
    const {title,content}=req.body;

    try{
        const result=await pool.query("Insert into notes(user_id,title,content) Values($1,$2,$3) Returning *",[req.user.id,title,content]);
        res.json(result.rows[0]);

    }catch(err){
        res.status(500).json({message:err.message});

    }
};

const getNotes= async(req,res)=>{
    try{
        const result=await pool.query('Select *  from notes where user_id=$1 Order by id Desc',[req.user.id]);

        res.json(result.rows);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

const updateNote=async(req,res)=>{
    const {title,content}=req.body;
    try{
        const result=await pool.query(`Update notes SET title=$1,content=$2 where id=$3 and user_id=$4 Returning *`,[title,content,req.params.id,req.user.id]);
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

const deleteNote=async(req,res)=>{
    try{
        await pool.query('Delete from notes where id=$1 and user_id=$2',[req.params.id,req.user.id]);
        res.json({message:"Note deleted"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports = {createNote,updateNote,deleteNote,getNotes};
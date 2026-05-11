const express=require('express');
const router=express.Router();

const authMiddleware = require('../middlewares/authMiddlewares');
const {createNote, updateNote, deleteNote, getNotes}=require('../controllers/notesController');

router.get('/',authMiddleware,getNotes);
router.post('/',authMiddleware,createNote);
router.put("/:id",authMiddleware,updateNote);
router.delete("/:id",authMiddleware,deleteNote)
module.exports=router;
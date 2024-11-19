import express from 'express'
import { createSlot, getSlots } from '../controller/authSlotController.js';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controller/authBlogController.js';


const router = express.Router();

router.post('/create-slot', createSlot);
router.get("/slots", getSlots); 
router.post("/blogs", createBlog); 
router.get("/blogs", getAllBlogs); 
router.get("/blogs/:id", getBlogById); 
router.put("/blogs/:id", updateBlog); 
router.delete("/blogs/:id", deleteBlog); 


export default router
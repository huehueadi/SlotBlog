import express from 'express'
import { createSlot, getSlots } from '../controller/authSlotController.js';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getAllUserBlogs } from '../controller/authBlogController.js';
import {  createUser, loginUser } from '../controller/authUserController.js';
import authentication from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create-slot', authentication, createSlot);
router.get("/slots", getSlots); 
router.get("/get-active-blogs", getSlots); 

router.post("/blogs", authentication,createBlog); 
router.get("/get-blogs", getAllBlogs);
router.get("/get-detail-blog/:id", getBlogById);

router.get("/get-user-blogs", authentication, getAllUserBlogs); 

router.get("/blogs/:id", authentication, getBlogById); 
router.put("/blogs/:id", updateBlog); 
router.delete("/blogs/:id", deleteBlog);

router.post("/login", loginUser); 
router.post('/register', createUser);



export default router
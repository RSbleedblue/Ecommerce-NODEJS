import { Router } from 'express';
import blogController from '../Controller/blogController.js';

const blogRoutes = Router();
const BlogController = new blogController;

blogRoutes.post("/create", (req,res) => BlogController.createBlog(req,res));
blogRoutes.get("/getAllBlogs", (req,res) => BlogController.getAll(req,res));

export default blogRoutes;
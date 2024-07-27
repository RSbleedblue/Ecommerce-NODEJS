import { Blog } from "../Models/blogModel.js";
import userModel from "../Models/userModel.js";

class blogController {
    constructor() {}

    async createBlog(req, res) {
        const { title, blog, author } = req.body;
        const newBlog = new Blog({ title, blog, author });
        try {
            const createdBlog = await newBlog.save();
            await userModel.findByIdAndUpdate(
                author,
                { $push: { blogs: newBlog._id } },
                { new: true }
            );
            return res
                .status(200)
                .json({ message: "Blog Created Successfully", blog: createdBlog, success: true });
        } catch (err) {
            return res
                .status(404)
                .json({ message: "Unexpected Error occurred While Creating Blog", success: false });
        }
    }

    async getAll(req, res) {
        try {
            const allBlogs = await Blog.find();
            return res.status(200).json({ message: "All blogs", blog: allBlogs, success: true });
        } catch {
            return res
                .status(404)
                .json({ message: "Unexpected Error occurred while fetching blogs", success: false });
        }
    }

    async likePost(req, res) {
        const { blogID, authorID } = req.body;
        try {
            const blog = await Blog.findById(blogID);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found", success: false });
            }
            if (blog.like.includes(authorID)) {
                return res.status(400).json({ message: "User already liked this post", success: false });
            }
            blog.like.push(authorID);
            await blog.save();
            return res.status(200).json({ message: "Blog liked successfully", blog, success: true });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Unexpected Error occurred while liking the blog", success: false });
        }
    }
}

export default blogController;

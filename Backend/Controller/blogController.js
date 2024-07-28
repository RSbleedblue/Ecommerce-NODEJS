import { Blog } from "../Models/blogModel.js";
import userModel from "../Models/userModel.js";

class BlogController {
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
                .status(500)
                .json({ message: "Unexpected Error occurred While Creating Blog", error: err, success: false });
        }
    }

    async getAll(req, res) {
        try {
            const allBlogs = await Blog.find().populate('author', 'name').populate('comments.user', 'name');
            return res.status(200).json({ message: "All blogs", blogs: allBlogs, success: true });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Unexpected Error occurred while fetching blogs", error: err, success: false });
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
                .json({ message: "Unexpected Error occurred while liking the blog", error: err, success: false });
        }
    }

    async addComment(req, res) {
        const { comment, blogID, authorID } = req.body;
        try {
            const blog = await Blog.findById(blogID);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found", success: false });
            }
            const newComment = {
                user: authorID,
                comment: comment,
            };
            blog.comments.push(newComment);
            await blog.save();
            return res.status(200).json({ message: "Comment added successfully", blog, success: true });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected Error occurred while adding the comment", error: err, success: false });
        }
    }
}

export default BlogController;

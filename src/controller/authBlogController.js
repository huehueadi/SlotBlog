import Blog from "../model/blogModel.js";

export const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  }

  try {
    const { userName } = req.user;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      userName,
      title,
      content,
      author,
    });

    await newBlog.save();
    return res.status(201).json({ 
      message: "Blog created successfully", 
      success: true,
      blog: newBlog 
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUserBlogs = async (req, res) => {
  try {
    const { userName } = req.user;
    const blogs = await Blog.find({ userName });
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Blog = require("../models/blog.models");
const { marked } = require("marked");
const blogControllers = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.render("index", { blogs: blogs });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getBlog: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res
          .status(404)
          .json({ message: `no blog found with the id ${id}` });
      }

      res.render("./partials/_singleBlog", { blog: blog });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  newArticle: (req, res) => {
    res.render("./partials/_createBlog");
  },

  createBlog: async (req, res) => {
    const { title, subTitle, markdown } = req.body;

    const htmlContent = marked(markdown);

    try {
      const blog = await Blog.create({
        title: title,
        subTitle: subTitle,
        markdown: markdown,
        htmlContent: htmlContent,
      });
      res.redirect("/api/v1/blog/all-blogs");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  editArticle: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res
          .status(404)
          .json({ message: `No blog found with the id ${id}` });
      }

      res.render("./partials/_editForm", { blog: blog });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  editBlog: async (req, res) => {
    const { id } = req.params;
    const { newTitle, newSubTitle, newMarkdown } = req.body;

    const htmlContent = marked(newMarkdown);

    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res
          .status(404)
          .json({ message: `no blog found with the id ${id}` });
      }

      const newBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title: newTitle,
          subTitle: newSubTitle,
          markdown: newMarkdown,
          htmlContent: htmlContent,
        },
        {
          new: true,
        }
      );

      res.redirect("/api/v1/blog/all-blogs");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res
          .status(404)
          .json({ message: `no blog found with the id ${id}` });
      }
      await Blog.findByIdAndDelete(id);
      res.redirect("/api/v1/blog/all-blogs");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports = blogControllers;

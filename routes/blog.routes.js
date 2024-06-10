const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blog.controllers");

router.get("/all-blogs", blogControllers.getAllBlogs);
router.get("/id=/:id", blogControllers.getBlog);
router.get("/new-article", blogControllers.newArticle);
router.get("/edit-article/:id", blogControllers.editArticle);
router.post("/create", blogControllers.createBlog);
router.delete("/delete/:id", blogControllers.deleteBlog);
router.put("/edit/:id", blogControllers.editBlog);

module.exports = router;

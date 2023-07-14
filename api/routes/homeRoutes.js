const router = require("express").Router();
const { getAllPosts, getSinglePost } = require("../controllers/homeController");

// Get all posts
router.get("/", getAllPosts);

// get single post
router.get("/post/:id", getSinglePost);

// Feed

module.exports = router;

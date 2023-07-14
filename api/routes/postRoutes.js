const router = require("express").Router();
const {
  createPost,
  uploadFile,
  updatePost,
  deletePost,
} = require("../controllers/postController");


router.post("/upload-file", uploadFile);
router.post("/create-post", createPost);
router.update("/:update-post", updatePost);
router.delete("/:delete-post", deletePost);

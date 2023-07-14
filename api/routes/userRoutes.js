const router = require("express").Router();

const {
  uploadFile,
  getAllUsers,
  getUser,
  updateUser,
  deleteeUser,
} = require("../controllers/userController");

// User routes
router.post("/upload-file", uploadFile);

router.get("/getAll", getAllUsers);
router.get("/:getSingle", getUser);
router.put("/:update", updateUser);
router.delete("/:delete", deleteeUser);

module.exports = router;

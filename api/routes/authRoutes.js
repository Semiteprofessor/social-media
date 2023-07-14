const router = require("express").Router();

const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/logout", logoutUser);

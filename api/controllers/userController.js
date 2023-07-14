const { cloudinary } = require("cloudinary");
const { User } = require("../model");
const bcrypt = require("bcrypt");
const { urlCompiler } = require("../util/helpers");
const { createError } = require("../util/error");
const { validateResult, check } = require("express-validator");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const uploadFile = async (req, res) => {
  try {
    let fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader(fileStr);

    const thisImageURL = urlCompiler(
      uploadResponse.url,
      "w_500, h_500, c_fill"
    );

    const uploadProfile = await User.update(
      {
        image: thisImageURL,
      },
      {
        where: {
          user_id: req.session.user.user_id,
        },
      }
    );
    res.status(200).json({
      statusbar: "success",
      message: "Image uplpaded successfully",
      uploadProfile,
    });
  } catch (error) {
    res.status(500).json({
      statusbar: "error",
      message: "An error occurred while uploading the image",
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving users",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
    });
    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving user",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.update({
      where: {
        user_id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the user",
      error,
    });
  }
};

const deleteeUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        user_id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the user",
      error,
    });
  }
};

export { uploadFile, getAllUsers, getUser, updateUser, deleteeUser };

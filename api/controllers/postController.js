const { cloudinary } = require("cloudinary");
const { Post } = require("../model");
const { urlCompiler } = require("../util/helpers");

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

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user.user_id,
    });
    res.status(200).send({
      status: "success",
      message: "Post created susccesfully",
      newPost,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error creating post",
      error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    await Post.update({
      ...req.body,
      user_id: req.body.user_id,
    });
    res
      .status(200)
      .json({ status: "success", message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.destroy({
      where: { user_id: req.user.user_id },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to delete post",
      error,
    });
  }
};

export { uploadFile, createPost, updatePost, deletePost };

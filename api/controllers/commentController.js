const { Comment } = require("../model");

const createCommet = async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    });
    res.json({
      success: true,
      data: newComment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const updateComment = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updateComment) {
      res.json({ super: true, data: updateComment });
    } else {
      res.json({
        status: "error",
        message: `No comment with ID of ${req.params.id} was found`,
      });
    }
  } catch (error) {
    console.log("Error processing comment", error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleteComment) {
      res.json({ success: true, message: "Comment deleted successfully" });
    } else {
      res.json({
        success: false,
        message: `Comment with ID of ${req.params.id} not found`,
      });
    }
  } catch (error) {
    console.log(`Could not find id of ${req.params.id} in comment`);
    res
      .status(500)
      .json(`Could not find id of ${req.params.id} in comment`, error);
  }
};

export { createCommet, updateComment, deleteComment };

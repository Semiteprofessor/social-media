const { Like } = require("../model");

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.params.user.user_id;
    const result = await Like.findOne({
      where: { user_id: userId, post_id: postId },
    });

    if (!result) {
      await Like.create({ userId: userId, postId: postId });
      res.status(200).json({
        success: true,
        message: "Successfully liked post id " + postId,
      });
    } else {
      await Like.destroy({ where: result.dataValues });
      res.status(200).json({
        success: true,
        message: "Successfully unliked post id " + postId,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while unliked post id " + postId,
    });
  }
};

export { likePost };

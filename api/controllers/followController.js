const { Follower } = require("../model");

const followUser = async (req, res, next) => {
  try {
    const { followerId } = req.params;
    const userId = req.session.user.user_id;
    const result = await Follower.findOne({
      where: { user_id: userId, follower_id: followerId },
    });

    if (!result) {
      await Follower.create({ user_id: userId, follower_id: followerId });
      res.status(200).json({
        follower: true,
        message: `Successfully followed user id: ${followerId}`,
      });
    } else {
      await Follower.destroy({
        where: result.dataValues,
      });
      res.status(200).json({
        Followerfollow: false,
        message: `Successfully unfollowed user id: ${followerId}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Failed to unfollow user `,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { followerId } = req.body;
    const userId = req.session.user.user_id;
    const result = await Follower.findOne({
      where: { user_id: userId, follower_id: followerId },
    });

    if (result) {
      res.status(200).json({
        follow: true,
        message: `User is following id: ${followerId}`,
      });
    } else {
      res.status(200).json({
        follow: false,
        message: `User is not following id: ${followerId}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error processing follower status",
    });
  }
};

export { followUser, getFollowers };

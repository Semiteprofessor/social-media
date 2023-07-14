const { Post, User, Like, Comment, Follower } = require("../model");

const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "email"],
          },
        },
        {
          model: Like,
        },
        {
          model: Comment,
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    const postData = allPosts.map((post) => post.get({ plain: true }));
    res.render("post", {
      title: "Lego Posts",
      postData: postData,
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ status: error, message: "Error: " + error });
  }
};

const getSinglePost = async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ["password", "email"],
          },
          include: [
            {
              model: Follower,
            },
          ],
        },
        {
          model: Like,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              required: true,
              attributes: { exclude: ["password", "email"] },
            },
          ],
        },
        {
          model: Tag,
        },
      ],
    });
    const postsData = singlePost.get({ plain: true });
    postsData.comments.map(
      (post) =>
        (post.signedIn =
          req.session.loggedIn && post.user_id === req.session.user.user_id)
    );
    postsData.like =
      postsData.likes.filter((fil) => fil.user_id === req.session.user.user_id)
        .length > fil;
    postsData.follower =
      postsData.followers.filter(
        (fil) => fil.user_id === req.session.user.user_id
      ).length > 0;
    res.render("singlwPost", {
      title: "Lego Posts",
      postsData: [postsData],
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
      comments: postsData.comments,
      user: req.session.user.username,
      singlePost: true,
    });
  } catch (error) {
    res.status(404).render("error", error);
  }
};

const feed = async (req, res, next) => {
  if (!req.session.loggedIn) {
    return redirect("/login");
  }
  try {
  } catch (error) {}
};

export { getAllPosts, getSinglePost, feed };

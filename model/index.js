const User = require("../model/User");
const Post = require("../model/Post");
const Like = require("../model/Like");
const Comment = require("../model/Comment");
const Tag = require("../model/Tag");
const TagToPost = require("../model/TagToPost");
const Follower = require("../model/Follower");

// Post:Tag
Post.belongsToMany(Tag, {
  foreignKey: "post_id",
  through: TagToPost,
});

Tag.belongsToMany(Post, {
  foreignKey: "tag_id",
  through: TagToPost,
});

// Posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Likes
Post.hasMany(Like, {
  foreignKey: "post_id",
});

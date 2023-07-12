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

Like.belongsTo(Post, {
  foreignKey: "post_id",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Like, {
  foreignKey: "user_id",
});

// Comment
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Follower.belongsTo(User, {
  foreignKey: "folloer_id",
});

User.hasMany(Follower, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Like, Comment, Tag, TagToPost, Follower };

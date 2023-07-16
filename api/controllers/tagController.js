import { Post, Tag, TagToPost, User } from "../model";

const createTag = async (req, res, next) => {
  try {
    const checkTag = await Tag.findOne({ where: { title: req.body.title } });
    if (checkTag === null) {
      const createTag = await Tag.create({
        title: req.body.title.toLowerCase(),
      });
      const newTag = await Tag.get({ plain: true });

      let newCorrelationModel = await TagToPost.create({
        tag_id: newTag.id,
        post_id: req.body.post_id,
      });

      console.log(`NEW TAG TO NEW POST, TAG ID ${newTag.id}`);
      res.status(200).json(newCorrelationModel);
    } else {
      const existingTagId = checkTag.dataValues.id;
      const checkConnection = await TagToPost.findOne({
        where: { tag_id: existingTagId, post_id: req.body.post_id },
      });
      if (!checkConnection) {
        let createNewCorrelation = await TagToPost.create({
          tag_id: existingTagId,
          post_id: req.body.post_id,
        });
        res.status(200).json(createNewCorrelation);
      } else {
        res.status(200).json({
          status: "success",
          message: "Unable to create new tag with id " + existingTagId,
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const deleteTagAssociation = await TagToPost.destroy({
      where: {
        tag_id: req.params.tag_id,
        post_id: req.params.post_id,
      },
    });

    const findResidualAssociate = await TagToPost.findAll({
      where: { tag_id: req.body.tag_id },
    });

    if (findResidualAssociate.length === 0) {
      const deleteTag = await Tag.destroy({
        where: { id: req.body.tag_id },
      });
    }

    res.status(200).json(deleteTagAssociation);
  } catch (error) {
    console.log(error.message);
  }
};

const pageToRender = "postsByTag";

const getPostByTag = async (req, res, next) => {
  try {
    const getPostByTag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Post, include: [{ model: User }, { model: Tag }] }],
    });

    const tagName = getPostByTag.dataValues.title;

    const postArr = getPostByTag.possts.map((post) => {
      const thisPost = singlePost.dataValues;
      const userName = singlePost.user.dataValues.username;
      const userImage = singlePost.user.dataValues.image;

      const otherTags = singlePost.tags.map((singleTag) => {
        return {
          tagId: singleTag.dataValues.id,
          tagTitle: singleTag.dataValues.title,
        };
      });
      return { thisPost, userName, userImage, otherTags };
    });

    res.render(pageToRender, {
      tagName,
      postArr,
      signedIn: req.session.loggedIn,
      loggedout: !req.session.loggedIn,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const getTagsByPost_pure = async (req, res, next) => {
  try {
    const tarArr = await Post.findByPk(req.params.id, {
      include: Tag,
    });
  } catch (error) {}
};

export { createTag };

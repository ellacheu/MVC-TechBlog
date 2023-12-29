const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      post_id: req.session.post_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedBody = req.body;

    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        post_id: req.session.post_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


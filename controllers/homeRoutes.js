const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const currentUser = await User.findOne({
            where: {
                id: req.session.user_id, // Changed from username to user_id
            },
            attributes: ['id'],
        });

        const postData = await Post.findAll({
            where: {
                user_id: currentUser.id,
            },
            include: {
                model: User,
                attributes: ['username'],
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.logged_in // Changed from loggedIn to logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/post', withAuth, async (req, res) => {
  try {
    const currentUser = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: ['id'],
    });

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: currentUser.id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/delete', withAuth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.body.postID,
      },
    });

    res.status(200).json({message: "Post deleted"});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/createPost', withAuth, async (req, res) => {
  try {
      // Render the createPost page
      res.render('createPost', { logged_in: req.session.logged_in });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;
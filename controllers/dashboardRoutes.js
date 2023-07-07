const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit', {
        post,
        logged_in: true
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
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

router.post('/post', withAuth, async (req, res) => {
  try {
      const newPost = await Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});
router.delete('/post/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }

      res.status(200).json(postData);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});
module.exports = router;
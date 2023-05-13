const router = require('express').Router();
const { User } = require('../../models');
const passport = require('passport');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    req.login(newUser, err => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in' });
      }
      res.redirect('/dashboard'); // Redirect the user to the dashboard 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in', user: req.user });
});

module.exports = router;
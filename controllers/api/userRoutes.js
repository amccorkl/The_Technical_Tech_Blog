const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../util/auth');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the provided username
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});

// create a new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      
      res.status(200).json({ user: userData, message: 'New user created. You are now logged in!' });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  };
});

// Remove the session variables
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
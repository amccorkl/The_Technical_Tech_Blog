const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const withAuth = require('../../util/auth');

//render homepage for all 
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ 
      include: [{ model: User, attributes: ['username']}, { model: Comment }]
    })
    //serialize the data so template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      email: req.session.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// If the user is already logged in, redirect the request to the homepage
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
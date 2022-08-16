const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('..util/auth');

// // This is the 'get' route 
// router.get('/', async (req, res) => {
//   // Here, index.html is rendered
//   res.sendFile(path.join(__dirname, '../views/index.html'));
// });

module.exports = router;
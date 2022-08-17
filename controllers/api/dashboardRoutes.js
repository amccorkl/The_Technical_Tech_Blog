const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

//have all posts load on page withAuth,
router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({
        include: [
          { model: User, attributes: ['email']},
          { model: Comment } 
        ],
        where: { user_id: req.session.user_id }
      });
      
      //serialize the data
      const posts = postData.map((post) => post.get({ plain: true }));
      res.status(200).render('dashboard', {
        posts,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
        email: req.session.email
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `${error}`});
  }
});

//create new post withAuth,
router.post('/', async (req, res) => {
  try {
      Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id
      });
      res.status(200).json({ message: `New post created` });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `${error}`});
  }
});

// update a post by its `id` value withAuth,
router.put('/:id', async (req, res) => {
  try{
      const postData = await Post.update(
          { content: req.body.content },
          { where: { id: req.params.id }}
      );
      if(!postData[0]) {
          res.status(404).json({message: 'No post with this id exists.'});
          return;
        }
          res.status(200).json({ message: `Post updated` });
  }
  catch (error) {
      console.log(error);
      res.status(500).json({ message: `${error}`});
  }
});

//if user logged in, they may delete a post by id withAuth,
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy(
      { where: { id: req.params.id }}
    );
      if(!postData) {
        res.status(404).json({message: 'No post with this id exists.'});
        return;
      }
        res.status(200).json({ message: `Post deleted` });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `${error}` });
      };
});

module.exports = router;
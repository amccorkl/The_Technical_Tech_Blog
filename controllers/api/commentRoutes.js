const router = require('express').Router();
const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

//post a new comment withAuth,
router.post('/',  async (req, res) => {
  try {
      await Comment.create({
          comment: req.body.newComment,
          user_id: req.session.user_id,
          post_id: req.body.postId
      });
      res.status(200).json({ message: `New comment added` });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `${error}` });
  };
});



module.exports = router;

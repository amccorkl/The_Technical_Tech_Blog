const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Users can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Users can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Posts belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//Posts can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

//Comments belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

//Comments belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };
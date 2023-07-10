const { Post } = require('../models');

const postData = [
  {
    title: "Joel Cupele's post",
    content: "My first post",
    user_id: 1,
  },
  {
    title: "Carlo's post",
    content: "My first post",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
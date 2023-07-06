const { Post } = require('../models');

const postData = [
  {
    title: "Billy Bob's post",
    content: "this is billy bob's post",
    user_id: 1,
  },
  {
    title: "Mary Sue's post",
    content: "this is mary sue's post",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
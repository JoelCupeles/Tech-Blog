const { Comment } = require('../models');

const commentData = [
  {
    content: "",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "",
    user_id: 1,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
const { Comment } = require('../models');

const commentData = [
  {
    content: "Hi Billy Bob, this is Mary Sue",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "Hi Mary Sue, this is Billy Bob",
    user_id: 1,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
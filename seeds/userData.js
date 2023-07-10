const { User } = require('../models');

const userData = [
  {
    username: "joel",
    email: "joel@gmail.com",
    password: "joel1234",
  },
  {
    username: "carlos",
    email: "carlos@gmail.com",
    password: "carlos1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
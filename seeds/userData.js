const { User } = require('../models');

const userData = [
  {
    username: "billybob123",
    email: "billybob123@gmail.com",
    password: "password123",
  },
  {
    username: "marysue",
    email: "marysue@gmail.com",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
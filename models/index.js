const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.JAWSDB_URL || 'mysql://root@localhost:3306/tech_blog_db');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Post = require('./Post')(sequelize, Sequelize.DataTypes);
const Comment = require('./comment')(sequelize, Sequelize.DataTypes);

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = { sequelize, User, Post, Comment };
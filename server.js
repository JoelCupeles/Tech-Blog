const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const homeRoutes = require('./src/controllers/homeRoutes');
const userRoutes = require('./src/controllers/userRoutes');
const dashboardRoutes = require('./src/controllers/dashboardRoutes');
const sequelize = require('./src/config/connection');
const helpers = require('./src/utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({ helpers, defaultLayout: 'main'})
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');
app.use(homeRoutes);

app.use(userRoutes);
app.use(dashboardRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
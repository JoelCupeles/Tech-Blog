const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const router = express.Router();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const htmlRoutes = require('./controllers/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  partialsDir: [
    'views/partials/'
  ]
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoutes);

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: true
}));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
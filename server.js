const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  partialsDir: [
    'views/partials/'
  ]
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

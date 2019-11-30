const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const handlebars = require('express-handlebars');

module.exports = (app) => {
  app.engine('handlebars', handlebars({
    defaultLayout: 'main'
  }));

  app.set('view engine', 'handlebars');

  app.use(cookieParser());

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    secret: 'ABcd_1234!',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
  });

  console.log('Express ready!')
}

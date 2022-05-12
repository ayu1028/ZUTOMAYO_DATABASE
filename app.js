require('dotenv').config();
const env = process.env;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./models/index');
const Op = db.Sequelize.Op;

var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var indexRouter = require('./routes/index');
var setlistRouter = require('./routes/setlist');
var liveRouter = require('./routes/live');
var counterRouter = require('./routes/counter');
var songRouter = require('./routes/song');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

/*
app.use(passport.initialize());
app.use(passport.session());
*/

passport.use(new TwitterStrategy(
    {
      consumerKey: env.TWT_KEY,
      consumerSecret: env.TWT_SECRET_KEY,
      callbackURL: env.TWT_CALLBACK
    },
    function(token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  ));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use('/', indexRouter);
app.use('/setlist', setlistRouter);
app.use('/live', liveRouter);
app.use('/counter', counterRouter);
app.use('/song', songRouter);

app.get('/login/twitter', passport.authenticate('twitter'));
app.get('/oauth/callback/twitter',passport.authenticate('twitter', { failureRedirect: '/' }), async (req, res) => {
  console.log(req.user);
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

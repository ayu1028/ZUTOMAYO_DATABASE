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
var mypageRouter = require('./routes/mypage');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin');

const setUser = require('./setUser');

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
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6 * 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());

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


app.use('/', setUser, indexRouter);
app.use('/setlist', setUser, setlistRouter);
app.use('/live', setUser, liveRouter);
app.use('/counter', setUser, counterRouter);
app.use('/song', setUser, songRouter);
app.use('/mypage', setUser, mypageRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);

app.get('/login/twitter', passport.authenticate('twitter'));
app.get('/oauth/callback/twitter',passport.authenticate('twitter', { failureRedirect: '/' }), async (req, res) => {
  const twitterId = req.user.id;
  const userName = req.user.displayName;
  console.log(userName);

  const findUser = await db.user.findAll({
    where: {twitterId: twitterId}
  });
  const userExists = findUser.length;
  if(userExists) {
    req.session.twitterId = twitterId;
    req.session.userName = userName;
    req.session.message =`${userName}でログインしました`;
    res.redirect('/');
  } else {
    await db.sequelize.sync();
    let trn = await db.sequelize.transaction();
    const userForm = {
      twitterId: twitterId,
      searchQuery: '[0]',
    };
    try {
      const createUser = await db.user.create(userForm, {transaction: trn});
      await trn.commit();
      req.session.twitterId = twitterId;
      req.session.userName = userName;
      req.session.message =`${userName}でログインしました`;
      res.redirect('/');
    } catch (err) {
      await trn.rollback();
      res.redirect('/');
    }
  }
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

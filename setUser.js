module.exports = (req, res, next) => {
  const twitterId = req.session.twitterId;
  const userName = req.session.userName;

  if(twitterId) {
    res.locals.userId = twitterId;
    res.locals.userName = userName;
  }
  next();
};
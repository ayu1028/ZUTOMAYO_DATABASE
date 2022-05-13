var express =require('express');
var router = express.Router();
const db = require('../models');
const Op = db.Sequelize.Op;

router.get('/', async (req, res, next) => {
  if(req.session.twitterId) {
    const twitterId = req.session.twitterId;
    const userName = req.session.userName;
    const userInfo = await db.user.findOne({
      where: {twitterId: twitterId}
    });
    const query = JSON.parse(userInfo.searchQuery);
    const songsAll = await db.song.findAll();
    const livesAll = await db.live.findAll();
    const whereForm = Array.isArray(query) ? { liveId: { [Op.or]: query } } : { liveId: query };
    const whereForm2 = Array.isArray(query) ? { id: { [Op.or]: query } } : { id: query };
    const heardSongs = await db.song_live.findAll({
      where: whereForm,
      include: [
        { model: db.song, required: false },
      ],
    });
    const attendedLives = await db.live.findAll({
      where: whereForm2,
      order: [['liveDate', 'DESC']],
      include: [
        { model: db.hako, required: false },
      ],
    });
    res.render('mypage', {
      title: 'MY PAGE',
      heardSongs: heardSongs,
      attendedLives: attendedLives,
      songsAll: songsAll,
      livesAll: livesAll,
      lives: query[0] !== 0 ? query.length : query[0],
      query: query,
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;

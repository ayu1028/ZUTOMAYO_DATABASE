var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

/* GET home page. */
router.get('/', async (req, res, next) => {
  const liveAll = await db.live.findAll({
    order: [['liveDate', 'DESC']],
    include: [
      { model: db.hako, required: false },
    ]
  });
  const data = {
    title: 'ZUTOMAYO COUNTER | ZUTOMAYO DATABASE',
    contents: liveAll,
  };
  res.render('counter', data);
});
router.get('/:checking', async (req, res, next) => {
  const checking_data = req.params.checking;
  const liveAll = await db.live.findAll({
    order: [['liveDate', 'DESC']],
    include: [
      { model: db.hako, required: false },
    ]
  });
  const data = {
    title: 'ZUTOMAYO COUNTER | ZUTOMAYO DATABASE',
    contents: liveAll,
    checkingData: checking_data,
  };
  res.render('counter', data);
});

router.post('/results', async (req, res, next) => {
  if(req.body.liveId) {
    const songsAll = await db.song.findAll();
    const livesAll = await db.live.findAll();
    const whereForm = Array.isArray(req.body.liveId) ? 
    { liveId: { [Op.or]: req.body.liveId } } : { liveId: req.body.liveId };
    const heardSongs = await db.song_live.findAll({
      where: whereForm,
      include: [
        { model: db.song, required: false },
      ],
    });
    const data =  {
      title: 'RESULTS | ZUTOMAYO DATABASE',
      heardSongs: heardSongs,
      songsAll: songsAll,
      livesAll: livesAll,
      lives: Array.isArray(req.body.liveId) ? req.body.liveId.length : 1,
      query: req.body.liveId,
    };
    res.render('results', data);
  } else {
    res.redirect('/counter');
  }
});

router.post('/update', async (req, res, next) => {
  const twitterId = req.session.twitterId;
  const queryString = `[${req.body.query}]`;
  try {
    const updateForm = {
      searchQuery: queryString,
    };
    const whereForm = { where: { twitterId: twitterId } };
    await db.user.update(updateForm, whereForm);
    res.redirect('/mypage');
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;

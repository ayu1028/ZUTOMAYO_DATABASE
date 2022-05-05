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
    contents: liveAll
  };
  res.render('counter', data);
});

router.post('/results', async (req, res, next) => {
  if(req.body.liveId) {
    const songsAll = await db.song.findAll();
    const livesAll = await db.live.findAll();
    const whereForm = req.body.liveId.length === 1 ? 
      { liveId: req.body.liveId } : { liveId: { [Op.or]: req.body.liveId } };
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
      lives: req.body.liveId.length,
    };
    res.render('results', data);
  } else {
    res.redirect('/counter');
  }
});

module.exports = router;

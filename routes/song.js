var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

/* GET home page. */
router.get('/', async (req, res, next) => {
  const songsAll = await db.song.findAll({
    order: [['special', 'ASC'], ['id', 'ASC']],
  });
  res.render('song', { 
    title: 'SONGS | ZUTOMAYO DATABASE',
    songs: songsAll,
  });
});

router.get('/:song_id', async (req, res, next) => {
  const song_data = await db.song_live.findAll({
    where: { songId: req.params.song_id },
    include: [
      { model: db.live, required: false },
    ],
    order: [[db.live, 'liveDate', 'DESC']]
  });
  res.render('songData', {
    title: 'SONG DATA | ZUTOMAYO DATABASE',
    songData: song_data
  });
});

module.exports = router;

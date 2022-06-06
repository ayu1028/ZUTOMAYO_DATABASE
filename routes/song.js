var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

/* GET home page. */
router.get('/', async (req, res, next) => {
  const songsAll = await db.song.findAll({
    order: [['special', 'ASC'], ['releaseDate', 'DESC']],
  });
  res.render('song', { 
    title: 'SONGS | ZUTOMAYO DATABASE',
    songs: songsAll,
  });
});

router.get('/:song_id', async (req, res, next) => {
  const song_data = await db.song.findOne({
    where: { id: req.params.song_id },
  });
  const song_live_data = await db.song_live.findAll({
    where: { songId: req.params.song_id },
    include: [
      { model: db.live, required: false },
    ],
    order: [[db.live, 'liveDate', 'DESC']]
  });
  const song_album_data = await db.song_album.findAll({
    where: { songId: req.params.song_id },
    include: [
      { model: db.album, required: false },
    ],
    order: [[db.album, 'releaseDate', 'DESC']]
  });
  res.render('songData', {
    title: 'SONG DATA | ZUTOMAYO DATABASE',
    songData: song_data,
    songLiveData: song_live_data,
    songAlbumData: song_album_data
  });
});

module.exports = router;

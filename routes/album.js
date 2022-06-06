var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/', async (req, res, next) => {
  const albumAll = await db.album.findAll({
    order: [['releaseDate', 'DESC']],
  });
  const data = {
    title: 'ALBUMS | ZUTOMAYO DATABASE',
    contents: albumAll
  };
  res.render('album', data);
});

router.get('/:albumNum', async (req, res, next) => {
  const songsAll = await db.song_album.findAll({
    order: [['number', 'ASC']],
    where: { albumId: req.params.albumNum },
    include: [
      { model: db.song, required: true },
    ]
  });
  const album = await db.album.findOne({
    where: { id: req.params.albumNum },
  });
  const data = {
    title: `${album.albumName} | ZUTOMAYO DATABASE`,
    songs: songsAll,
    album: album
  };
  res.render('albumData', data);
});

module.exports = router;

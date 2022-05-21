require('dotenv').config();
const env = process.env;

var express = require('express');
const { session } = require('passport/lib');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/:id', async (req, res, next) => {
  if(req.params.id === env.admin) {
      req.session.adminId = req.params.id
      const allLives = await db.live.findAll();
      res.render('admin', {
        data: allLives,
      });
  } else {
    res.redirect('/');
  }
});

router.get('/live/:id', async (req, res, next) => {
  if(req.session.adminId) {
    const findSongsAll = await db.song_live.findAll({
      where: { liveId: req.params.id },
      order: [['number', 'ASC']],
      include: [
        { model: db.song, required: false },
        { model: db.live, required: false },
      ],
    });
    res.render('adminSongs', {
      data: findSongsAll,
      admin: req.session.adminId,
    });
  } else {
    res.redirect('/');
  }
});

router.get('/song/:id', async (req, res, next) => {
  if(req.session.adminId) {
    const findSong = await db.song_live.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.live, required: true },
        { model: db.song, required: true },
      ],
    });
    res.render('songUpdate', {
      data: findSong,
    })
  } else {
    res.redirect('/');
  }
});

router.post('/song/update/:id', async (req, res, next) => {
  try {
    const remarkUpdate = await db.song_live.update(
      { remark: req.body.remark },
      { where: { id: req.params.id } }
    );
    res.redirect(`/admin/song/${req.params.id}`);
  } catch (err) {
    res.redirect(`/admin/song/${req.params.id}`);
  }
});

module.exports = router;

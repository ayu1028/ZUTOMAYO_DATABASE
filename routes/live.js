var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/:liveNum', async (req, res, next) => {
  const setlistAll = await db.song_live.findAll({
    order: [['number', 'ASC']],
    where: { liveId: req.params.liveNum },
    include: [
      { model: db.song, required: false },
    ],
  });
  const live = await db.live.findOne({
    where: { id: req.params.liveNum },
    include: [
      { model: db.hako, required: false },
    ]
  });
  const data = {
    title: `${live.liveTitle} | ZUTOMAYO DATABASE`,
    songs: setlistAll,
    lives: live
  };
  res.render('live', data);
});

module.exports = router;

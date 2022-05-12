var express = require('express');
var router = express.Router();
const db = require('../models/index');
const Op = db.Sequelize.Op;

router.get('/', async (req, res, next) => {
  const liveAll = await db.live.findAll({
    order: [['liveDate', 'DESC']],
    include: [
      { model: db.hako, required: false },
    ]
  });
  const data = {
    title: 'LIVE | ZUTOMAYO DATABASE',
    contents: liveAll
  };
  console.log(req.session);
  res.render('setlist', data);
});

module.exports = router;

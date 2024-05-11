const express = require('express');
const render = require('./render');

var router = express.Router();

router.get('/', render.homePage);
router.post('/submit', render.save)

module.exports = router;
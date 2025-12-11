const express = require('express');
const router = express.Router();

const songsRouter = require('./songs-routes');

router.use('/songs', songsRouter);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
  listSongs,
  getSong,
  createSong,
  updateSongController,
  deleteSongController
} = require('../controllers/songs-controller');

router.get('/', listSongs);
router.get('/:id', getSong);
router.post('/', createSong);
router.put('/:id', updateSongController);
router.delete('/:id', deleteSongController);

module.exports = router;


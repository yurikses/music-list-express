const {
  getAllSongs,
  getSongById,
  addSong,
  updateSong,
  deleteSong
} = require('../songs-data');

function listSongs(req, res, next) {
  try {
    const { genre, author, favorite, search } = req.query;
    const songs = getAllSongs({ genre, author, favorite, search });
    res.json(songs);
  } catch (err) {
    next(err);
  }
}

function getSong(req, res, next) {
  try {
    const { id } = req.params;
    const song = getSongById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    next(err);
  }
}

function createSong(req, res, next) {
  try {
    const { author, name, duration, genre, favorite } = req.body;

    if (!author || !name) {
      return res.status(400).json({ error: 'author and name are required' });
    }

    const newSong = addSong({ author, name, duration, genre, favorite });
    res.status(201).json(newSong);
  } catch (err) {
    next(err);
  }
}

function updateSongController(req, res, next) {
  try {
    const { id } = req.params;
    const updated = updateSong(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteSongController(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = deleteSong(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(deleted);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listSongs,
  getSong,
  createSong,
  updateSongController,
  deleteSongController
};


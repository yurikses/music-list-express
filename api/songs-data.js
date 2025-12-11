let songs = [
  {
    id: 1,
    author: 'author name',
    name: 'song name',
    duration: 328,
    genre: 'Поп',
    favorite: true
  },
  {
    id: 2,
    author: 'second author',
    name: 'another song',
    duration: 240,
    genre: 'Рок',
    favorite: false
  }
];

let nextId = 3;

function getAllSongs(filters = {}) {
  const { genre, author, favorite, search } = filters;
  let result = [...songs];

  if (genre) {
    result = result.filter((s) => s.genre.toLowerCase() === String(genre).toLowerCase());
  }

  if (author) {
    result = result.filter((s) => s.author.toLowerCase().includes(String(author).toLowerCase()));
  }

  if (typeof favorite !== 'undefined') {
    const favBool = favorite === true || favorite === 'true' || favorite === 1 || favorite === '1';
    result = result.filter((s) => s.favorite === favBool);
  }

  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (s) => s.name.toLowerCase().includes(q) || s.author.toLowerCase().includes(q)
    );
  }

  return result;
}

function getSongById(id) {
  const numericId = Number(id);
  return songs.find((s) => s.id === numericId) || null;
}

function addSong(data) {
  const newSong = {
    id: nextId++,
    author: data.author,
    name: data.name,
    duration: Number(data.duration) || 0,
    genre: data.genre || 'Неизвестно',
    favorite:
      data.favorite === true || data.favorite === 'true' || data.favorite === 1 || data.favorite === '1'
  };

  songs.push(newSong);
  return newSong;
}

function updateSong(id, data) {
  const numericId = Number(id);
  const index = songs.findIndex((s) => s.id === numericId);
  if (index === -1) return null;

  const song = songs[index];

  songs[index] = {
    ...song,
    author: typeof data.author !== 'undefined' ? data.author : song.author,
    name: typeof data.name !== 'undefined' ? data.name : song.name,
    duration:
      typeof data.duration !== 'undefined' && data.duration !== null
        ? Number(data.duration)
        : song.duration,
    genre: typeof data.genre !== 'undefined' ? data.genre : song.genre,
    favorite:
      typeof data.favorite !== 'undefined'
        ? data.favorite === true || data.favorite === 'true' || data.favorite === 1 || data.favorite === '1'
        : song.favorite
  };

  return songs[index];
}

function deleteSong(id) {
  const numericId = Number(id);
  const index = songs.findIndex((s) => s.id === numericId);
  if (index === -1) return null;

  const [deleted] = songs.splice(index, 1);
  return deleted;
}

module.exports = {
  getAllSongs,
  getSongById,
  addSong,
  updateSong,
  deleteSong
};

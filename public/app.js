async function fetchSongs() {
  const res = await fetch('/api/songs');
  const data = await res.json();
  const list = document.getElementById('songs-list');
  list.innerHTML = '';

  data.forEach((song) => {
    const li = document.createElement('li');
    const main = document.createElement('span');
    main.textContent = `${song.author} — ${song.name}`;

    const meta = document.createElement('span');
    meta.className = 'song-meta';
    meta.textContent = `${song.genre || 'Жанр не указан'} · ${song.duration || 0} сек`;

    const removeBtn = document.createElement('button');
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.textContent = `${song.favorite ? '★' : '☆'}`;
    const buttonDiv = document.createElement('div');
    favoriteBtn.addEventListener('click', async () => {
      await fetch(`/api/songs/${song.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorite: !song.favorite })
      });
      fetchSongs();
    });


    removeBtn.textContent = 'Удалить';
    removeBtn.addEventListener('click', async () => {
      await fetch(`/api/songs/${song.id}`, { method: 'DELETE' });
      fetchSongs();
    });

    const left = document.createElement('span');
    left.appendChild(main);
    left.appendChild(document.createElement('br'));
    left.appendChild(meta);

    li.appendChild(left);
    buttonDiv.appendChild(favoriteBtn)
    buttonDiv.appendChild(removeBtn);
    li.appendChild(buttonDiv);
    list.appendChild(li);
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const payload = {
    author: formData.get('author'),
    name: formData.get('name'),
    duration: formData.get('duration'),
    genre: formData.get('genre'),
    favorite: formData.get('favorite') === 'on'
  };

  await fetch('/api/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  form.reset();
  fetchSongs();
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('song-form');
  form.addEventListener('submit', handleFormSubmit);
  fetchSongs();
});


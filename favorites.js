function renderFavorites() {
      const favoritesList = document.getElementById('favorites-list');
      const noFavMsg = document.getElementById('no-favorites-msg');
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favoritesList.innerHTML = '';
      if (favorites.length === 0) {
        noFavMsg.style.display = 'block';
        return;
      } else {
        noFavMsg.style.display = 'none';
      }
      favorites.forEach((quote, index) => {
        const li = document.createElement('li');
        li.className = 'quote-item';
        li.innerHTML = `
          <blockquote>"${quote.text}"</blockquote>
          <p class="author">— ${quote.author}</p>
          <button class="btn-remove" data-index="${index}">Remove</button>
        `;
        favoritesList.appendChild(li);
      });
      document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.style.backgroundColor="rgb(19, 37, 48)";
        btn.style.width="20%";
        btn.style.padding="10px";
        btn.style.borderRadius="30px";
        btn.style.color="white";
        btn.style.border="none";
        btn.addEventListener('click', e => {
          const idx = e.target.getAttribute('data-index');
          favorites.splice(idx, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          renderFavorites();
        });
      });
    }
    document.addEventListener('DOMContentLoaded', () => {
      renderFavorites();
    });
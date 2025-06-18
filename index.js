 const categories = ['wisdom', 'love', 'life', 'inspiration', 'happiness', 'motivation'];
    let allQuotes = [];
    let filteredQuotes = [];
    let currentPage = 1;
    const quotesPerPage = 6;


    function assignCategories(quotes) {
      return quotes.map(quote => {
        const count = Math.floor(Math.random() * 2) + 1;
        const shuffled = categories.sort(() => 0.5 - Math.random());
        quote.tags = shuffled.slice(0, count);
        return quote;
      });
    }


    function renderCategoryButtons() {
      const container = document.getElementById('category-buttons');
      container.innerHTML = '';

  
      const allBtn = document.createElement('button');
      allBtn.textContent = 'All';
      allBtn.className = 'category-btn active';
      allBtn.dataset.category = 'all';
      container.appendChild(allBtn);

      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.className = 'category-btn';
        btn.dataset.category = cat;
        container.appendChild(btn);
      });

      container.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const category = btn.dataset.category;
          currentPage = 1;
          if (category === 'all') {
            filteredQuotes = allQuotes;
          } else {
            filteredQuotes = allQuotes.filter(q => q.tags.includes(category));
          }
          renderQuotesPage();
        });
      });
    }

  
    function renderQuotesPage() {
      const quotesList = document.getElementById('quotes-list');
      quotesList.innerHTML = '';

      if (filteredQuotes.length === 0) {
        quotesList.innerHTML = '<li>No quotes in this category.</li>';
        updatePaginationButtons();
        return;
      }

      const startIdx = (currentPage - 1) * quotesPerPage;
      const pageQuotes = filteredQuotes.slice(startIdx, startIdx + quotesPerPage);

      pageQuotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.className = 'quote-item';
        li.innerHTML = `
          <blockquote>"${quote.quote}"</blockquote>
          <p class="author">— ${quote.author}</p>
          <p class="tags">Tags: ${quote.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</p>
          <button class="btn-favorite" data-index="${startIdx + index}">Add to Favorites ★</button>
        `;
        quotesList.appendChild(li);
      });

   
      document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', e => {
          const idx = e.target.getAttribute('data-index');
          const selectedQuote = filteredQuotes[idx];
          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          if (!favorites.some(q => q.text === selectedQuote.quote)) {
            favorites.push({ text: selectedQuote.quote, author: selectedQuote.author });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Quote added to favorites!');
          } else {
            alert('Quote is already in favorites.');
          }
        });
      });

      updatePaginationButtons();
    }

    function updatePaginationButtons() {
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage * quotesPerPage >= filteredQuotes.length;
    }

 
    document.getElementById('prev-btn').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderQuotesPage();
      }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      if (currentPage * quotesPerPage < filteredQuotes.length) {
        currentPage++;
        renderQuotesPage();
      }
    });

   
    function saveReflection() {
      const reflectionInput = document.getElementById('reflection-input');
      const reflectionText = reflectionInput.value.trim();
      const msg = document.getElementById('reflection-msg');
      if (reflectionText.length === 0) {
        msg.textContent = 'Please write something before saving.';
        msg.style.color = 'red';
        return;
      }
      let reflections = JSON.parse(localStorage.getItem('reflections')) || [];
      reflections.push({ text: reflectionText, date: new Date().toISOString() });
      localStorage.setItem('reflections', JSON.stringify(reflections));
      reflectionInput.value = '';
      msg.textContent = 'Reflection saved!';
      msg.style.color = 'green';
    }

  
    async function fetchQuotes() {
      try {
        const res = await fetch('https://dummyjson.com/quotes?limit=100');
        const data = await res.json();
        allQuotes = assignCategories(data.quotes);
        filteredQuotes = allQuotes;
        renderCategoryButtons();
        renderQuotesPage();
      } catch (error) {
        document.getElementById('quotes-list').innerHTML = '<li>Failed to load quotes. Please try again later.</li>';
        console.error('Error fetching quotes:', error);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      fetchQuotes();
      document.getElementById('btn-save-reflection').addEventListener('click', saveReflection);
    });
    const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const modalQuote = document.getElementById("modal-quote");

function quoteOfTheDay() {
    const quotes = [
        "Sunday Quote: The only way to do great work is to love what you do. - Steve Jobs",
        "Monday Quote: Life is what happens when you're busy making other plans. - John Lennon",
        "Tuesday Quote: In the middle of every difficulty lies opportunity. - Albert Einstein",
        "Wednesday Quote: The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
        "Thursday Quote: Do not watch the clock. Do what it does. Keep going. - Sam Levenson",
        "Friday Quote: The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Saturday Quote: The best way to predict the future is to invent it. - Alan Kay"
    ];
     const dayOfWeek = new Date().getDay();
  modalQuote.textContent = quotes[dayOfWeek];
  modal.style.display = "flex";
}
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("load", quoteOfTheDay);

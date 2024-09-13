// API endpoint for searching books
const apiUrl = 'https://openlibrary.org/search.json?q=';

// Function to display books
function displayBooks(bookList) {
  const bookDisplay = document.getElementById('book-display');
  bookDisplay.innerHTML = ''; // Clear the previous book list

  bookList.forEach(book => {
    // Use the cover API, with a placeholder if no cover is available
    const coverId = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : 'https://via.placeholder.com/200x300?text=No+Cover';

    const bookItem = document.createElement('div');
    bookItem.classList.add('book');
    bookItem.innerHTML = `
      <img src="${coverId}" alt="${book.title} Cover">
      <h3>${book.title}</h3>
      <p>Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
      <p>First Published: ${book.first_publish_year || 'Unknown'}</p>
    `;
    bookDisplay.appendChild(bookItem);
  });
}

// Function to fetch books from API
async function fetchBooksFromAPI(query = '') {
  try {
    const response = await fetch(`${apiUrl}${query}`); // Fetch data from the API
    const data = await response.json();
    displayBooks(data.docs); // Pass the 'docs' array to the display function
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Function to search books
function searchBooks(query) {
  fetchBooksFromAPI(query); // Fetch books from the API with the search query
}

// Event listener for the search bar
document.getElementById('Search').addEventListener('input', (e) => {
  searchBooks(e.target.value);
});

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('Search').value;
  searchBooks(query);
});

// Initial fetch and display of books from API
fetchBooksFromAPI(''); // Fetch all books or with a default query

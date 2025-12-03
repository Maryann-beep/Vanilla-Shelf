//selecting DOM elements
const bookForm = document.getElementById('new-book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const noOfPagesInput = document.getElementById('no-of-pages');

// capitalization function
function capitalizeString(str){
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
console.log(capitalizeString('collins cuban'))

// C. destructuring with class keyword and constructor function
class book{
    constructor(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}} // Book Class: The blueprint must be defined once, globally (at the top of your script), so it's accessible everywhere.

// D. Storage array to store book objects
    // myLibrary Array must be defined once, globally (at the top of my script) or a new, empty array is created every time the code runs.
const myLibrary = [];

// E. Rendering function
function renderLibrary(){
    const library = document.getElementById('library-grid')
    library.innerHTML = ''
    myLibrary.forEach(bookItem => {
        

        const bookCard = document.createElement('div');
        const bookInfo = document.createElement('div');
        const cardTitle = document.createElement('p');
        const cardAuthor = document.createElement('p');
        const cardPages = document.createElement('p');

        bookCard.className = 'book-card';
        bookInfo.className = 'book-info';
        cardTitle.className = 'card-title';
        cardAuthor.className = 'card-author';
        cardPages.className = 'card-pages';

        bookCard.appendChild(bookInfo);
        bookInfo.append(cardTitle, cardAuthor, cardPages);

        cardTitle.textContent = bookItem.title;
        cardAuthor.textContent = bookItem.author;
        cardPages.textContent = bookItem.pages;
    });
}


// An event listener on the form to detect the submit event.
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // A. User Input - Value formatting
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const noOfPages = noOfPagesInput.value.trim();

    
    if (title === '' || author === '' || noOfPages === '') {
        alert('Please fill in all fields');
        return;
    }

    // B. Data Acquisition with object literals - Create a new book object
    const bookData = {
    title: capitalizeString(title),
    author: capitalizeString(author),
    pages: noOfPages
}
console.log(bookData);

// Destructuring bookData
const {title:newTitle, author:newAuthor, pages:newPages} = bookData;

// Creating the Instance
const newBook = new book(newTitle, newTitle, newPages)

myLibrary.push(newBook);
renderLibrary();

// Clear form fields after submission
    titleInput.value = '';
    authorInput.value = '';
    noOfPagesInput.value = '';
});
    


//selecting DOM elements
const bookForm = document.getElementById('new-book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const noOfPagesInput = document.getElementById('no-of-pages');
const readInput = document.getElementById('read');

// capitalization function
function capitalizeString(str){
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
console.log(capitalizeString('collins cuban'))

// C. destructuring with class keyword and constructor function
class Book{
    //Constructor is a special method inside the class.
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read; // store the boolean
    }
    // the readStatus function
    toogleReadStatus(){
        this.read = !this.read; // Toggle the boolean value
    }
} // Book Class

// D. Storage array to store book objects
const Library = [];

// E. Rendering function
function renderLibrary(){
    const library = document.getElementById('library-grid')
    library.innerHTML = ''
    Library.forEach((bookItem) => {

        const bookCard = document.createElement('div');
        const bookInfo = document.createElement('div');
        const cardTitle = document.createElement('p');
        const cardAuthor = document.createElement('p');
        const cardPages = document.createElement('p');
        const statusText = document.createElement('div');
        const statusLabel = document.createElement('span');

        bookCard.className = 'book-card';
        bookInfo.className = 'book-info';
        cardTitle.className = 'card-title';
        cardAuthor.className = 'card-author';
        cardPages.className = 'card-pages';
        statusText.className = 'status-text';

        // Append book info elements to the book card
        bookCard.appendChild(bookInfo);
        bookInfo.append(cardTitle, cardAuthor, cardPages, statusText);

        cardTitle.textContent = `${bookItem.title}`;
        cardAuthor.textContent = `${bookItem.author}`;
        cardPages.textContent = `${bookItem.pages} pages`;
        statusLabel.textContent = bookItem.read ? "read" : "UNREAD";

        // fixed typo and apply color
        const statusColor = bookItem.read ? 'green' : 'red';
        statusLabel.style.color = statusColor;

        // append status label to the status container
        statusText.appendChild(statusLabel);

        // Append the finished card into the library grid
        library.appendChild(bookCard);
    });
}


// LOCAL STORAGE FUNCTIONS
function saveLocalStorage(){
    // convert library array into a JSON string
    localStorage.setItem('libraryData', JSON.stringify(Library));
}

function loadLocalData(){
    // Check if 'library' data exists in storage
    const storedData = localStorage.getItem('libraryData');
    if (storedData){
        // convert the JSON string back into a JS array of objects
        const loadedLibrary = JSON.parse(storedData);

        // Recreate Book instances from the loaded data
        loadedLibrary.forEach(bookData => {
            const bookInstance = new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
            Library.push(bookInstance);
        });

        renderLibrary();
    }
}
// ======================================================

// load stored data on script start
loadLocalData();

// An event listener on the form to detect the submit event.
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // A. User Input - Value formatting
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const noOfPages = noOfPagesInput.value.trim();
    const isRead = readInput.checked; //checking read status - This is true or false

    if (title === '' || author === '' || noOfPages === '') {
        alert('Please fill in all fields');
        return;
    }

    // B. Collect Data → object literals
    const bookData = {
        title: capitalizeString(title),
        author: capitalizeString(author),
        pages: Number(noOfPages),
        read: isRead // Pass the boolean state directly
    }
    console.log(bookData);

    // Destructuring bookData to extract values from it.
    const {title:newTitle, author:newAuthor, pages:newPages, read} = bookData;

    // Creating the Instance - this is the real object created from the class blueprint 
    const newBook = new Book(newTitle, newAuthor, newPages, read);

    Library.push(newBook);
    renderLibrary();
    saveLocalStorage()

    // Clear form fields after submission
    titleInput.value = '';
    authorInput.value = '';
    noOfPagesInput.value = '';
});



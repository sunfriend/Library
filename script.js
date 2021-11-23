class Book {
    constructor(title = "NO TITLE", author = "unknown", numberOfPages = 0, readStatus = false, coverURL = "#") {
        this._title = title;
        this._author = author;
        this._numberOfPages = numberOfPages;
        this._readStatus = readStatus;
        this._coverURL = coverURL;

        this._bookId = idGenerator.uniqueId("book");
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get numberOfPages() {
        return this._numberOfPages;
    }

    get readStatus() {
        return this._readStatus;
    }

    set readStatus(rdStatus) {
        this._readStatus = rdStatus;
    }

    get coverURL() {
        return this._coverURL;
    }

    get bookId() {
        return this._bookId;
    }
}

//let library = [{title: "The Adventures Of Lily", author: "Adele Williams", pages: 122, readStatus: true, cover: "https://marketplace.canva.com/EAD7WdPHbx8/1/0/1003w/canva-colorful-abstract-adventure-children%27s-book-cover-yT1fFarv3nc.jpg"}, {title: "Never Again", author: "Ashley Wilson", pages: 401, readStatus: false, cover: "https://marketplace.canva.com/EAEt6DyysTM/1/0/1003w/canva-pink-romantic-couple-book-cover--w98aUl_Mic.jpg"}, {title: "The Dark Side", author: "Morgan Maxwell", pages: 754, readStatus: false, cover: "https://marketplace.canva.com/EAD7YNrBQwQ/1/0/501w/canva-black%2C-white-and-red-modern-thriller-mystery-book-cover-fi5B6dvhD2c.jpg"}, {title: "Rosie Wilkins", author: "Hannah Morales", pages: 55, readStatus: true, cover: "https://marketplace.canva.com/EAD7WTSwegc/1/0/1003w/canva-white-script-overlay-romance-chick-lit-book-cover-VtltAyy9bgY.jpg"},{title: "Every thing you never had", author: "Bailey Dupont", pages: 612, readStatus: false, cover: "https://marketplace.canva.com/EAD7WQkjMow/1/0/1003w/canva-black-and-white-minimalist-memoir-inspirational-book-cover-UUj9LA0JjOY.jpg"}, {title: "Living with 50 things", author: "Miyaki Eze", pages: 1210, readStatus: false, cover: "https://marketplace.canva.com/EAD7Wut5n7E/1/0/501w/canva-white%2C-black-and-red-modern-self-help-book-cover-OJm0o7Ihv4A.jpg"}, {title: "Secrets", author: "Harry Rickets", pages: 390, readStatus: false, cover: "https://marketplace.canva.com/EADan86654s/1/0/1003w/canva-thriller-novel-small-kindle-book-cover-C-0O2Cb2tnw.jpg"}, {title: "How Nelly Saved Circus", author: "Matt Zhang", pages: 25, readStatus: false, cover: "https://marketplace.canva.com/EAD7WW3V_lQ/1/0/1003w/canva-colorful-illustration-children%27s-book-cover-w81oB8vajFE.jpg"}, {title: "The Sound of Waves", author: "Alexander Aronowitz", pages: 900, readStatus: false, cover: "https://marketplace.canva.com/EAD7We1xIDk/3/0/1003w/canva-sound-of-waves-memoir-inspirational-book-cover-K8I4oUCXXws.jpg"}];
let library = [];

const dataBookCard = document.querySelector("[data-book-card]");
const addBookButton = document.querySelector("[data-add-book]");
const saveBookButton = document.querySelector("[data-save-book]");
const closeFormButton = document.querySelector("[data-close-form]");
const dataModal = document.querySelector("[data-modal]");
const bookForm = document.querySelector("[data-book-form]");
let dataBookTitle = document.querySelector("[data-book-title]");
let dataBookAuthor = document.querySelector("[data-book-author]");
let dataBookPages = document.querySelector("[data-book-pages]");
let dataBookCover = document.querySelector("[data-book-cover]");
let dataBookRead = document.querySelector("[data-book-read]");
let idGenerator = {};

addBookButton.addEventListener("click", addBook);
saveBookButton.addEventListener("click", saveBook);
closeFormButton.addEventListener("click", closeForm, false);

idGenerator.uniqueId = (function() {
    let counter = -1;
    return function(prefix) {
        counter++;
        return (prefix || "") + "-" + counter;
    };
}());

function addBook() {
    hideElement(bookForm, false);
    hideElement(addBookButton);
    hideElement(dataModal, false);
}

function hideElement(element, hide = true) {
    hide ? element.style.display = "none" : element.style.display = "block";
}

function saveBook(event) {
    let book = new Book(dataBookTitle.value, dataBookAuthor.value, dataBookPages.value, dataBookRead.checked, dataBookCover.value);
    library.push(book);
    displayBookCard(book);
    emptyInputs();
    hideElement(addBookButton, false);
    hideElement(bookForm);
    hideElement(dataModal);
}

function emptyInputs() {
    dataBookTitle.value = "";
    dataBookAuthor.value = "";
    dataBookPages.value = "";
    dataBookRead.checked = false;
    dataBookCover.value = "";
}

function displayBookCard(book) {
       let div = dataBookCard.cloneNode(true);
       div.classList.add("book-card");
       div.id = book.bookId;
       div.querySelector("[data-card-title]").innerText = book.title;
       div.querySelector("[data-card-author]").innerText = book.author;
       div.querySelector("[data-card-pages]").innerText = book.numberOfPages;
       div.querySelector("[data-card-read]").checked = book.readStatus;
       div.querySelector("[data-card-cover]").src = book.coverURL;
       div.style.display = "block";
       div.querySelector("button").addEventListener("click", removeBook, false);
       div.querySelector("input[type=checkbox]").addEventListener("change", toggleReadStatus, false);
       document.querySelector(".books-container").appendChild(div);
}


function closeForm() {
    hideElement(bookForm);
    hideElement(dataModal);
    hideElement(addBookButton, false);
}

function removeBook(event) {
    let parentContainer = event.target.parentNode;
    library = library.filter(book => (book.bookId !== parentContainer.id));
    parentContainer.remove();
}

function toggleReadStatus(event) {
    let parentContainerId = event.target.parentNode.id;
    library.map((book, index) => {
        if (parentContainerId === book.bookId) {
            library[index].readStatus = this.checked;
        }
    });
    console.log(library);
}
const container = document.querySelector(".container");
const newBTN = document.querySelector("dialog + button");
const dialog = document.querySelector("dialog");
const closeBTN = document.querySelector("#close");
const submitBTN = document.querySelector("#submit");
var myLibrary = [];
var bookId = 0;

function Books(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === "yes";
    this.hasRead = function() {
        this.read = !this.read;
    };

    this.info = function() {
        return `The ${this.title} by ${this.author} had ${this.pages} pages.`;
    };
}

const Hoops = new Books("Hoops", "Unknown", "429", "yes");

function addBookToLibrary(book) {
    console.log("Book getting added: ", book.title);
    myLibrary.push(book);
}

function displayBooks() {
    clear(); // Clear existing display before redrawing

    for (let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement("div");
        const titleHeader = document.createElement("h1");
        const deleteBTN = document.createElement("button");
        const readBTN = document.createElement("input");
        readBTN.type = "checkbox";
        readBTN.name = `${myLibrary[i].title}`;

        div.appendChild(titleHeader);
        div.setAttribute('id', `${myLibrary[i].title}`);
        div.appendChild(readBTN);
        div.appendChild(deleteBTN);
        titleHeader.textContent = `${myLibrary[i].title}`;
        deleteBTN.textContent = "Delete";

        container.appendChild(div);

        deleteBTN.addEventListener(`click`, (event) => {
            div.parentNode.removeChild(div);
            myLibrary.splice(i, 1); // Remove book from library
            displayBooks(); // Redraw books after deletion
        });

        readBTN.addEventListener(`click`, () => {
            myLibrary[i].hasRead();
        });
    }
}

newBTN.addEventListener("click", function() {
    console.log("newBtn called...");
    dialog.showModal();
});

submitBTN.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("submitBtn called...");
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const numberOfPages = document.getElementById("pages").value;

    const book = new Books(bookTitle, bookAuthor, numberOfPages, "no"); // Defaulting read to "no"
    console.log("adding book... ", book.title);
    addBookToLibrary(book);
    dialog.close();
    displayBooks();
});

closeBTN.addEventListener("click", function() {
    dialog.close();
});

function clear() {
    container.innerHTML = ""; // Clearing the container element
}

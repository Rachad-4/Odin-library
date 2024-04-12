
const container = document.querySelector(".container");
const newBTN = document.querySelector("dialog + button");
const dialog = document.querySelector("dialog");
const closeBTN = document.querySelector("#close");
const submitBTN = document.querySelector("#submit");
var myLibrary = [];

function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read =="yes" ? true : false;
    this.hasRead = function() {
        this.read = !this.read;
    };

    this.info = function() {
        return `The ${title} by ${author} had ${pages} pages.`;
    };
};

function addBookToLibrary(library,book) {
    library.push(book);
};
    
function getTitle(books){
    for (var i = 0; i < myLibrary.length; i++) {
        console.log(books[i].title);
    }
};


function displayBooks(library) {
    for (let i = 0; i < library.length; i++) {
        const div = document.createElement("div");
        const titleHeader = document.createElement("h1"); 
        const deleteBTN = document.createElement("button");
        const readBTN = document.createElement("input");
        readBTN.type = "checkbox";
        readBTN.name = `${library[i].title}`;

        container.appendChild(div);
        div.appendChild(titleHeader);
        div.setAttribute('id',`${library[i].title}`);
        div.appendChild(readBTN);
        div.appendChild(deleteBTN);
        titleHeader.textContent = `${library[i].title}`;
        deleteBTN.textContent = "Delete";

        deleteBTN.addEventListener(`click`, (event)=> {
            div.parentNode.removeChild(div);
        }); 

        readBTN.addEventListener(`click`, (event) => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].title == event.target.name) {
                    myLibrary[i].hasRead();
                }
            }
        });
    }    
};

newBTN.addEventListener("click", function () {
    dialog.showModal();

    submitBTN.addEventListener("click", (e) =>  {
        const bookTitle = document.getElementById("title");
        const bookAuthor = document.getElementById("author");
        const numberOfPages = document.getElementById("pages");

        let warn = "This button is not functional."
        alert(warn);
        e.preventDefault();
        console.log(bookTitle.value);

        const book = new Books(bookTitle.value, bookAuthor.value, numberOfPages.value = 0,);
        addBookToLibrary(myLibrary,book);
        dialog.close();
        clear();
        displayBooks(myLibrary,book);
        console.log(myLibrary);
    });
});

closeBTN.addEventListener("click", function () {
    dialog.close();
});

function clear () {
    if (myLibrary.length > 0) {
        for(let i = myLibrary.length - 1; i > 0;  i--) {
            const div = document.createElement("div");
            if ( div.parentNode != null) div.parentNode.removeChild(div);
        }
    }
}

displayBooks(myLibrary);



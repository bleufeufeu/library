const bookForm = document.getElementById("addBook");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeRead = function() {
    if (this.read === "Yes") this.read = "Partially";
    else if (this.read === "Partially") this.read = "No";
    else if (this.read === "No") this.read = "Yes";
    showLibrary();
}

function addToLibrary(Book) {
    myLibrary.push(Book);
}

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("modalBtn");
const closeButton = document.getElementById("closeBtn");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.querySelector("input[name=read]:checked").value;

    bookForm.reset();
    if (dialog.open) dialog.close();
    addToLibrary(new Book(title, author, pages, read));
    showLibrary();
});

function showLibrary() {
    let i = 0;
    const container = document.getElementById("bookContainer");
    container.querySelectorAll(".book").forEach(book => {
        container.removeChild(book);
    });
    
    myLibrary.forEach(book => {
        const newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.setAttribute("id", `${i}`);
        newBook.innerHTML += `<div class="book-title">${book.title}</div>
                              <div class="book-author">By: ${book.author}</div>
                              <div class="book-pages">Pages: ${book.pages}</div>
                              <div class="book-read">Read: ${book.read} <button class="change-read">(change)</button></div>
                              <i class="fa-solid fa-trash"></i>`;
        container.appendChild(newBook);

        newBook.querySelector(".change-read").addEventListener("click", function() {
            book.changeRead();
        });

        newBook.querySelector(".fa-trash").addEventListener("click", function() {
            deleteBook(newBook.id);
        });

        i++;
    });
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    showLibrary();
}
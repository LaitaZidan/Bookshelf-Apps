document.addEventListener("DOMContentLoaded", function () {
    const unreadList = document.getElementById("unread-list");
    const readList = document.getElementById("read-list");
    const searchInput = document.getElementById("search-input");
    const titleInput = document.getElementById("title-input");
    const authorInput = document.getElementById("author-input");
    const yearInput = document.getElementById("year-input");

    let books = JSON.parse(localStorage.getItem("books")) || [];

    function renderBooks() {
        unreadList.innerHTML = "";
        readList.innerHTML = "";

        books.forEach(book => {
            const bookItem = document.createElement("li");
            bookItem.classList.add("book-item");
            bookItem.innerHTML = `
                <span>${book.title} - ${book.author} (${book.year})</span>
                <button onclick="moveBook(${book.id})">${book.isComplete ? "Belum Selesai" : "Selesai"}</button>
                <button onclick="deleteBook(${book.id})">Hapus</button>
            `;

            if (book.isComplete) {
                readList.appendChild(bookItem);
            } else {
                unreadList.appendChild(bookItem);
            }
        });
    }

    function addBook() {
        const title = titleInput.value;
        const author = authorInput.value;
        const year = parseInt(yearInput.value);

        if (title && author && year) {
            const id = +new Date();
            const newBook = {
                id,
                title,
                author,
                year,
                isComplete: false
            };

            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
            renderBooks();

            titleInput.value = "";
            authorInput.value = "";
            yearInput.value = "";
        } else {
            alert("Mohon lengkapi data buku!");
        }
    }

    function moveBook(id) {
        const index = books.findIndex(book => book.id === id);
        books[index].isComplete = !books[index].isComplete;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }

    function deleteBook(id) {
        books = books.filter(book => book.id !== id);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }

    function searchBooks(query) {
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
        unreadList.innerHTML = "";
        readList.innerHTML = "";

        filteredBooks.forEach(book => {
            const bookItem = document.createElement("li");
            bookItem.classList.add("book-item");
            bookItem.innerHTML = `
                <span>${book.title} - ${book.author} (${book.year})</span>
                <button onclick="moveBook(${book.id})">${book.isComplete ? "Belum Selesai" : "Selesai"}</button>
                <button onclick="deleteBook(${book.id})">Hapus</button>
            `;

            if (book.isComplete) {
                readList.appendChild(bookItem);
            } else {
                unreadList.appendChild(bookItem);
            }
        });
    }

    renderBooks();

    searchInput.addEventListener("input", function (event) {
        searchBooks(event.target.value);
    });

    window.addBook = addBook;
    window.moveBook = moveBook;
    window.deleteBook = deleteBook;
});
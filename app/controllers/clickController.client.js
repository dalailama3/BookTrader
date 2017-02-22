'use strict';

(function () {

   var searchForm = document.querySelector('.searchBooks')


   function listBooks (data) {
     var booksList = document.querySelector('.books')
     booksList.innerHTML = ''
     var data = JSON.parse(data)
     console.log(data.items)
     data.items.forEach((book)=> {
       var li = document.createElement("li")
       li.innerHTML = book.volumeInfo.title

       var img = document.createElement("img")
       if (book.volumeInfo.imageLinks) {
         img.setAttribute('src', book.volumeInfo.imageLinks.smallThumbnail)
       }

       li.append(img)

       var addButton = document.createElement("button")
       addButton.innerHTML = 'Add Book'
       addButton.setAttribute('data-bookId', book.id)

       addButton.addEventListener('click', function (event) {
         console.log(this.getAttribute('data-bookId'))
       })

       li.append(addButton)
       booksList.append(li)
     })

   }

   searchForm.addEventListener('submit', function (event) {
     event.preventDefault()
     var search = document.querySelector('.searchTerm').value
     var booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`

     ajaxFunctions.ajaxRequest('GET', booksUrl, listBooks);

    });


})();

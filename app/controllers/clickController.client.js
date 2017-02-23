'use strict';

(function () {

   var searchForm = document.querySelector('.searchBooks')

   function listUsers (data) {
     var usersList = document.querySelector('.users')
     var data = JSON.parse(data)
     data.forEach((user)=> {
       var li  = document.createElement("li")
       li.innerHTML = user.github.username
       usersList.append(li)

     })
   }

   ajaxFunctions.ajaxRequest('GET', '/users', listUsers);

   function listBooks (data) {
     var booksList = document.querySelector('.books')
     booksList.innerHTML = ''
     var data = JSON.parse(data)
     console.log(data.items)
     data.items.forEach((book)=> {

       if (book.volumeInfo.imageLinks) {
         var li = document.createElement("li")
         li.innerHTML = book.volumeInfo.title

         var img = document.createElement("img")
         img.setAttribute('src', book.volumeInfo.imageLinks.smallThumbnail)
         li.append(img)

         var addButton = document.createElement("button")
         addButton.innerHTML = 'Add Book'
         addButton.setAttribute('data-bookId', book.id)

         addButton.addEventListener('click', function (event) {
           console.log(this.getAttribute('data-bookId'))
           var bookId = this.getAttribute('data-bookId');
           ajaxFunctions.ajaxRequest('POST', `/addBook/${bookId}`, function (res) {
             console.log("book added", res)

           })
         })

         li.append(addButton)
         booksList.append(li)
       }


     })

   }

   searchForm.addEventListener('submit', function (event) {
     event.preventDefault()
     var search = document.querySelector('.searchTerm').value
     var booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
     ajaxFunctions.ajaxRequest('GET', booksUrl, listBooks);

    });


})();

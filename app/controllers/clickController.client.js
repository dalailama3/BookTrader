'use strict';

(function () {

   var searchForm = document.querySelector('.searchBooks')

   function listUsers (data) {
     var usersList = document.querySelector('.users')
     var data = JSON.parse(data)

     var userEmail = document.querySelector('.userEmail').innerHTML

     data.forEach((user)=> {
       if (user.local.email !== userEmail) {
        //  var li  = document.createElement("li")
         var a  = document.createElement("a")
         a.setAttribute('class', 'list-group-item user-a')
         a.setAttribute('href', `/users/${user.local.email}/books`)

         a.innerHTML = user.local.email
        //  li.append(a)
         usersList.append(a)

       }


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
         li.setAttribute('class', 'bookLi')
         li.innerHTML = book.volumeInfo.title

         var img = document.createElement("img")
         img.setAttribute('src', book.volumeInfo.imageLinks.smallThumbnail)
         li.append(img)

         var addButton = document.createElement("button")
         addButton.innerHTML = 'Add Book'
         addButton.setAttribute('data-bookId', book.id)
         addButton.setAttribute('class', 'btn btn-default add-book-button')

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

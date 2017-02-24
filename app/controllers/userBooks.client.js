'use strict';

(function () {

  var books = document.querySelector('.hidden').innerHTML
  console.log(books)
  books = JSON.parse(books)

  function listBooks (data) {
    var data = JSON.parse(data)
    var booksUl = document.querySelector('.bookshelf')

    var li = document.createElement("li")
    // li.innerHTML = data.volumeInfo.title

    var img = document.createElement("img")
    img.setAttribute('src', data.volumeInfo.imageLinks.smallThumbnail)
    li.append(img)

    booksUl.append(li)

  }

  books.forEach((bookId)=> {
    var booksUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
    ajaxFunctions.ajaxRequest('GET', booksUrl, listBooks);
  })






})();

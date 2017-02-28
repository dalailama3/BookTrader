'use strict';

(function () {

  var books = document.querySelector('.books').innerHTML
  var userBooks = document.querySelector('.curUserBooks').innerHTML

  books = JSON.parse(books)
  userBooks = JSON.parse(userBooks)

  function listBooks (data) {
    var data = JSON.parse(data)
    var booksUl = document.querySelector('.bookshelf')
    var rightUl = document.querySelector('.bookshelf-otherUser-list')

    var li = document.createElement("li")
    var rightLi = document.createElement("li")
    rightLi.innerHTML = data.volumeInfo.title

    var img = document.createElement("img")
    img.setAttribute('src', data.volumeInfo.imageLinks.smallThumbnail)
    li.append(img)

    booksUl.append(li)
    rightUl.append(rightLi)

  }

  function listCurUserBooks (data) {
    var data = JSON.parse(data)
    var leftUl = document.querySelector('.bookshelf-curUser-list')
    var leftLi = document.createElement("li")
    leftLi.innerHTML = data.volumeInfo.title
    leftUl.append(leftLi)
  }

  books.forEach((bookId)=> {
    var booksUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
    ajaxFunctions.ajaxRequest('GET', booksUrl, listBooks);
  })

  userBooks.forEach((bookId)=> {
    var booksUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
    ajaxFunctions.ajaxRequest('GET', booksUrl, listCurUserBooks);
  })

  var tradeView = document.querySelector('.trade-view')
  var tradeButton = document.querySelector('.trade')
  tradeButton.addEventListener('click', function (event) {

  })





})();

'use strict';

$('document').ready(function () {

  var requests = $('.requests').text()
  requests = JSON.parse(requests)

  function getBookTitleAndImage (id, $el) {
    var booksUrl = `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
    $.ajax({
      url: booksUrl,
      method: 'GET',
      dataType: 'json'
    })
    .done(function (result) {

      var $img = $("<img>",
      {
        'src': result.volumeInfo.imageLinks.smallThumbnail
     })
      $el.append($img)
    })
  }

  var requestsUl = $('.requestsList')

  requests.forEach((request)=> {
    var requestId = request._id
    var $li = $('<li>', { 'class': 'tradeRequestLi'})
    var offeredBooks = request.offerBooks
    var requestedBooks = request.requestedBooks
    var sender = request.fromUserEmail
    var $requestedBooksDiv = $('<div>', { 'class': 'requestedBooks' })
    var $offeredBooksDiv = $('<div>', { 'class': 'requestedBooks' })
    var $statusDiv = $('<div>', { 'class': 'tradeStatus', text: request.status})

    var $acceptTradeButton = $('<button>', { 'text': 'Accept'})

    $acceptTradeButton.on('click', function () {
      $.ajax({
        url: '/tradeRequests/' + requestId,
        dataType: 'json'
      })
      .done(function (d) {
        console.log(d)
      })
    })
    $statusDiv.append($acceptTradeButton)

    requestedBooks.forEach((id)=> {
      getBookTitleAndImage(id, $requestedBooksDiv)
    })

    offeredBooks.forEach((id)=> {
      getBookTitleAndImage(id, $offeredBooksDiv)
    })


    var $requestParty = $('<div>',{ 'class': 'requestParty', text: sender })
    $li.append($requestParty)
    $li.append($offeredBooksDiv)
    $li.append($requestedBooksDiv)
    $li.append($statusDiv)

    if (request.status === 'pending') {
      requestsUl.append($li)

    }



  })


})

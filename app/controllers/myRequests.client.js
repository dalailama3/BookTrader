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
    var $li = $('<li>', { 'class': 'tradeRequestLi'})
    var offeredBooks = request.offerBooks
    var requestedBooks = request.requestedBooks
    var sender = request.fromUserEmail
    var $requestedBooksDiv = $('<div>', { 'class': 'requestedBooks', text: 'Requested'})
    var $offeredBooksDiv = $('<div>', { 'class': 'requestedBooks', text: 'Offered'})
    var $statusDiv = $('<div>', { 'class': 'tradeStatus', text: 'Status: ' + request.status})

    requestedBooks.forEach((id)=> {
      getBookTitleAndImage(id, $requestedBooksDiv)
    })

    offeredBooks.forEach((id)=> {
      getBookTitleAndImage(id, $offeredBooksDiv)
    })



    var liText = 'Offer sent from: ' + sender

    var $requestParty = $('<div>',{ 'class': 'requestParty', text: liText })
    $li.append($requestParty)
    $li.append($requestedBooksDiv)
    $li.append($offeredBooksDiv)
    $li.append($statusDiv)
    requestsUl.append($li)



  })


})

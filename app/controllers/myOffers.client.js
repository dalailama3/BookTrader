'use strict';

$('document').ready(function () {

  var offers = $('.offers').text()
  offers = JSON.parse(offers)

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

  var offersUl = $('.offersList')
  offers.forEach((offer)=> {
    var $li = $('<li>', { 'class': 'tradeOfferLi'})
    var offeredBooks = offer.offerBooks
    var requestedBooks = offer.requestedBooks
    var receiver = offer.otherParty
    var $requestedBooksDiv = $('<div>', { 'class': 'requestedBooks'})
    var $offeredBooksDiv = $('<div>', { 'class': 'offeredBooks'})
    var $statusDiv = $('<div>', { 'class': 'tradeStatus', text: offer.status})

    requestedBooks.forEach((id)=> {
      getBookTitleAndImage(id, $requestedBooksDiv)
    })

    offeredBooks.forEach((id)=> {
      getBookTitleAndImage(id, $offeredBooksDiv)
    })


    var $offerParty = $('<div>',{ 'class': 'offerParty', text: receiver})
    $li.append($offerParty)
    $li.append($offeredBooksDiv)
    $li.append($requestedBooksDiv)
    $li.append($statusDiv)
    offersUl.append($li)



  })


})

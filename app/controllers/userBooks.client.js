'use strict';


  $(document).ready(function () {
    var curUserList = []
    var otherUserList = []
    var books = $('.books').text()
    var userBooks = $('.curUserBooks').text()

    books = JSON.parse(books)
    userBooks = JSON.parse(userBooks)

    var $booksUl = $('.bookshelf')
    var $rightUl = $('.bookshelf-otherUser-list')


    function listBooks (data) {

      var data = JSON.parse(data)
      var $li = $("<li>")
      var $rightLi = $("<li>", { 'class': 'trade' })
      $rightLi.text(data.volumeInfo.title)

      var $img = $("<img>", {
        'src': data.volumeInfo.imageLinks.smallThumbnail
      })
      var $radioDiv = $('<div>', { 'class': 'radio-option'})
      $radioDiv.attr('data-bookId', data.id)
      $radioDiv.on("click", function () {
        $(this).not(this).removeClass('click');
        $(this).toggleClass("click");
      })


      $li.append($img)
      $rightLi.append($radioDiv)
      $booksUl.append($li)
      $rightUl.append($rightLi)


    }

    function listCurUserBooks (data) {
      var data = JSON.parse(data)
      var $leftUl = $('.bookshelf-curUser-list')
      var $leftLi = $("<li>", { 'class': 'trade'})
      var $radioDiv = $('<div>', { 'class': 'radio-option'})
      $radioDiv.attr('data-bookId', data.id)

      $radioDiv.on("click", function () {
        $(this).not(this).removeClass('click');
        $(this).toggleClass("click");

      })


      $leftLi.text(data.volumeInfo.title)
      $radioDiv.appendTo($leftLi)
      $leftUl.append($leftLi)


    }


      var tradeButton = $('button.trade')

      tradeButton.on("click", function () {

        var clicked = $('.bookshelf-curUser-list .radio-option.click')
        var clicked = Array.prototype.slice.call(clicked)
        var arr = []
        clicked.forEach((el)=> {
          arr.push($(el).attr('data-bookId'))
        })

        curUserList = arr

        var otherClicked = $('.bookshelf-otherUser-list .radio-option.click')
        var otherClicked = Array.prototype.slice.call(otherClicked)

        var otherArr = []
        otherClicked.forEach((el)=> {
          otherArr.push($(el).attr('data-bookId'))
        })

        otherUserList = otherArr

        if (otherUserList.length > 0 && curUserList.length > 0) {
          var userEmail = $('.userEmail').text()
          var tradeOffer = {
            'otherParty': userEmail,
            'offerBooks': curUserList,
            'requestedBooks': otherUserList,
            'status': 'pending'
          }

          var tradeRequest = {
            'requestedBooks': curUserList,
            'offerBooks': curUserList,
            'status': 'pending'

          }
          $.ajax({
            url: '/addTradeOffer',
            method: 'POST',
            data: tradeOffer,
            dataType: 'json'
          })
          .done(function (d) {
            console.log("trade offer sent", d)

          });

          $.ajax({
            url: '/addTradeRequest/' + userEmail,
            method: 'POST',
            data: tradeRequest,
            dataType: 'json'
          })
          .done(function (d) {
            console.log("trade request received", d)

          });

        }

      })

      books.forEach((bookId)=> {
        var booksUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
        ajaxFunctions.ajaxRequest('GET', booksUrl, listBooks);
      })

      userBooks.forEach((bookId)=> {
        var booksUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyABcubhr0IIhjhjYwOQGvzeAMnXy2SK-Hg`
        ajaxFunctions.ajaxRequest('GET', booksUrl, listCurUserBooks);
      })


  });

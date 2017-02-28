'use strict';

(function () {
   var profileEmail = document.querySelector('#profile-email') || null;
   var profileCity = document.querySelector('#profile-city') || null;
   var profileState = document.querySelector('#profile-state') || null;
   var profileName = document.querySelector('#profile-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
     if (data.hasOwnProperty(userProperty)) {
       element.value = data[userProperty];

     } else {
       element.value = ""
     }
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      console.log(userObject)

      if (userObject.name !== null) {
         updateHtmlElement(userObject, profileName, 'name');
      }

      if (userObject.email !== null) {
         updateHtmlElement(userObject, profileEmail, 'email');
      }

      if (userObject.city !== null) {
         updateHtmlElement(userObject, profileCity, 'city');
      }

      if (userObject.state !== null) {
         updateHtmlElement(userObject, profileState, 'state');
      }

   }));
})();

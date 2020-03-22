// $(document).ready(function() {
 
function buildQueryURL() {
  
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" 

var queryParams = { "api-key" : "&appid=75c9c3885f537245e3ffc95d9728c4b1"};

// Getting location input from user
queryParams.q = $('#city-search')
   .val()
   .trim();


// Logging URL for troubleshooting
 console.log("----------------------\nURL: " + queryURL + "\n--------------");
 console.log(queryURL + $.param(queryParams));
 return queryURL + $.param(queryParams);  
}   




$('#search-btn').on('click', function(event) {

  event.preventDefault();

  clear();

  var queryURL = buildQueryURL();

   
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(updatePage);
      
      });
      // console.log(response);
    










// });

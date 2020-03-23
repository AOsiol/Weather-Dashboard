
// var authKey = "&appid=75c9c3885f537245e3ffc95d9728c4b1";
var authKey = "75c9c3885f537245e3ffc95d9728c4b1";

function buildWeatherURL(location, apiKey){
  return "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + apiKey;
}

function buildForecastURL(location, apiKey){
  return "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=" + apiKey;
}

function buildUVURL(apiKey, coordLat, coordLon){
  return "https://api.openweathermap.org/data/2.5/uvi?" + "&lat=" + coordLat + "&lon=" + coordLon + "&appid=" + apiKey;
}

var weatherData, uvData, fiveDayData;

$('#search-btn').on('click', function (event) {

  event.preventDefault();
  var location = $('#search-input').val();
  $('#search-input').val("");

  // Calling series of 3 api in promise chain
  callAPI(buildForecastURL(location, authKey))
  .then(function(resp){
    console.log("five day output", resp);
    fiveDayData = resp;
  })
  callAPI(buildWeatherURL(location, authKey))
  .then(function (resp){
    console.log("weather output", resp);
    weatherData = resp;
    var coordLon = resp.coord.lon;
    var coordLat = resp.coord.lat;
    callAPI(buildUVURL(authKey, coordLat, coordLon))
    .then(function(resp){
      console.log("uv output", resp);
      uvData = resp;   
    })
  });
 });

function callAPI(URL) {
  return $.ajax({
    url: URL,
    method: "GET"
  });
}



var authKey = "75c9c3885f537245e3ffc95d9728c4b1";

function buildWeatherURL(location, apiKey) {
  return "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + apiKey;
}

function buildForecastURL(location, apiKey) {
  return "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=" + apiKey;
}

function buildUVURL(apiKey, coordLat, coordLon) {
  return "https://api.openweathermap.org/data/2.5/uvi?" + "&lat=" + coordLat + "&lon=" + coordLon + "&appid=" + apiKey;
}

var fiveDayData, weatherData, uvData;

$('#search-btn').on('click', function (event) {

  event.preventDefault();
  var location = $('#search-input').val();
  $('#search-input').val("");

  // Calling series of 3 api in promise chain
  callAPI(buildForecastURL(location, authKey))
    .then(function (resp) {
      console.log("five day output", resp);
      fiveDayData = resp;
    })
  callAPI(buildWeatherURL(location, authKey))
    .then(function (resp) {
      console.log("weather output", resp);
      weatherData = resp;
      var coordLon = resp.coord.lon;
      var coordLat = resp.coord.lat;
      callAPI(buildUVURL(authKey, coordLat, coordLon))
        .then(function (resp) {
          console.log("uv output", resp);
          uvData = resp;
          bindDataToDocument();
        })
    });
});

function callAPI(URL) {
  return $.ajax({                                         
    url: URL,
    method: "GET"
  })
}

function bindDataToDocument(){

  for (let i = 0; i < fiveDayData.list.length; i++) {
    if(fiveDayData.list[i].dt_txt.indexOf("12:00:00") !== -1){
    // DOM Forecast
      var forecastDate = (fiveDayData.list[i].dt_txt);
      $('#forecast').append(fiveDayData.list[i].dt_txt);
      var forecastIcon = (fiveDayData.list[i].weather[0].icon);
      var forecastTemp = (fiveDayData.list[i].main.temp);
      var forecastHum = (fiveDayData.list[i].main.humidity); 
    }
  }
   // DOM Current Weather
var iconcode = weatherData.weather[0].icon;
var iconurl = "http://openweathermap.org/img/w/"+ iconcode + ".png";
var sec = uvData.date;
var date = sec*1000;
// var timestr = date.toLocaleTimeString();

  $('#location').append(weatherData.name, date);
  $('#wicon').attr('src', iconurl);
  $('#temp').append('temperature: '+weatherData.main.temp);
  $('#humidity').append('humidity: '+weatherData.main.humidity);
  $('#windspeed').append('wind speed: '+weatherData.wind.speed);
  $('#uv-index').append('uv index: '+uvData.value);
    
}


// $('#location').append(weatherData.name, uvData.date_iso);


        


    


    

    
  
    

  

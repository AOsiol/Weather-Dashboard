Weather Dashboard

This is an interactive webpage for the user to get weather data.

The user inputs a location in the search box and the page returns the name of the location, date, temperature, humidity, windspeed and uv index. This also returns a five day forecast that includes the date, icon for the weather,temperature and humditiy.

This project requires an ajax call and JSON return. The desired data had to be isolated from the returning data from the api and displayed using javascript to modify the DOM. There were a few challenges with this api call, especially concerning having to make a promise chain. The call to get the info for the uv index was dependent on the coordinates returned from getting the local weather.
Also displayed are two differnt approaches to modifying the html with javascript. One example is inserting the data within a template iteral in the js file and the other is directing the info individually using indepentent ids.

Improvements will include more work on the css so the return information is in a more readable display, and the date between the current and forecasts consistant. And have the local memory display the past searches in the dropdown.


// check local storage to see if the user has searched cities previously (last city searched should be displayed like you just searched it)
// when the user clicks on the search button
var searchHistory = JSON.parse(localStorage.getItem("search-history"));
if (searchHistory === null) {
  searchHistory = []
}
renderSearchHistory();
function renderSearchHistory() {
  $("#search-history").empty();
  for (var i = 0; i < searchHistory.length; i++) {
    var button = $("<button type='button' class='btn btn-primary'>").text(
      searchHistory[i]
    );
    $("#search-history").append(button);
  }
}
$("#searchBar").on("click", function(event){
    event.preventDefault();
    var weather = $("#searchVal").val().trim()
    searchHistory.unshift(weather);
    while (searchHistory.length > 10){
        searchHistory.pop();
    }
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    renderSearchHistory();
    $("#cityName").empty();
    $("#currentWeather").empty();
    $("#windSpeed").empty();
    
 
    

    var APIkey = "d78d56992b64fee08af8eaafb0a5c15e"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="  + weather + "&appid=" + APIkey 
    // then the browser connects with the weather API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
     
        // create div to contain all elements 
        
        // based on the city the user entered 
        // store the city name as a variable
        var cityName = response.name
        // add the city name to an h1 tag
        $("<h1>").text(cityName)
        // append the city name to the div
        
        $("#cityName").text("City: ").append(cityName)
        // store the weather as a variable
        var currentWeather = (response.main.temp) - 273.15 * (9/5) + 32 
        // add the weather to an h1 tag
        $("<h1>").text(currentWeather)
        // append the weather to the div
        $("#currentWeather").text("Temperature: ").append(currentWeather)
        // store the wind speed in a vari spped to a h6able
        var windSpeed = response.wind.speed
        // add the wind tag
        $("<h1>").text(windSpeed)
        // sappend the wind spped to the div
        $("#windSpeed").text("Wind Speed: ").append(windSpeed)
        // store the UV index as a variable
        var lon = response.coord.lon
        var lat = response.coord.lat
        console.log(lat)
        $.ajax({
            url: "https://api.openweathermap.org/v3/uvi/" + lat + lon + "/current.json?appid=" + APIkey,
            method: "GET"
        }).then(function(review){
            console.log(review)
            
        })
 
    })
    
    
    })
    

// add the uv index to a h6 tag
// append the UV index to the div
            // if the UV index >6, set class to make color red
            // else if UV undex < 3, set class to make color green
            // else set class to make it yellow



// get 5 day forecast information 
//  store it in a variable
// for each day in the  5 day forecast (for looop through forecast.data.length)
// create an element with

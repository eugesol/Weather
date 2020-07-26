var APIKey = "ce83252be18376c8f9fac4b5d38d5a0c";
var city = "Atlanta";
var lat = "";
var lng = "";
var citiesArray = [];
var now = moment()

$("#search").on("click", function () {
    event.preventDefault();
    city = $("#inputCity").val();
    currentWeather();
})



function currentWeather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("response:", response);
        $("#cityName").text(response.name);
        $("#date").text(now.format('dddd MMMM Do YYYY'))
        saveCities(response);
        console.log(citiesArray);
        lat = response.coord.lat;
        lng = response.coord.lon;
        $("#forecast").empty();
        oneCall();

    });

}

function oneCall() {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("oneCallResponse:", response);
        var iconcode = response.current.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/" + iconcode + ".png";
        var temp = Math.floor((response.current.temp - 273.15) * 1.80 + 32);
        $("#icon").attr("src", iconURL)
        $("#temp").text("Temperature: " + temp);
        $("#humid").text("Humidity: " + response.current.humidity);
        $("#wind").text("Wind Speed: " + response.current.wind_speed);
        $("#uvi").text("UV Index: " + response.current.uvi);
        displayBtns();
        $(".cityBtn").on("click", function () {
            event.preventDefault();
            city = $(this).text();
            currentWeather();
            console.log($(this).text())
            console.log("click")
        });
        for (i = 1; i < 6; i++) {
            var dayCard = $("#forecast")
            var iconcode = response.daily[i].weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + iconcode + ".png";
            var temp = Math.floor((response.daily[i].temp.day - 273.15) * 1.80 + 32);
            dayCard.append(`
            <div class="card text-white bg-primary mb-3" id="fiveDay"  style="max-width: 13rem;">
                <div class="card-header">${now.add(i,"days").format("dddd MMMM Do")}</div>
                <div class="card-body">
                <img src=" ${iconURL}">
                <p class="card-text" id="temp">Temperature: ${temp}</p>
                <p class="card-text" id="humid">Humidity: ${response.daily[i].humidity}</p>
                </div>
            </div>
            `)
        }
    });
}

function saveCities(object) {
    if (citiesArray.includes(object.name)) {
        return;
    } else {
        citiesArray.push(object.name)
    }
}

function displayBtns() {
    var btnArea = $(".btnGroup");
    btnArea.empty();
    citiesArray.forEach(element => {
        var cityBtn = $("<button class='cityBtn btn btn-primary btn-lg btn-block'>")
        cityBtn.text(element);
        btnArea.append(cityBtn);
        console.log(element);

    })

}


var APIKey = "ce83252be18376c8f9fac4b5d38d5a0c";
var city = "Atlanta";
var lat = "";
var lng = "";
var citiesArray = ["Atlanta"]

$("#search").on("click",function(){
    event.preventDefault();
    city = $("#inputCity").val();
    currentWeather();
})

function currentWeather(){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log("response:", response);
            $("#cityName").text(response.name);
            saveCities(response);
            displayBtns();
            console.log(citiesArray);
            lat = response.coord.lat;
            lng = response.coord.lon;
            oneCall();
        });

}

function oneCall(){

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("oneCallResponse:", response);
        var temp = Math.floor((response.current.temp - 273.15) * 1.80 + 32);
        $("#temp").text("Temperature: " + temp);
    });
}

function saveCities(object){
    if (citiesArray.includes(object.name)){
        return;
    }else{
        citiesArray.push(object.name)
    }
}   

function displayBtns(){
    var btnArea = $(".btn-group-vertical");
    btnArea.empty();
    citiesArray.forEach(element => {
        var cityBtn = $("<button class='cityBtn btn btn-primary'>")
        cityBtn.text(element);
        btnArea.append(cityBtn);
    })
}

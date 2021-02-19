//OpenWeatherMap API
const api = '*****';

const loc = document.querySelector('#location');
const iconImage = document.getElementById('icon');
const forecast = document.querySelector('#info');
const temp = document.querySelector('#actual_temp');
const search = document.getElementById("input_ciudad");
const search_image = document.getElementById("search_city");
const forecast_days = document.getElementById("container-days"); 

window.addEventListener("load", () => {
    let long;
    let lat;
    //Geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            //Catch coordinates
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const data = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            const data_days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${api}&units=metric`;

            fetch(data).then((response) => {
                return response.json();
            }).then((weather_data) => {
                fetch(data_days).then((response) => {
                    return response.json();
                }).then((days_data) => {
                    show_weather(weather_data, days_data);
                });
            });
        });
    }
});

//Search city manually
search.addEventListener("keyup", (event) => {
    let city_name = search.value;
    if(event.key === "Enter"){
        event.preventDefault();

        const data = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api}&units=metric`;

        fetch(data).then((response) => {
            return response.json();
        }).then((weather_data) => {
            var lat = weather_data.coord.lat;
            var long = weather_data.coord.lon;
            const data_days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${api}&units=metric`;
            fetch(data_days).then((response) => {
                return response.json();
            }).then((days_data) => {
                show_weather(weather_data, days_data);
            });
        });
    }
});

//Display weather info
function show_weather(weather_data, days_data){
    //Hide search bar when location is enabled
    pa = search.parentNode;
    pa.removeChild(search);
    pad = search_image.parentNode;
    pad.removeChild(search_image);
    //Current weather info
    const a_temp = weather_data.main.temp;
    const city = weather_data.name;
    const desc = weather_data.weather[0].main;
    const icon_id = weather_data.weather[0].icon;
    switch(icon_id){
        case '01d': iconImage.src = "img/clear_sky.png"; break;
        case '02d': iconImage.src = "img/clouds_sun.png"; break;
        case '03d': iconImage.src = "img/few_clouds.png"; break;
        case '04d': iconImage.src = "img/clouds.png"; break;
        case '09d': iconImage.src = "img/rain.png"; break;
        case '10d': iconImage.src = "img/rain_sun.png"; break;
        case '11d': iconImage.src = "img/thunder.png"; break;
        case '13d': iconImage.src = "img/snow.png"; break;
        case '50d': iconImage.src = "img/fog.png"; break;
        case '01n': iconImage.src = "img/clear_sky_n.png"; break;
        case '02n': iconImage.src = "img/clouds_moon.png"; break;
        case '03n': iconImage.src = "img/few_clouds.png"; break;
        case '04n': iconImage.src = "img/clouds.png"; break;
        case '09n': iconImage.src = "img/rain.png"; break;
        case '10n': iconImage.src = "img/rain_n.png"; break;
        case '11n': iconImage.src = "img/thunder.png"; break;
        case '13n': iconImage.src = "img/snow.png"; break;
        case '50n': iconImage.src = "img/fog.png"; break;
    }
    loc.textContent = `Actually's Forecast for ${city}`;
    forecast.textContent = `${desc}`;
    temp.textContent = `${a_temp.toFixed(0)}°C`;

    //Forecast
    days_data.daily.forEach(element => {
        var week_day = new Date(element.dt * 1000).toLocaleString("en-US", {weekday: "long"});
        var day_box = document.createElement("li"); //Create new list element

        var day_box_name = document.createElement("p"); //Create p element
        var name = document.createTextNode(week_day);
        day_box_name.appendChild(name); //Add day name to p
        day_box.appendChild(day_box_name); //Add p to li

        var weather_box = document.createElement("img");
        switch(element.weather[0].icon){
            case '01d': weather_box.src = "img/clear_sky.png"; break;
            case '02d': weather_box.src = "img/clouds_sun.png"; break;
            case '03d': weather_box.src = "img/few_clouds.png"; break;
            case '04d': weather_box.src = "img/clouds.png"; break;
            case '09d': weather_box.src = "img/rain.png"; break;
            case '10d': weather_box.src = "img/rain_sun.png"; break;
            case '11d': weather_box.src = "img/thunder.png"; break;
            case '13d': weather_box.src = "img/snow.png"; break;
            case '50d': weather_box.src = "img/fog.png"; break;
            case '01n': weather_box.src = "img/clear_sky_n.png"; break;
            case '02n': weather_box.src = "img/clouds_moon.png"; break;
            case '03n': weather_box.src = "img/few_clouds.png"; break;
            case '04n': weather_box.src = "img/clouds.png"; break;
            case '09n': weather_box.src = "img/rain.png"; break;
            case '10n': weather_box.src = "img/rain_n.png"; break;
            case '11n': weather_box.src = "img/thunder.png"; break;
            case '13n': weather_box.src = "img/snow.png"; break;
            case '50n': weather_boxsrc = "img/fog.png"; break;
        }
        day_box.appendChild(weather_box);

        var condition_box_name = document.createElement("p"); //Create p element
        var condition = document.createTextNode(element.weather[0].main);
        condition_box_name.appendChild(condition); //Add day name to p
        day_box.appendChild(condition_box_name); //Add p to li

        var temps_names = document.createElement("div");
        temps_names.setAttribute("id", "temps_box");
        var temp_min_name = document.createElement("p");
        temp_min_name.setAttribute("id", "min_temp");
        var min_name = document.createTextNode("Min:");
        temp_min_name.appendChild(min_name);
        temps_names.appendChild(temp_min_name);
        day_box.appendChild(temps_names);
        var temp_max_name = document.createElement("p");
        temp_max_name.setAttribute("id", "max_temp");
        var max_name = document.createTextNode("Max:");
        temp_max_name.appendChild(max_name);
        temps_names.appendChild(temp_max_name);
        day_box.appendChild(temps_names);

        var temps = document.createElement("div");
        var temp_min = document.createElement("p");
        temp_min.setAttribute("id", "min_temp");
        var min = document.createTextNode(element.temp.min.toFixed(0) + "°C");
        temp_min.appendChild(min);
        temps.appendChild(temp_min);
        var temp_max = document.createElement("p");
        temp_max.setAttribute("id", "max_temp");
        var max = document.createTextNode(element.temp.max.toFixed(0) + "°C");
        temp_max.appendChild(max);
        temps.appendChild(temp_max);
        day_box.appendChild(temps);

        forecast_days.appendChild(day_box); //Add li to ul
    })

}
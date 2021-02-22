//OpenWeatherMap API
const api = '*****';

const weather_info = document.getElementById("weather-info");
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
    var a_temp = weather_data.main.temp;
    var city = weather_data.name;
    var desc = weather_data.weather[0].main;
    var icon_id = weather_data.weather[0].icon;

    var c_weather_box = document.createElement("div");
    c_weather_box.setAttribute("id", "title");
    weather_info.appendChild(c_weather_box);

    var c_conditions_elem = document.createElement("p");
    c_conditions_elem.setAttribute("id", "location");
    var location = document.createTextNode("Actually's Forecast for " + city);
    c_conditions_elem.appendChild(location);
    c_weather_box.appendChild(c_conditions_elem);
    
    var c_conditions_img = document.createElement("img");
    c_conditions_img.setAttribute("id", "icon");
    switch(icon_id){
        case '01d': c_conditions_img.src = "img/clear_sky.png"; break;
        case '02d': c_conditions_img.src = "img/clouds_sun.png"; break;
        case '03d': c_conditions_img.src = "img/few_clouds.png"; break;
        case '04d': c_conditions_img.src = "img/clouds.png"; break;
        case '09d': c_conditions_img.src = "img/rain.png"; break;
        case '10d': c_conditions_img.src = "img/rain_sun.png"; break;
        case '11d': c_conditions_img.src = "img/thunder.png"; break;
        case '13d': c_conditions_img.src = "img/snow.png"; break;
        case '50d': c_conditions_img.src = "img/fog.png"; break;
        case '01n': c_conditions_img.src = "img/clear_sky_n.png"; break;
        case '02n': c_conditions_img.src = "img/clouds_moon.png"; break;
        case '03n': c_conditions_img.src = "img/few_clouds.png"; break;
        case '04n': c_conditions_img.src = "img/clouds.png"; break;
        case '09n': c_conditions_img.src = "img/rain.png"; break;
        case '10n': c_conditions_img.src = "img/rain_n.png"; break;
        case '11n': c_conditions_img.src = "img/thunder.png"; break;
        case '13n': iconc_conditions_imgImage.src = "img/snow.png"; break;
        case '50n': c_conditions_img.src = "img/fog.png"; break;
    }
    c_weather_box.appendChild(c_conditions_img);

    var c_conditions_info = document.createElement("p");
    c_conditions_info.setAttribute("id", "info");
    var cond = document.createTextNode(desc);
    c_conditions_info.appendChild(cond);
    c_weather_box.appendChild(c_conditions_info);

    var c_conditions_temp = document.createElement("p");
    c_conditions_temp.setAttribute("id", "actual_temp");
    var c_temp = document.createTextNode(a_temp.toFixed(0)+"°C");
    c_conditions_temp.appendChild(c_temp);
    c_weather_box.appendChild(c_conditions_temp);

    //Extra information
    var c_extra_box = document.createElement("div");
    c_extra_box.setAttribute("id", "extra-info");
    weather_info.appendChild(c_extra_box);

    var c_extra_info = document.createElement("p");
    c_extra_info.setAttribute("id", "info");
    var c_wind_img = document.createElement("img");
    c_wind_img.setAttribute("id", "icon_extra");
    c_wind_img.src = "img/windsock.png";
    c_extra_info.appendChild(c_wind_img);
    var wind = document.createTextNode("Wind: " + days_data.current.wind_speed.toFixed(0) + " m/s");
    c_extra_info.appendChild(wind);
    c_extra_box.appendChild(c_extra_info);


    var c_extra_humidity = document.createElement("p");
    c_extra_humidity.setAttribute("id", "info");
    var c_hum_img = document.createElement("img");
    c_hum_img.setAttribute("id", "icon_extra");
    c_hum_img.src = "img/humidity.png";
    c_extra_humidity.appendChild(c_hum_img);
    var humidity = document.createTextNode("Humidity: " + days_data.current.humidity + "%");
    c_extra_humidity.appendChild(humidity);
    c_extra_box.appendChild(c_extra_humidity);

    var c_extra_sunrise = document.createElement("p");
    c_extra_sunrise.setAttribute("id", "info");
    var c_sunr_img = document.createElement("img");
    c_sunr_img.setAttribute("id", "icon_extra");
    c_sunr_img.src = "img/sunrise.png";
    c_extra_sunrise.appendChild(c_sunr_img);
    var sunrise_date = new Date(days_data.current.sunrise * 1000);
    var sunrise_min = sunrise_date.getMinutes() < 10 ? '0' + sunrise_date.getMinutes() : sunrise_date.getMinutes();
    var sunrise_hour = sunrise_date.getHours() < 10 ? '0' + sunrise_date.getHours() : sunrise_date.getHours();
    var sunrise = document.createTextNode("Sunrise: " + sunrise_hour + ":" + sunrise_min);
    c_extra_sunrise.appendChild(sunrise);
    c_extra_box.appendChild(c_extra_sunrise);

    var c_extra_sunset = document.createElement("p");
    c_extra_sunset.setAttribute("id", "info");
    var c_suns_img = document.createElement("img");
    c_suns_img.setAttribute("id", "icon_extra");
    c_suns_img.src = "img/sunset.png";
    c_extra_sunset.appendChild(c_suns_img);
    var sunset_date = new Date(days_data.current.sunset * 1000);
    var sunset_min = sunset_date.getMinutes() < 10 ? '0' + sunset_date.getMinutes() : sunset_date.getMinutes();
    var sunset_hour = sunset_date.getHours() < 10 ? '0' + sunset_date.getHours() : sunset_date.getHours();
    var sunset = document.createTextNode("Sunset: " + sunset_hour + ":" + sunset_min);
    c_extra_sunset.appendChild(sunset);
    c_extra_box.appendChild(c_extra_sunset);

    var c_extra_time = document.createElement("p");
    c_extra_time.setAttribute("id", "info");
    var c_time_img = document.createElement("img");
    c_time_img.setAttribute("id", "icon_extra");
    c_time_img.src = "img/timezone.png";
    c_extra_time.appendChild(c_time_img);
    var extra_time = new Date(days_data.current.dt * 1000);
    var time_min = extra_time.getMinutes() < 10 ? '0' + extra_time.getMinutes() : extra_time.getMinutes();
    var time_hour = extra_time.getHours() < 10 ? '0' + extra_time.getHours() : extra_time.getHours();
    var time = document.createTextNode("Time: " + time_hour + ":" + time_min);
    c_extra_time.appendChild(time);
    c_extra_box.appendChild(c_extra_time);

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

        var condition_box_name = document.createElement("p");
        var condition = document.createTextNode(element.weather[0].main);
        condition_box_name.appendChild(condition);
        day_box.appendChild(condition_box_name); 

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

        forecast_days.appendChild(day_box);
    })
}
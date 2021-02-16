//OpenWeatherMap API
const api = '*****';

const loc = document.querySelector('#location');
const iconImage = document.getElementById('icon');
const forecast = document.querySelector('#info');
const temp = document.querySelector('#actual_temp');


window.addEventListener("load", () => {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const data = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

            fetch(data).then((response) => {
                return response.json();
            }).then((weather_data) => {
                const a_temp = weather_data.main.temp;
                const city = weather_data.name;
                const desc = weather_data.weather[0].main;
                const icon_id = weather_data.weather[0].icon;
                console.log(weather_data.weather[0].icon);
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
            });
        });
    }
});
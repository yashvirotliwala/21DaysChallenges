// script.js

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const apiKey = "a389bd5a6d85eae06c8bbe2a8aad8285"; 


// Search button click
searchBtn.addEventListener("click", getWeather);

// Enter key press
cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherDisplay.innerHTML = `
            <div class="error-message">⚠ Please enter city name</div>
        `;
        return;
    }

    weatherDisplay.innerHTML = `
        <div class="loading-message">✨ loading celestial data ...</div>
    `;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (Number(data.cod) !== 200) {
            weatherDisplay.innerHTML = `
                <div class="error-message">❌ ${data.message}</div>
            `;
            return;
        }

        showWeather(data);

    } catch (error) {
        weatherDisplay.innerHTML = `
            <div class="error-message">⚠ Something went wrong</div>
        `;
    }
}

// Display Weather Data
function showWeather(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const condition = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherDisplay.innerHTML = `
        <div class="city-name">
            ${cityName} <span>${country}</span>
        </div>

        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

        <div class="temp">${temp}°C</div>

        <div class="condition">${condition}</div>

        <div class="details">
            <div class="detail-item">
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${humidity}%</div>
            </div>

            <div class="detail-item">
                <div class="detail-label">Wind</div>
                <div class="detail-value">${wind} km/h</div>
            </div>
        </div>

        <div class="feels-like">
            Feels Like ${feelsLike}°C
        </div>
    `;
}
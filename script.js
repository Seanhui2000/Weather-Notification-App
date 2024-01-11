const apiKey = 'Update-Later';
const city = 'West Covina';

function getWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = 'Error fetching weather data';
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;

    const output = `Average Temperature: ${temperature}°C<br>Conditions: ${conditions}`;
    weatherInfo.innerHTML = output;
}

// Initial call to display weather when the page loads
getWeather();

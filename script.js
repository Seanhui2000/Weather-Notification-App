const apiKey = 'YOUR_API';
const city = 'West Covina';

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'YOUR_ID',
    secretAccessKey: 'YOUR_KEY',
    region: 'YOUR_AWS_REGION'
});

const sns = new AWS.SNS();

function sendSMS(message) {
    const params = {
        Message: message,
        PhoneNumber: 'RECIPIENT_PHONE_NUMBER' // Replace with your iPhone number
    };

    sns.publish(params, (err, data) => {
        if (err) {
            console.error('Error sending SMS:', err);
        } else {
            console.log('SMS sent:', data.MessageId);
        }
    });
}

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
    const temperatureCelsius = data.main.temp;
    const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    const conditions = data.weather[0].description;

    let message = '';

    switch (conditions.toLowerCase()) {
        case 'clear sky':
            message = `Weather Condition: ${conditions}<br>No need to worry!`;
            break;
        case 'overcast clouds':
            message = `Weather Condition: ${conditions}<br>Bring a jacket!`;
            break;
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'light thunderstorm':
        case 'thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
        case 'thunderstorm with light drizzle':
        case 'thunderstorm with drizzle':
        case 'thunderstorm with heavy drizzle':
            message = `Weather Condition: ${conditions}<br>Be careful driving!`;
            break;
        case 'light intensity drizzle':
        case 'drizzle':
        case 'heavy intensity drizzle':
        case 'light intensity drizzle rain':
        case 'drizzle rain':
        case 'heavy intensity drizzle rain':
        case 'shower rain and drizzle':
        case 'heavy shower rain and drizzle':
        case 'shower drizzle':
            message = `Weather Condition: ${conditions}<br>Maybe bring an umbrella!`;
            break;
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain':
        case 'freezing rain':
        case 'light intensity shower rain':
        case 'shower rain':
        case 'heavy intensity shower rain':
        case 'ragged shower rain':
            message = `Weather Condition: ${conditions}<br>Bring an umbrella!`;
            break;
        case 'light snow':
        case 'snow':
        case 'heavy snow':
        case 'sleet':
        case 'light shower sleet':
        case 'shower sleet':
        case 'light rain and snow':
        case 'rain and snow':
        case 'light shower snow':
        case 'shower snow':
        case 'heavy shower snow':
            message = `Weather Condition: ${conditions}<br>You must not be in California if it's snowing!`;
            break;
        default:
            message = `Weather Condition: ${conditions}`;
    }

    const output = `Average Temperature: ${temperatureFahrenheit.toFixed(2)}°F<br>${message}`;
    weatherInfo.innerHTML = output;
}



// Initial call to display weather when the page loads
getWeather();

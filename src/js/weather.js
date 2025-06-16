
async function fetchWeatherData() {
    const lat = 59.4370;
    const lon = 24.7536;
    
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe/Tallinn`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const weatherData = await response.json();
        updateWeatherCard(weatherData.current_weather);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showFallbackWeather();
    }
}

function updateWeatherCard(data) {
    const tempElement = document.getElementById('weather-temp');
    const descElement = document.getElementById('weather-description');
    const iconElement = document.getElementById('weather-icon');
    
    tempElement.textContent = `${Math.round(data.temperature)}°C`;
    
    const description = getWeatherDescription(data.weathercode);
    descElement.textContent = description;
    
    updateWeatherIcon(data.weathercode);
}

function getWeatherDescription(weathercode) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        80: 'Light rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers'
    };
    
    return descriptions[weathercode] || 'Unknown';
}

function updateWeatherIcon(weathercode) {
    const iconElement = document.getElementById('weather-icon');

    if (weathercode === 0 || weathercode === 1) {
        iconElement.src = 'assets/sun.png';
    } else if (weathercode >= 2 && weathercode <= 3) {
        iconElement.src = 'assets/cloud.png';
    } else if (weathercode >= 51 && weathercode <= 82) {
        iconElement.src = 'assets/rainy.png';
    } else if (weathercode >= 71 && weathercode <= 75) {
        iconElement.src = 'assets/snow.png';
    } else {
        iconElement.src = 'assets/sun.png';
    }
}

function showFallbackWeather() {
    document.getElementById('weather-temp').textContent = '2°C';
    document.getElementById('weather-description').textContent = 'Partly cloudy';
}

document.addEventListener('DOMContentLoaded', fetchWeatherData);
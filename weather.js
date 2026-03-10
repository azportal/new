// Hava məlumatını al
async function getWeather() {
  try {
    // Ziyarətçinin şəhərini al
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    const city = geoData.city || 'Baku';
    const country = geoData.country_code || 'AZ';
    const lat = geoData.latitude;
    const lon = geoData.longitude;

    // OpenWeatherMap API-dən hava məlumatı al
    const apiKey = '85a4e3c55f1d4c9e8b8e8b8e8b8e8b8e'; // Demo key
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=az&appid=${apiKey}`
    );
    const weatherData = await weatherResponse.json();

    if (weatherData.cod === 200) {
      return {
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        windSpeed: Math.round(weatherData.wind.speed),
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        clouds: weatherData.clouds.all,
        visibility: Math.round(weatherData.visibility / 1000)
      };
    }
    return null;
  } catch (error) {
    console.error('Hava məlumatları alınarkən xəta:', error);
    return null;
  }
}

// Hava məlumatlarını göstər
async function displayWeather() {
  const weatherContainer = document.getElementById('weather-info');
  if (!weatherContainer) return;

  weatherContainer.innerHTML = `<p>${t('loading')}</p>`;

  const weather = await getWeather();
  if (!weather) {
    weatherContainer.innerHTML = `<p>${t('error')}</p>`;
    return;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  weatherContainer.innerHTML = `
    <div class="weather-card">
      <div class="weather-header">
        <h3>${weather.city}, ${weather.country}</h3>
        <img src="${iconUrl}" alt="${weather.description}" class="weather-icon">
      </div>
      <div class="weather-main">
        <div class="temperature">
          <span class="temp-value">${weather.temperature}°C</span>
          <span class="temp-desc">${weather.description}</span>
        </div>
      </div>
      <div class="weather-details">
        <div class="detail-item">
          <span class="label">${t('temperature')}:</span>
          <span class="value">${weather.temperature}°C</span>
        </div>
        <div class="detail-item">
          <span class="label">Hiss edir:</span>
          <span class="value">${weather.feelsLike}°C</span>
        </div>
        <div class="detail-item">
          <span class="label">${t('humidity')}:</span>
          <span class="value">%${weather.humidity}</span>
        </div>
        <div class="detail-item">
          <span class="label">Təzyiq:</span>
          <span class="value">${weather.pressure} hPa</span>
        </div>
        <div class="detail-item">
          <span class="label">${t('wind')}:</span>
          <span class="value">${weather.windSpeed} m/s</span>
        </div>
        <div class="detail-item">
          <span class="label">Görünüş:</span>
          <span class="value">${weather.visibility} km</span>
        </div>
        <div class="detail-item">
          <span class="label">Bulutlar:</span>
          <span class="value">%${weather.clouds}</span>
        </div>
      </div>
    </div>
  `;
}

// Sayfayı yükle
document.addEventListener('DOMContentLoaded', displayWeather);

// Hər 30 dəqiqədə güncəllə
setInterval(displayWeather, 30 * 60 * 1000);

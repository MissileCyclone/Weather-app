<template>
  <div class="weather">
    <input v-model="city" @change="fetchWeather" placeholder="Введите город" />
    <h2>Погода в {{ city }}</h2>
    <!-- Список избранных городов -->
    <ul>
      <li v-for="favorite in favoriteCities" :key="favorite">{{ favorite }}</li>
    </ul>
    <p>Температура: {{ weather.temp }}°{{ unit }}</p>
    <p>Описание: {{ weather.description }}</p>
    <img :src="weather.iconUrl" alt="Weather icon" />
    <p>Влажность: {{ weather.humidity }}%</p>
    <p>Давление: {{ weather.pressure }} hPa</p>
    <p>Ветер: {{ weather.windSpeed }} м/с, направление: {{ weather.windDirection }}°</p>
    

    <!-- Переключатель единиц измерения -->
    <div>
      <label>
        <input type="radio" v-model="unit" value="C" @change="fetchWeather" /> Цельсий
      </label>
      <label>
        <input type="radio" v-model="unit" value="F" @change="fetchWeather" /> Фаренгейт
      </label>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
  return {
    city: 'Moscow',
    unit: 'C',
    weather: {},
    favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || [] // получаем из localStorage
  };
},
  methods: {
  addToFavorites() {
    if (!this.favoriteCities.includes(this.city)) {
      this.favoriteCities.push(this.city);
      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities)); // сохраняем в localStorage
    }
  },
  async fetchWeather() {
    const apiKey = process.env.VUE_APP_API_KEY;
    const units = this.unit === 'C' ? 'metric' : 'imperial';
    const url = `${process.env.VUE_APP_BASE_URL}weather?q=${this.city}&units=${units}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      this.weather = {
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        windDirection: response.data.wind.deg
      };
      this.addToFavorites(); // добавляем город в избранное
    } catch (error) {
      console.error('Ошибка получения данных:', error);
    }
  }
},
  mounted() {
    this.fetchWeather(); // загружаем погоду сразу при старте
  }
};
</script>

<style>
.weather {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

h2 {
  color: #444;
}
</style>
<template>
  <div id="app">
    <WeatherDisplay />
  </div>
</template>

<script>
import WeatherDisplay from './components/WeatherDisplay.vue';

export default {
  components: {
    WeatherDisplay
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 20px;
}
</style>
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    weather: 'Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    pressure: 'Pressure',
    wind: 'Wind'
  },
  ru: {
    weather: 'Погода',
    temperature: 'Температура',
    humidity: 'Влажность',
    pressure: 'Давление',
    wind: 'Ветер'
  }
};

const i18n = createI18n({
  locale: 'en',
  messages
});

export default i18n;
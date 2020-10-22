import Api from '@/services/OpenWeather/Api';
const appid = "3c536286980928a94f6181826bdf561d";

export default {
  async getMeteoDay(city) {
    return (
      Api().get(`weather`, {params: {q: city, appid: appid}})
      .catch(function (error) {
        return error;
      })
      )
    },
  async getMeteoWeek(city) {
    return (
      Api().get(`forecast`, {params: {q: city, appid: appid}})
      .catch(function (error) {
        return error;
      })
    );
  },
  kelvinToCelsius(temperature) {
    return Math.round(temperature - 273.15);
  }
}

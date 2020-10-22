import Api from '@/services/Amadeus/Api';

export default {
  async cheapestFlightsFrom(origin) {
    return (
      Api().get(`/shopping/flight-destinations`, {params: {origin: origin}})
      .catch(function (error) {
        return error;
      })
      )
    },
  async cheapestFlightsFromTo(origin, destination) {
    return (
      Api().get(`/shopping/flight-dates`, {params: {origin: origin, destination: destination}})
      .catch(function (error) {
        return error;
      })
    )
  }
}

<template>
  <widget v-if="isUserLoggedIn">
    <div id="openweather-current"></div>
  </widget>
</template>

<script>
import OpenWeatherService from "@/services/OpenWeather/OpenWeatherService";
import { mapState } from "vuex";
var OWS = OpenWeatherService;

const generateCurrentWeather = async (city) => {
  var response = await OWS.getMeteoDay(city),
    data = response.data,
    d = document,
    widget = document.getElementById("openweather-current");
  const p = d.createElement("p");

  if (response.status >= 200 && response.status < 400) {
    const t = d.createElement("table");
    var row = d.createElement("tr");
    var headCell = d.createElement("th");
    var cell = d.createElement("td");
    var nextRow, nextCell;

    var headRow = row.cloneNode();
    var head = headCell.cloneNode();
    head.textContent = `Weather for ${data.name}`;
    headRow.appendChild(head);
    t.appendChild(headRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Global weather: " + data.weather[0].description;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent =
      "Temperature: " + OWS.kelvinToCelsius(data.main.temp) + "°C";
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Wind speed: " + data.wind.speed;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Pressure: " + data.main.pressure + "hPa";
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Humidity: " + data.main.humidity + "%";
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    widget.appendChild(t);
  } else if (response.status === 404) {
    p.textContent =
      "I couldn't find your city! Either you spelled it wrong or I don't have it in my database.";
    widget.appendChild(p);
  } else {
    p.textContent =
      "An unexpected problem happened with the request. If the problem persist, please consult your administrator.";
    widget.appendChild(p);
  }
}

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "servicesUser", "route"])
  },
  methods: {
  },
  mounted() {
    generateCurrentWeather(this.servicesUser.townOpenWeather)
  },
  watch: {}
};
</script>

<style scoped></style>

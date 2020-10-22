<template>
  <widget v-if="isUserLoggedIn">
    <div id="openweather-week"></div>
  </widget>
</template>

<script>
import OpenWeatherService from "@/services/OpenWeather/OpenWeatherService";
import { mapState } from 'vuex';
var OWS = OpenWeatherService;

async function generateWeekWeather(city) {
  var response = await OWS.getMeteoWeek(city),
    data = response.data,
    d = document,
    widget = document.getElementById("openweather-week");
  const p = d.createElement('p');
 
  if (response.status >= 200 && response.status < 400) {
    const t = d.createElement("table");
    var row = d.createElement("tr");
    var headCell = d.createElement("th");
    var cell = d.createElement("td");
    var nextRow, nextCell;

    nextRow = row.cloneNode();
    nextCell = headCell.cloneNode();
    nextCell.textContent = `Weather for ${data.city.name}`;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = ` `;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `Today`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `Tomorrow`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `In three days`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `In four days`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `In five days`;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Global weather: ";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[0].weather[0].description;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[8].weather[0].description;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[16].weather[0].description;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[24].weather[0].description;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[32].weather[0].description;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Temperature: ";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = OWS.kelvinToCelsius(data.list[0].main.temp) + "°C";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = OWS.kelvinToCelsius(data.list[8].main.temp) + "°C";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = OWS.kelvinToCelsius(data.list[16].main.temp) + "°C";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = OWS.kelvinToCelsius(data.list[24].main.temp) + "°C";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = OWS.kelvinToCelsius(data.list[32].main.temp) + "°C";
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Wind speed: ";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[0].wind.speed;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[8].wind.speed;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[16].wind.speed;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[24].wind.speed;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[32].wind.speed;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Pressure: ";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[0].main.pressure + "hPa";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[8].main.pressure + "hPa";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[16].main.pressure + "hPa";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[24].main.pressure + "hPa";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[32].main.pressure + "hPa";
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = "Humidity: ";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[0].main.humidity + "%";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[8].main.humidity + "%";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[16].main.humidity + "%";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[24].main.humidity + "%";
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = data.list[32].main.humidity + "%";
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    widget.appendChild(t);
  } else if (response.status === 404) {
    p.textContent = "I couldn't find your city! Either you spelled it wrong or I don't have it in my database.";
    widget.appendChild(p);
  } else {
    p.textContent = "An unexpected problem happened with the request. If the problem persist, please consult your administrator."
    widget.appendChild(p);
  }
}

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "servicesUser", "route"])
  },
  methods: {
  },
  mounted() {
    generateWeekWeather(this.servicesUser.townOpenWeather);
  },
  watch: {
  }
}
</script>

<style scoped>

</style>

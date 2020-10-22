<template>
  <widget v-if="isUserLoggedIn">
  <v-text-field
            label="Cheapest flights from: MAD, LON, PAR..."
            v-model="searchFrom.origin"
            type="From"
            outline
            clearable
          >
    <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Chose your departure airport
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>location_city</v-icon>
              </v-fade-transition>
            </template>
  </v-text-field>
  <v-layout column class="mb-2" justify-center align-center>
            <v-layout class="mt-1" justify-center align-center row>
              <v-btn
                elevation-24
                large
                @click="regenSearchFrom"
                class="grey darken-1 font-weight-bold"
                >Search</v-btn
              >
            </v-layout>
          </v-layout>
  <div id="amadeus-searchFrom"></div>
  </widget>
</template>

<script>
import { mapState } from "vuex";
import AmadeusService from "@/services/Amadeus/AmadeusService";

async function generateSearchFrom(origin) {
  var response = await AmadeusService.cheapestFlightsFrom(origin),
    data = response.data,
    d = document,
    widget = document.getElementById("amadeus-searchFrom");
  const p = d.createElement('p');

  if (response.status >= 200 && response.status < 400) {
    const t = d.createElement("table");
    var row = d.createElement("tr");
    var headCell = d.createElement("th");
    var cell = d.createElement("td");
    var nextRow, nextCell;

    nextRow = row.cloneNode();
    nextCell = p.cloneNode();
    nextCell.textContent = `Cheapest flights from ${data.data[0].origin}`;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    nextRow = row.cloneNode();
    nextCell = cell.cloneNode();
    nextCell.textContent = `Destination`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `Departure date`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `Return date`;
    nextRow.appendChild(nextCell);
    nextCell = cell.cloneNode();
    nextCell.textContent = `Full price (in ${data.meta.currency})`;
    nextRow.appendChild(nextCell);
    t.appendChild(nextRow);

    for (let i = 0; i < 5; ++i) {
      nextRow = row.cloneNode();
      nextCell = cell.cloneNode();
      nextCell.textContent = data.data[i].destination;
      nextRow.appendChild(nextCell);
      nextCell = cell.cloneNode();
      nextCell.textContent = data.data[i].departureDate;
      nextRow.appendChild(nextCell);
      nextCell = cell.cloneNode();
      nextCell.textContent = data.data[i].returnDate;
      nextRow.appendChild(nextCell);
      nextCell = cell.cloneNode();
      nextCell.textContent = data.data[i].price.total;
      nextRow.appendChild(nextCell);
      t.appendChild(nextRow);
    }
  widget.appendChild(t);
  } else if (response.status === 404) {
    p.textContent = "I couldn't find your city! Either you spelled it wrong or I don't have it in my database.";
    widget.appendChild(p);
  } else {
    p.textContent = "An unexpected problem happened with the request. If the problem persists, please consult your administrator."
    widget.appendChild(p);
  }
}

export default {
  data() {
    return {
      searchFrom: {
        origin: null
      }
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route"])
  },
  methods: {
    async regenSearchFrom() {
      var origin = this.searchFrom.origin,
      searchContent = document.getElementById("amadeus-searchFrom");

      while (searchContent.firstChild) {
        searchContent.removeChild(searchContent.firstChild);
      }
      generateSearchFrom(origin);
    }
  },
  mounted() {
  },
  watch: {
  }
};
</script>

<style scoped>
</style>

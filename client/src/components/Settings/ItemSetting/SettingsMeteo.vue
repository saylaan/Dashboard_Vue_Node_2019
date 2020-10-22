<template>
  <v-layout v-on:keyup.enter="saveSettings">
    <v-flex xs12 md10>
      <panel v-if="isUserLoggedIn" title="Setting OpenWeather">
        <v-switch large color="red" v-model="active" label="Enable service">
          <template v-slot:prepend>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">help</v-icon>
              </template>
              Its for activate the service
            </v-tooltip>
          </template>
          <template v-slot:append>
            <v-fade-transition leave-absolute>
              <v-icon>widgets</v-icon>
            </v-fade-transition>
          </template>
        </v-switch>
        <form v-if="active" class="mt-2">
          <!-- <v-layout column class="mb-1" justify-center align-center>
            <v-btn
              v-if="!servicesUser.isUserLoggedInOpenWeather && active"
              :href="''"
              elevation-24
              large
              class="btn-openweather orange darken-1 mb-1 ml-3 font-weight-bold"
            >
              <p class="ml-4 text-openweather">Login OpenWeather</p>
            </v-btn>
          </v-layout> -->
          <v-text-field
            label="The town"
            v-model="openWeather.town"
            type="city"
            :rules="[required]"
            outline
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                For choosing the meteo city
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>location_city</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-layout column class="mb-2" justify-center align-center>
            <span class="danger-alert">{{ error }}</span>
            <v-layout class="mt-1" justify-center align-center row>
              <v-btn
                elevation-24
                large
                @click="saveSettings()"
                class="grey darken-1 font-weight-bold"
                >Save</v-btn
              >
              <v-layout column class="mb-1" justify-center align-center>
                <v-icon @click="undoSettings()">refresh</v-icon>
              </v-layout>
            </v-layout>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import crypto from "crypto";

import ServiceUser from "@/services/ApiAxios/Service/ServiceUser";
import Service from "@/services/ApiAxios/Service/Service";

export default {
  data() {
    return {
      servicesUsers: null,
      services: null,
      openWeather: {
        town: null
      },
      active: false,
      error: null,
      required: value => !!value || "Required."
    };
  },
  watch: {
    active: async function() {
      if (this.active) {
        if (!this.servicesActive.openWeather) {
          let response = (
            await ServiceUser.post({
              UserId: this.user.id,
              ServiceId: 1
            })
          ).data;
        }
        this.$store.dispatch("setServiceActiveOpenWeather", true);
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
      } else {
        this.$store.dispatch("setServiceUserTown", null);
        this.$store.dispatch("setServiceActiveOpenWeather", false);
        this.openWeather.town = null;
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 1) {
            let resp = (await ServiceUser.delete(data.id)).data;
          }
        });
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
      }
    }
  },
  computed: {
    ...mapState([
      "servicesUser",
      "servicesActive",
      "isUserLoggedIn",
      "user",
      "admin"
    ])
  },
  methods: {
    async saveSettings() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.openWeather).every(key => {
        if (key === "town") {
          return true;
        }
        return !!this.openWeather[key];
      });
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
      }
      this.$store.dispatch("setServiceUserTown", this.openWeather.town);
      this.servicesUsers.forEach(async data => {
        if (data.ServiceId === 1) {
          let newServiceUser = {
            id: data.id,
            ServiceId: data.ServiceId,
            UserId: data.UserId,
            data: this.openWeather.town
          };
          let respBis = await ServiceUser.put(newServiceUser);
        }
      });
    },
    async undoSettings() {
      try {
        this.$store.dispatch("setServiceUserTown", null);
        this.$store.dispatch("setServiceActiveOpenWeather", false);
        this.active = false;
        this.openWeather.town = null;
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 1) {
            let resp = (await ServiceUser.delete(data.id)).data;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie(name) {
      const username = this.getCookie(name);
      if (username !== "") {
        return true;
      } else {
        return false;
      }
    }
  },
  async mounted() {
    try {
      this.servicesUsers = (
        await ServiceUser.getUserService(this.user.id)
      ).data;
      if (this.servicesActive.openWeather) {
        this.active = true;
        if (this.servicesUser.townOpenWeather) {
          this.openWeather.town = this.servicesUser.townOpenWeather;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.btn-openweather {
  margin: spacing(0, 0, 1);
  display: flex;
  background-color: #dd4b39;
  height: 36px;
  cursor: pointer;
  text-decoration: none;
}
.wrapper-openweather {
  margin-top: 1px;
  margin-left: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 2px;
  background-color: #fff;
}
.icon-openweather {
  width: 18px;
  height: 18px;
}
.text-openweather {
  margin: 0 34px 0 0;
  color: #fff;
  font-size: 14px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  flex-grow: 1;
  text-align: center;
  align-self: center;
}
</style>

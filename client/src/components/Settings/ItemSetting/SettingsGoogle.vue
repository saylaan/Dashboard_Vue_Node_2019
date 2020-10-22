<template>
  <v-layout v-on:keyup.enter="saveSettings">
    <v-flex xs12 md10>
      <panel v-if="isUserLoggedIn" title="Setting Google">
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
          <v-layout column class="mb-1" justify-center align-center>
            <v-btn
              v-if="!servicesUser.isUserLoggedInGoogle && active"
              :href="'http://localhost:8080/auth/google'"
              elevation-24
              large
              class="btn-google orange darken-1 mb-1 ml-2 font-weight-bold"
            >
              <div class="wrapper-google">
                <svg
                  class="icon-google"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 533.5 544.3"
                >
                  <path
                    fill="#4285f4"
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  />
                  <path
                    fill="#34a853"
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  />
                  <path
                    fill="#fbbc04"
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  />
                  <path
                    fill="#ea4335"
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  />
                </svg>
              </div>
              <p class="ml-4 text-google">Login Google</p>
            </v-btn>
          </v-layout>
          <v-layout column class="mb-1" justify-center align-center>
            <v-icon @click="undoSettings()">refresh</v-icon>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

import ServiceUser from "@/services/ApiAxios/Service/ServiceUser";
import Service from "@/services/ApiAxios/Service/Service";

export default {
  data() {
    return {
      servicesUsers: null,
      services: null,
      active: false
    };
  },
  watch: {
    active: async function() {
      if (this.active) {
        if (!this.checkCookie("google") && !this.servicesActive.google) {
          let response = (
            await ServiceUser.post({
              UserId: this.user.id,
              ServiceId: 3
            })
          ).data;
        }
        this.$store.dispatch("setServiceActiveGoogle", true);
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
      } else {
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 3) {
            let resp = (await ServiceUser.delete(data.id)).data;
          }
        });
        this.$store.dispatch("setServiceActiveGoogle", false);
        this.$store.dispatch("setServiceUserGoogle", null, null);
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
        document.cookie =
          "google=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    async saveSettings() {},
    async undoSettings() {
      try {
        this.$store.dispatch("setServiceUserGoogle", null, null);
        this.$store.dispatch("setServiceActiveGoogle", false);
        document.cookie =
          "google=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 3) {
            let resp = (await ServiceUser.delete(data.id)).data;
          }
        });
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
        this.active = false;
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
      if (this.servicesActive.google) {
        this.active = true;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.btn-google {
  margin: spacing(0, 0, 1);
  display: flex;
  background-color: #dd4b39;
  height: 36px;
  cursor: pointer;
  text-decoration: none;
}
.wrapper-google {
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
.icon-google {
  width: 18px;
  height: 18px;
}
.text-google {
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

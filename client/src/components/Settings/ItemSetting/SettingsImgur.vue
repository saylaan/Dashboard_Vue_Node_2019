<template>
  <v-layout v-on:keyup.enter="saveSettings">
    <v-flex xs12 md10>
      <panel v-if="isUserLoggedIn" title="Setting Imgur">
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
              v-if="!servicesUser.isUserLoggedInImgur && active"
              :href="'http://localhost:8080/auth/imgur'"
              elevation-24
              large
              class="btn-imgur orange darken-1 mb-1 ml-3 font-weight-bold"
            >
              <p class="ml-4 text-imgur">Login Imgur</p>
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
import crypto from "crypto";
import jwtDecode from "jwt-decode";

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
        if (!this.checkCookie("jwtImgur") && !this.servicesActive.imgur) {
          let response = (
            await ServiceUser.post({
              UserId: this.user.id,
              ServiceId: 2
            })
          ).data;
        }
        this.$store.dispatch("setServiceActiveImgur", true);
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
      } else {
        this.$store.dispatch("setServiceActiveImgur", false);
        this.$store.dispatch("setServiceUserImgur", null);
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 2) {
            let resp = (await ServiceUser.delete(data.id)).data;
          }
        });
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
        document.cookie =
          "jwtImgur=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
        this.$store.dispatch("setServiceActiveImgur", false);
        this.$store.dispatch("setServiceUserImgur", null);
        document.cookie =
          "jwtImgur=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 2) {
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
      if (this.servicesActive.imgur) {
        this.active = true;
      }
      if (!this.servicesUser.isUserLoggedInImgur) {
        const value = this.getCookie("jwtImgur");
        const jwtUser = jwtDecode(value);
        this.$store.dispatch("setServiceUserImgur", jwtUser.accessTokenImgur);
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 2) {
            let newServiceUser = {
              id: data.id,
              ServiceId: data.ServiceId,
              UserId: data.UserId,
              account: jwtUser.accessTokenImgur
            };
            let respBis = await ServiceUser.put(newServiceUser);
          }
        });
        this.servicesUsers = (
          await ServiceUser.getUserService(this.user.id)
        ).data;
        Swal.fire({
          position: "top-end",
          type: "success",
          title: "You sign in Imgur with username : ",
          text: jwtUser.user.username,
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.btn-imgur {
  margin: spacing(0, 0, 1);
  display: flex;
  background-color: #dd4b39;
  height: 36px;
  cursor: pointer;
  text-decoration: none;
}
.wrapper-imgur {
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
.icon-imgur {
  width: 18px;
  height: 18px;
}
.text-imgur {
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

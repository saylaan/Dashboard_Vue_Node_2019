<template>
  <v-container fluid grid-list-md justify-center>
    <v-layout class="mt-5" v-if="isUserLoggedIn && !admin" justify-center wrap>
      <v-flex>
      <grid-widgets/>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import GridWidgets from "./Gridster/GridWidgets";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

import ServiceUser from "@/services/ApiAxios/Service/ServiceUser";
import Service from "@/services/ApiAxios/Service/Service";

export default {
  data() {
    return {
      servicesUsers: null,
      services: null
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "user",
      "servicesUser",
      "servicesActive",
      "admin",
      "dark",
      "grad"
    ])
  },
  components: {
    GridWidgets
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  },
  methods: {
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
      this.services = (await Service.get(4)).data;
      if (this.services !== null && this.services.name === "amadeus") {
        this.$store.dispatch("setServiceUserAmadeus", this.services.token);
      }
      this.servicesUsers = (
        await ServiceUser.getUserService(this.user.id)
      ).data;
      this.servicesUsers.forEach(data => {
        if (data.ServiceId === 1) {
          this.$store.dispatch("setServiceActiveOpenWeather", true);
          this.$store.dispatch("setServiceUserTown", data.data);
        } else if (data.ServiceId === 2) {
          this.$store.dispatch("setServiceActiveImgur", true);
          this.$store.dispatch("setServiceUserImgur", data.account);
        } else if (data.ServiceId === 3) {
          this.$store.dispatch("setServiceActiveGoogle", true);
          this.$store.dispatch("setServiceUserGoogle", data.account, data.account);
        } else if (data.ServiceId === 4) {
          this.$store.dispatch("setServiceActiveAmadeus", true);
        }
      });
    } catch (err) {
      console.log(err);
    }
    if (!this.servicesUser.isUserLoggedInGoogle && this.checkCookie("google")) {
      try {
        const value = this.getCookie("google");
        const jwtUser = jwtDecode(value);
        this.$store.dispatch("setUser", jwtUser.user);
        this.$store.dispatch("setAdmin", jwtUser.user.admin);
        this.$store.dispatch("setToken", jwtUser.token);
        this.$store.dispatch(
          "setServiceUserGoogle",
          jwtUser.accessTokenGoogle,
          jwtUser.refreshTokenGoogle
        );
        this.$store.dispatch("setServiceActiveGoogle", true);
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 3) {
            let resp = (await ServiceUser.delete(data.id)).data;
          }
        });
        let response = (await ServiceUser.post({
          "UserId": this.user.id,
          "ServiceId": 3
        })).data
        let newServiceUser = {
          "id": response.id,
          "ServiceId": response.ServiceId,
          "UserId": response.UserId,
          "account": jwtUser.accessTokenGoogle
        }
        let respBis = (await ServiceUser.put(newServiceUser))
        this.$store.dispatch("setDark", true);
        this.$store.dispatch("setGrad", "to top right, #FFFFFF, #ECE9E6");
        if (!this.admin) {
          this.$store.dispatch("setActive", "one");
          this.$router.push({
            name: "dashboard"
          });
        } else {
          this.$store.dispatch("setActive", "two");
          this.$router.push({
            name: "users"
          });
        }
        Swal.fire({
          position: "top-end",
          type: "success",
          title: "You sign in Google with username : ",
          text: jwtUser.user.username,
          showConfirmButton: false,
          timer: 2000
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
// delay(time, callback) {
//       setInterval(callback, time * 1000);
//     }
</script>

<style scoped></style>

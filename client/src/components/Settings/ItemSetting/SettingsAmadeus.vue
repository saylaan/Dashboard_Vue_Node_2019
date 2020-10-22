<template>
  <v-layout v-on:keyup.enter="saveSettings">
    <v-flex xs12 md10>
      <panel v-if="isUserLoggedIn" title="Setting Amadeus">
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
      active: false,
      servicesUsers: null,
      services: null
    };
  },
  watch: {
    active: async function() {
      if (this.active) {
        if (!this.servicesActive.amadeus) {
          let response = (
            await ServiceUser.post({
              UserId: this.user.id,
              ServiceId: 4
            })
          ).data;
        }
        this.$store.dispatch("setServiceActiveAmadeus", true);
        this.servicesUsers = (await ServiceUser.getUserService(this.user.id)).data
      } else {
        this.$store.dispatch("setServiceActiveAmadeus", false);
        this.servicesUsers.forEach(async data => {
          if (data.ServiceId === 4) {
            let resp = (await ServiceUser.delete(data.id)).data
          }
        })
        this.servicesUsers = (await ServiceUser.getUserService(this.user.id)).data
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
  methods: {},
  async mounted() {
    this.servicesUsers = (await ServiceUser.getUserService(this.user.id)).data
    if (this.servicesActive.amadeus) {
      this.active = true;
    }
  }
};
</script>

<style scoped>
.btn-amadeus {
  margin: spacing(0, 0, 1);
  display: flex;
  background-color: #dd4b39;
  height: 36px;
  cursor: pointer;
  text-decoration: none;
}
.wrapper-amadeus {
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
.icon-amadeus {
  width: 18px;
  height: 18px;
}
.text-amadeus {
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

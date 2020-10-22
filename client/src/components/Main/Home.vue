<template>
<v-layout row align-center>
  <v-flex v-if="!isUserLoggedIn" xs12 offset-xs2 sm8 md4>
      <!-- <v-flex xs6 class="mt-5">
        <v-layout justify-center>
        <h1
          class="display-3 mr-3 white--text font-weight-black blue-grey--text text--darken-2"
        >{{ msg }}</h1>
        </v-layout>
      </v-flex> -->
      <!-- <v-flex xs6> -->
          <!-- <v-card>
                <v-card-title justify-center class="mr-3">
                  <h2 v-text="`${msg}`"></h2>
                </v-card-title>
                <v-card-text>
                  <div v-text="`${more}`">{{more}}
                  </div>
                  <a href='mailto:dspp@al-enterprise.com?subject=INFO' class="">dspp@al-enterprise.com</a>
                </v-card-text>
          </v-card> -->

  </v-flex>
</v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Hello",
  data() {
    return {
      msg: "DSPP Free Sandbox",
      about: "About...",
      more: "This Sandbox is provided for free with a pre-configuration of the virtual machines (today OXE and O2G) and must be used as it is." +
      "It is for test purpose to help you acquire expertise on the ALE APIs and develop your 3rd party application/solution integrated with OXE connected to Rainbow." +
      "If you need specific assistance or a Sandbox with specific configuration, please contact us at:",
      steps: [
        {
          step: "1",
          color: "light-blue",
          msg: "Ask for login and credentials",
          msgbis: "Click for sign in"
        },
        {
          step: "2",
          color: "indigo",
          msg: "Sign in",
          msgbis: "Wait acceptation"
        },
        {
          step: "3",
          color: "teal",
          msg: "Get your working URLs for OXE and O2G and SIP",
          msgbis: "Deployment ready (Check your email)"
        },
        {
          step: "And more...",
          color: "light-green",
          msg: "Feedbacks - Support",
          msgbis: "Connect to Portal Vlab"
        },
        {
          step: "5",
          color: "purple",
          msg: "Feedbacks - Support",
          msgbis: "Access your URL from your Dashboard"
        },
        {
          step: "6",
          color: "indigo",
          msg: "",
          msgbis: "Ready for testing"
        },
        {
          step: "And more....",
          color: "pink",
          msg: "",
          msgbis:
            "Feedbacks - Helps - Messages - Dashboard for activity - Vlab view"
        }
      ]
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>

<style scoped>
</style>

<template>
  <v-layout class="mt-5" justify-center align-center>
    <v-flex elevation-24 xs12 sm8 md6  v-if="!$store.state.isUserLoggedIn">
      <panel title="Register">
        <form name="sandbox-form" autocomplete="off">
          <v-text-field label="Username" type="username" v-model="username" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your username must be valid
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-text-field label="Email" type="email" v-model="email" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your email must be valid
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-text-field label="Confirm-email" type="email" v-model="confirmEmail" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your email must be the same
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
            outline
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must contain at least 8 characters
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-text-field
            label="Confirm-password"
            type="password"
            v-model="confirmPassword"
            autocomplete="new-password"
            outline
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must be the same
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <div class="g-reCAPTCHAR" data-sitekey="6LdXEqQUAAAAAL3oAttg0UnznP__DAzEHRmLxhHv"></div>
          <!-- <template>
            <vue-recaptcha sitekey="6LdXEqQUAAAAAL3oAttg0UnznP__DAzEHRmLxhHv">
              <v-btn>Click me</v-btn>
            </vue-recaptcha>
          </template> -->
          <v-layout column class="mb-4" justify-center align-center>
            <span class="danger-alert">{{error}}</span>
            <v-layout class="mt-2" justify-center align-center row>
              <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="register">Register</v-btn>
              <v-icon @click="undoSettings()">refresh</v-icon>
            </v-layout>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/ApiAxios/Authen/AuthenticationService";
import Swal from 'sweetalert2'
import VueRecaptcha from 'vue-recaptcha'

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      confirmEmail: "",
      error: null
    };
  },
  methods: {
    async undoSettings() {
      this.error = null
      this.username = null
      this.password = null
      this.confirmPassword = null
      this.email = null
      this.confirmEmail = null
    },
    async register() {
      if (this.password !== this.confirmPassword) { // FINISH THIS
        this.error = "The password doesn't match"
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Wrong match password',
          text: this.username,
          showConfirmButton: false,
          timer: 2000
        })
        return
      }
      if (this.email !== this.confirmEmail) {
        this.error = "The email doesn't match"
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Wrong email match',
          text: this.username,
          showConfirmButton: false,
          timer: 2000
        })
        return
      }
      try {
        const newUser = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        await AuthenticationService.register(newUser);
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Registration Successfull',
          text: 'You can logged in but you have to configure your dashboard in settings',
          showConfirmButton: false,
          timer: 5000
        })
        this.$router.push({
          name: "home"
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  components: {
    VueRecaptcha
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
.padding-input {
  margin-left: 32px;
}
</style>

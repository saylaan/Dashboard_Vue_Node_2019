<template>
<v-container v-on:keyup.enter="signin">
  <v-layout align-center justify-center>
    <v-flex elevation-24 xs12 sm8 md6 v-if="!isUserLoggedIn">
      <panel title="Sign in">
        <form name="sandbox-form" autocomplete="on">
          <v-text-field class="mt-5" 
            label="Username" 
            v-model="username" 
            autocomplete="on"
            outline 
            clearable>
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
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-layout class="mb-4" column justify-center align-center>
            <span class="danger-alert">{{error}}</span>
            <v-layout class="mt-2" justify-center align-center row>
              <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="signin">Sign in</v-btn>
            
              <v-btn :href="'http://localhost:8080/auth/google'"  elevation-24 large class="btn-google orange darken-1 mb-4 ml-2 font-weight-bold" >
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
              <p class="ml-2 text-google">Login with Google</p>
              </v-btn>
              <v-icon @click="undoSettings()">refresh</v-icon>
            </v-layout>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import { mapState } from "vuex";
import AuthenticationService from "@/services/ApiAxios/Authen/AuthenticationService";
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null
    };
  },
  props: {
    drawer: {
      type: Object,
      require: true
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin", "active"])
  },
  methods: {    
    async undoSettings() {
      this.error = null
      this.username = null
      this.password = null
    },
    async signin() {
      try {
        const newUser = {
          username: this.username,
          password: this.password         
        }
        const response = await AuthenticationService.signin(newUser);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setAdmin", response.data.user.admin);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setDark", true);
        this.$store.dispatch("setGrad", "to top right, #FFFFFF, #ECE9E6");
        if (!this.admin) {
          this.$store.dispatch("setActive", 'one')
          this.$router.push({
            name: "dashboard"
          });
        } else {
          this.$store.dispatch("setActive", "two")
          this.$router.push({
            name: "users"
          });
        }
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'You sign in with username : ',
          text: this.username,
          showConfirmButton: false,
          timer: 2000
        })
      } catch (error) {
        this.error = error.response.data.error;
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Wrong login, please retry',
          text: this.username,
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
.btn-google {
  margin: spacing(0, 0, 1);
  display: flex;
  background-color: #DD4B39;
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

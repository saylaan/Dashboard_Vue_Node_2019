<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" v-on:keyup.enter="create({name: 'users'})" justify-center>
    <v-flex xs6>
      <panel title="Create User">
          <v-text-field label="Username" type="name" v-model="userview.username"
          outline clearable>
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
        <br>
          <v-text-field label="Confirm username" type="name" v-model="confirmUsername"
          outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your username must be the same
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
        <v-switch large color="red" v-model="userview.admin" label="Set Admin">
          <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Its for seeting the user to admin
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>supervised_user_circle</v-icon>
              </v-fade-transition>
            </template>
        </v-switch>
        <br>
        <v-layout column align-center justify-center class="mb-4">
        <span class="danger-alert">{{error}}</span>
        <v-layout class="mt-2" row justify-center align-center>
          <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" 
          @click="create({name: 'users'})">
          Create</v-btn>
          <v-btn elevation-24 large class="grey darken-1 ml-1 mb-4 font-weight-bold" 
          @click="cancel()">
          Cancel</v-btn>
        </v-layout>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/ApiAxios/User/UserService"
import generator from "generate-password"

export default {
  data() {
    return {
      max: 50,
      confirmUsername: null,
      userview: {
        username: null,
        password: "ChangeMe123"
      },
      error: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    isAdmin() {
      return (this.userview.admin)
    },
    async create(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.userview).every(
        key => {
          if (key === 'admin' || key === 'password') {
            return (true)
          }
          return (!!this.userview[key])
        }
      );
      if (!areAllFieldsFilledIn || !this.confirmUsername) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      if (this.confirmUsername !== this.userview.username) {
        this.error = "The usernames don't match"
        return;
      }
      try {
        await UserService.post(this.userview);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    },
    async cancel() {
      this.$router.push({name: 'users'})
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
.padding-input {
  margin: auto;
  /* margin-left: 32px; */
}
</style>

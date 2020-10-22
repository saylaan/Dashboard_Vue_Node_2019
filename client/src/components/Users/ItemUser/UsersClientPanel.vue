<template>
  <v-layout justify-center>
    <v-flex xs12 md10>
    <panel title="Client">
   <v-btn
      class="grey darken-3"
      slot="action"
      :to="{name: 'user-create'}"
      light
      medium
      absolute
      right
      middle
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>
      <v-card>
      <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items-per-page="5"
        :loading="isData(users)" 
        loading-text="No data for the moment"
        class="elevation-12"
        :search="search"
        :items="users">
          <template v-slot:item.username="{item}">
          <a :href="'mailto:' + item.username + '?subject=INFO'" class="text-xs-left">{{item.username}}</a>
          </template>
        <template v-slot:item.dayleft="{item}">
          {{needCredential(item.dayleft, item.assign)}}
        </template>
          <template v-slot:item.id="{item}">
            <v-layout row align-center justify-center>
            <v-btn
              class="grey darken-1 font-weight-bold ml-1 mt-1"
              :to="{
                  name: 'edit-user',
                  params: {
                    userId: item.id}
              }"
           >Edit</v-btn>
            </v-layout>
          </template>
      </v-data-table>
      </v-card>
    </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
import UserService from "@/services/ApiAxios/User/UserService"
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      search: '',
      headers: [
        {text: "Username", value: "username", sortable: false, align: "center"},
        {text: "", value: "id"}
      ],
      users: []
    }
  },
  async mounted() {
    this.users = (await UserService.index()).data;
    for (let i = 0, j = 0; i !== this.users.length; i++) {
      if (this.users[i].admin === true || this.users[i].archive === true) {
        this.users.splice(i, 1)
        i--
      }
    }
  },
  methods: {
    needCredential(time, assign) {
      if (!assign) {
        return "-";
      }
      return time;
    },
    isData(data) {
      if (data) {
        return (false)
      } else {
        return (true)
      }
    },
    async mailTo(email) {
      return ('mailto:' + email + "?subject=INFO")
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    async users() {
      await setTimeout(async () => {
        this.users = (await UserService.index()).data;
        for (let i = 0, j = 0; i !== this.users.length; i++) {
          if (this.users[i].admin === true || this.users[i].archive === true) {
            this.users.splice(i, 1)
            i--
          }
        }
      }, 5000)
    }
  }
};
</script>

<style scoped>

</style>

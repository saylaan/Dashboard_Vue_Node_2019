<template>
  <widget v-if="isUserLoggedIn">
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="handleCalendarClick">Calendar</v-btn>
        <div id="calendar">
          <iframe id="calendarIframe" src="" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
  </widget>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["servicesUser", "isUserLoggedIn", "user", "route"])
  },
  methods: {
      handleCalendarClick() {
          const accessToken = this.servicesUser.tokenGoogle;
          const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars';

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", apiUrl + '/primary', false);
            xmlHttp.setRequestHeader("Authorization", "Bearer " + accessToken);
            xmlHttp.setRequestHeader("scope", "https://www.googleapis.com/auth/calendar");
            xmlHttp.send(null);
            // alert(xmlHttp.responseText);
            var emailStart = xmlHttp.responseText.search("\"id\": ") + 6;
            var emailText = xmlHttp.responseText.substring(emailStart, xmlHttp.responseText.length);
            var email = emailText.split('\n')[0];
            alert(email);
            var emailCor = email.replace('@', '%40');
              document.getElementById('calendarIframe').src = "https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=" + emailCor + "&amp;color=%232952A3&amp;ctz=Europe%2FParis";
      }
  },
  mounted() {
  },
  watch: {
  }
};
</script>

<style scoped>
</style>

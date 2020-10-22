<template>
  <widget v-if="isUserLoggedIn">
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="getImages">Get Images from my account</v-btn>
        <div id="images"></div>
  </widget>
</template>

<script>
import { mapState } from "vuex";

/* ####################################################################### */
/* SERVICE */
import Imgur from "@/services/ApiAxios/Imgur/Imgur";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["servicesUser", "isUserLoggedIn", "user", "route"])
  },
  methods: {
      async getImages() {
        var response = await Imgur.getImages(),
        data = response.data,
        d = document;
        d.getElementById('images').innerHTML = '';
        var start = 0;
        var end = data.data.length;
        for (start; start < end; start++) {
          var img = d.createElement("img");
          img.src = data.data[start].link;
          img.width = 350;
          img.height = 200;
          d.getElementById('images').appendChild(img);
        }
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

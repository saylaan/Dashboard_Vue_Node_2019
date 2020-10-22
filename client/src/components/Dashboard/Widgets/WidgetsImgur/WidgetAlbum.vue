<template>
  <widget v-if="isUserLoggedIn">
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="getAlbums">Get Albums from my account</v-btn>
        <div id="albums"></div>
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
      async getAlbums() {
        var response = await Imgur.getAlbums(),
        data = response.data,
        d = document;
        d.getElementById('albums').innerHTML = '';
        var startAlb = 0;
        var endAlb = data.data.length;
        for (startAlb; startAlb < endAlb; startAlb++) {
          var p = d.createElement('p');
          var btnGetImages = d.createElement('BUTTON');
          btnGetImages.innerHTML = "Get Images from this Album"
          p.textContent = data.data[startAlb].title;
          d.getElementById('albums').appendChild(p);
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

<template>
  <widget v-if="isUserLoggedIn">
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="chooseFile">Choose file to upload</v-btn>
        <input id="file-input" type="file" name="fileChooser" style="display: none;" />
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
      async chooseFile() {
        var fileInput = document.getElementById('file-input');
          var file = fileInput.click(); 
          var fileUrl;
          fileInput.onchange = async (event) => {
            fileUrl = fileInput.value;
            const file = {
              file: fileUrl
            }
            const response = (await Imgur.post(file)).data // request in back
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

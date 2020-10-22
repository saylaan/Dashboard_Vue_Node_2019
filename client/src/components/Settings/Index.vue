<template>
  <v-layout class="mt-5 ml-5" justify-center v-if="isUserLoggedIn" row>
    <v-flex v-if="!admin" xs6>
      <v-layout column class="mt-2">
        <v-flex xs6>
          <settings-meteo />
        </v-flex>
        <v-flex xs6 class="mt-2">
          <settings-amadeus />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="!admin" xs6>
      <v-layout column class="mt-2 ml-2">
        <v-flex xs6>
          <settings-google />
        </v-flex>
        <v-flex xs6 class="mt-2">
          <settings-imgur />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-layout class="mt-5" justify-center wrap v-if="isUserLoggedIn">
      <v-flex fill-height xs12 sm8 md6 v-if="isUserLoggedIn">
        <settings-user />
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import SettingsMeteo from "./ItemSetting/SettingsMeteo";
import SettingsAmadeus from "./ItemSetting/SettingsAmadeus";
import SettingsGoogle from "./ItemSetting/SettingsGoogle";
import SettingsImgur from "./ItemSetting/SettingsImgur";
import SettingsUser from "./ItemSetting/SettingsUser";

export default {
  data() {
    return {
      vlabs: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  async mounted() {},
  components: {
    SettingsUser,
    SettingsMeteo,
    SettingsAmadeus,
    SettingsGoogle,
    SettingsImgur
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped></style>

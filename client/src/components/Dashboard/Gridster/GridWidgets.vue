<template>
  <div class="demo">
    <v-switch large color="red" v-model="active" label="Modify Grid">
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Dragging / Resizing / Pushing / Margin
        </v-tooltip>
      </template>
    </v-switch>
    <div v-if="active">
      <input type="checkbox" v-model="options.draggable.enabled" />Drag
      <input type="checkbox" v-model="options.resizable.enabled" />Resize
      <input type="checkbox" v-model="options.pushing" />Push
      <input type="checkbox" v-model="options.floating" />Float
      <input type="checkbox" v-model="options.swapping" />Swap
      <select v-model="options.mobileBreakPoint">
        <option :value="600">600</option>
        <option :value="Number.MAX_VALUE">MAX</option>
        <option :value="Number.MIN_VALUE">MIN</option>
      </select>
      Margin
      <input type="text" v-model.number="options.margins[0]" size="2" />x
      <input type="text" v-model.number="options.margins[1]" size="2" />
    </div>
    <gridster :options="options">
      <gridster-item v-for="(item, index) in items" :item="item" :key="index">
        <widget-meteo-week class="widget" v-if="index === 0 && servicesUser.townOpenWeather"></widget-meteo-week>
        <widget-meteo-day class="widget" v-if="index === 1 && servicesUser.townOpenWeather"></widget-meteo-day>
        <widget-calandar class="widget" v-if="index === 2  && servicesUser.isUserLoggedInGoogle"></widget-calandar>
        <widget-flight-from class="widget" v-if="index === 3  && servicesActive.amadeus"></widget-flight-from>
        <widget-flight-from-to class="widget" v-if="index === 4 && servicesActive.amadeus"></widget-flight-from-to>
        <widget-upload class="widget" v-if="index === 5  && servicesUser.isUserLoggedInImgur"></widget-upload>
        <widget-images class="widget" v-if="index === 6 && servicesUser.isUserLoggedInImgur"></widget-images>
        <widget-album class="widget" v-if="index === 7 && servicesUser.isUserLoggedInImgur"></widget-album>
      </gridster-item>
    </gridster>
  </div>
</template>

<script>
import { mapState } from "vuex";
/* ####################################################################### */
/* GRIDSTER */
import "../../Vuegridster/css/vue-gridster.css";
import Gridster from "../../Vuegridster/vue-gridster.vue";
import GridsterItem from "../../Vuegridster/vue-gridster-item.vue";
/* ####################################################################### */
/* SERVICE */
import User from "@/services/ApiAxios/User/UserService";
import Service from "@/services/ApiAxios/Service/Service";
import ServiceUser from "@/services/ApiAxios/Service/ServiceUser";
import ServiceWidget from "@/services/ApiAxios/Service/ServiceWidget";
import WidgetUser from "@/services/ApiAxios/Widget/WidgetUser";
import Widget from "@/services/ApiAxios/Widget/Widget";
/* ####################################################################### */
/* WIDGET */
/* OPENWEATHER */
import WidgetMeteoWeek from "../Widgets/WidgetsOpenWeather/WidgetMeteoWeek";
import WidgetMeteoDay from "../Widgets/WidgetsOpenWeather/WidgetMeteoDay";
/* GOOGLE */
import WidgetCalandar from "../Widgets/WidgetsGoogle/WidgetCalendar";
/* IMGUR */
import WidgetUpload from "../Widgets/WidgetsImgur/WidgetUpload";
import WidgetImages from "../Widgets/WidgetsImgur/WidgetImages";
import WidgetAlbum from "../Widgets/WidgetsImgur/WidgetAlbum";
/* AMADEUS */
import WidgetFlightFrom from "../Widgets/WidgetsAmadeus/WidgetFlightFrom";
import WidgetFlightFromTo from "../Widgets/WidgetsAmadeus/WidgetFlightFromTo";

export default {
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "user",
      "servicesUser",
      "servicesActive",
      "admin",
      "dark",
      "grad"
    ])
  },
  components: {
    Gridster,
    GridsterItem,
    WidgetMeteoWeek,
    WidgetMeteoDay,
    WidgetCalandar,
    WidgetUpload,
    WidgetImages,
    WidgetAlbum,
    WidgetFlightFrom,
    WidgetFlightFromTo
  },
  data() {
    return {
      userview: null,
      services: null,
      servicesWidgets: null,
      servicesUsers: null,
      widgetsUsers: null,
      widgets: null,
      active: false,
      items: [
        { sizeX: 2, sizeY: 2, row: 0, col: 0 },
        { sizeX: 2, sizeY: 2, row: 0, col: 2 },
        { sizeX: 2, sizeY: 2, row: 0, col: 4 },
        { sizeX: 2, sizeY: 2, row: 2, col: 0 },
        { sizeX: 2, sizeY: 2, row: 2, col: 2 },
        { sizeX: 2, sizeY: 2, row: 2, col: 4 },
        { sizeX: 2, sizeY: 2, row: 4, col: 0 },
        { sizeX: 2, sizeY: 2, row: 4, col: 2 }
        // { sizeX: 2, sizeY: 2, row: 4, col: 4 },
        // { sizeX: 2, sizeY: 2, row: 6, col: 0 },
        // { sizeX: 2, sizeY: 2, row: 6, col: 2 },
        // { sizeX: 2, sizeY: 2, row: 6, col: 4 }
      ],
      options: {
        margins: [10, 10],
        isMobile: false,
        pushing: true,
        floating: true,
        swapping: false,
        mobileBreakPoint: 600,
        draggable: { enabled: true },
        resizable: { enabled: true }
      }
    };
  },
  watch: {
    active: async function() {
      if (this.active) {
        this.userview.modify_gridster = true;
        await User.put(this.userview);
      } else {
        this.userview.modify_gridster = false;
        await User.put(this.userview);
        this.options.draggable.enabled = false;
        this.options.resizable.enabled = false;
        this.options.pushing = false;
        this.options.floating = false;
        this.options.swapping = false;
      }
    }
  },
  methods: {},
  async mounted() {
    this.options.draggable.enabled = false;
    this.options.resizable.enabled = false;
    this.options.pushing = false;
    this.options.floating = false;
    this.options.swapping = false;
    this.userview = (await User.getUser(this.user.id)).data;
    if (this.userview.modify_gridster) {
      this.active = true;
    }
    this.services = (await Service.index()).data;
    this.servicesUsers = (await ServiceUser.getUserService(this.user.id)).data;
    this.servicesWidgets = (await ServiceWidget.index()).data;
    this.widgets = (await Widget.index()).data;
    this.widgetsUsers = (await WidgetUser.getUserWidget(this.user.id)).data;
  }
};
</script>
<style>
demo {
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: black;
  color: #fff;
  margin: 100px;
}

.widget {
  height: 100%;
  width: 100%;
}

.gridster .gridster-item {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  color: black;
  background: whitesmoke;
  padding: 10px;
}
</style>

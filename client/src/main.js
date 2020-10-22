// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Panel from '@/components/Global/Panel'
import Widget from '@/components/Global/Widget'
import VueCookies from 'vue-cookies'
import VueGoogleApi from 'vue-google-api'

// AIzaSyCXwpYimh_MVn-SytRww6NPFNPleuKlUbc
// yEM9BuqtS3HOS5D1sGfWob9W
const config = {
    clientId: '196579897709-rp0b1meejl9ostod8k3gdr8arb6hj8vv.apps.googleusercontent.com',
    apiKey: 'AIzaSyAN4zvVWWARexp1Z_pA7se8QNYFGHR_gzM',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
}

Vue.config.productionTip = false

Vue.use(Vuetify, {
    iconfont: 'md'
})
Vue.use(VueGoogleApi, config)
Vue.use(VueCookies)
Vue.component('panel', Panel)
Vue.component('widget', Widget)

sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router,
    store,
    components: { App },
    template: '<App/>'
})
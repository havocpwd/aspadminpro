import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './plugins/base'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAOeKzoWFdWScJIjrLwWIH3i8o90setV-A',
    libraries: 'places',
  }
});

Vue.use(require('vue-moment'))
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

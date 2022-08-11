<template>
  <v-app id="app" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
      <router-view />
  </v-app>
</template>

<script>
/* eslint-disable */ 
import visitorService from '@/services/visitorService'
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {

    }
  },
  mounted() {
    this.createDataVisitor();
  },
  methods: {
    async getIpVisitor(){
      let ipAddress = ''
      await fetch('https://api.ipify.org?format=json')
      .then(x => x.json())
      .then(({ ip }) => {
          ipAddress = ip
      });
      return ipAddress;
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }
        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
    async createDataVisitor(){
      let ip = await this.getIpVisitor();
      let location = await this.getLocation();
      var data = {
        ipAddress : ip,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      const lastIp = await visitorService.get(ip);
      if(ip == lastIp.data.ipAddress){
        visitorService.update(lastIp.data.id)
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((e) => {
          console.log(e)
        });
      }else{
        visitorService.create(data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e)
        });
      }
    }
  },
};
</script>

<style>
@import '@/assets/styles/main.css'
</style>

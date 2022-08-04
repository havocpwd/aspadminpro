<template>
  <v-app id="app" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
      <router-view />
  </v-app>

</template>

<script>

export default {
  name: 'App',

  components: {
    
  }

};
</script>

<style>
@import '@/assets/styles/main.css'
</style>

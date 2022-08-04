<template>
<v-container fluid class="down-top-padding">
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>
        {{ tab.name }}
      </v-tab>
      <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        <router-view></router-view>
      </v-tab-item>
    </v-tabs>
</v-container>
</template>
<script>
export default {
  data() {
    return {
      activeTab: `/suppliers`,
      tabs: [
        { id: 1, name: "Daftar Supplier", route: `/suppliers` },
        { id: 2, name: "History", route: `/suppliers/history` }
      ]
    };
  }
};
</script>
<template>
<div>
    <v-tabs v-model="activeTab" grow>
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>
        {{ tab.name }}
      </v-tab>

      <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        <router-view></router-view>
      </v-tab-item>
    </v-tabs>
</div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: `/po`,
      tabs: [
        { id: 1, name: "Daftar Pembelian", route: `/po` },
        { id: 2, name: "Pembelian Baru", route: `/po/new` },
        { id: 3, name: "Laporan", route: `/po/reports` },
      ]
    };
  }
};
</script>
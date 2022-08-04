<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'dark'"
    :color="SidebarColor"
    mobile-breakpoint="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
  >
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Dohn Deo</v-list-item-title>
          <v-list-item-subtitle class="caption"
            >Webdesigner</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->
      <!---Sidebar Items -->
      <template v-for="(item,i) in items">
      <v-list-item
        v-if="item.to"
        :key="item.id"
        :to="item.to"
        :active-class="`primary--text`"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-if="item.subItems"
        :key="`${i}-b`"
        :prepend-icon="`${item.icon} fa-em`"
        v-model="item.active"
        append-icon="mdi-chevron-down"
        >
        <template v-slot:activator>
            <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
        </template>
        <v-list-item
            v-for="(s, y) in item.subItems"
            :key="y"
            :to="s.to"
            link
            class="pl-8"
        >
            <v-list-item-icon>
            <v-icon small>{{ s.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>{{ s.label }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-group>
      </template>
      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import MenuService from '@/services/menuService';

export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: [],
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },
  async created() {
      try {
          const response = await MenuService.getAllMenu();
          this.items = response.data.menus;
      } catch (err) {
          console.log(err.message);
      }
  },
  methods: {
    collapseSubItems() {
        this.nav.map((item)=>item.active=false)
    },
  },
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    min-height: 35px;
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
  .v-list-item__icon i {
    width: 20px;
  }
  .icon-size .v-list-group__items i {
    width: 16px;
    font-size: 16px;
  }
  .profile-bg {
    &.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      opacity: 1;
    }
    .v-avatar {
      padding: 15px 0;
    }
  }
  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}

.theme--dark.v-navigation-drawer {
  background-color: #242a33 !important;
}
</style>
<template>
  <q-list>
    <template v-for="(menuItem, index) in activeMenu" :key="index">
      <left-drawer-content-item :p-menu-item="menuItem" :p-active="activeItem" @item-clicked="itemClicked"/>
    </template>
  </q-list>
</template>
<script>

import LeftDrawerContentItem from "components/main-layout/LeftDrawerContentItem.vue";
import { v4 as uuidv4 } from 'uuid';
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {LeftDrawerContentItem},
  data() {
    return {
      drawer: false,
      securityStore: useSecurityStore(),
      activeItem: "",
      menuListAdmin: [
        {
          icon: 'apartment',
          label: 'Osnovni Podaci',
          subItems: [
            { label: "Users", routeTo: "/users", id: uuidv4() },
            // { label: "Stambene Zajednice", routeTo: "/osnovni-podaci/stambene-zajednice", id: uuidv4() },
            // { label: "Vlasnici", routeTo: "/osnovni-podaci/vlasnici", id: uuidv4() },
          ],
        },
        {
          icon: 'settings',
          label: 'Settings',
          routeTo: "",
          subItems: [],
        },
        {
          icon: 'help',
          label: 'Help',
          routeTo: "",
          subItems: [],
        }
      ],
      menuListUser: [
        {
          icon: 'apartment',
          label: 'Osnovni Podaci',
          subItems: [
            { label: "Države", routeTo: "/osnovni-podaci/drzave", id: uuidv4() },
            { label: "Stambene Zajednice", routeTo: "/osnovni-podaci/stambene-zajednice", id: uuidv4() },
            { label: "Vlasnici", routeTo: "/osnovni-podaci/vlasnici", id: uuidv4() },
          ],
        },
        {
          icon: 'settings',
          label: 'Settings',
          routeTo: "",
          subItems: [],
        },
        {
          icon: 'help',
          label: 'Help',
          routeTo: "",
          subItems: [],
        }
      ],
    }
  },
  computed: {
    activeMenu() {
      if(this.securityStore.role === "ROLE_USER") {
        return this.menuListUser;
      }
      return this.menuListAdmin;
    }
  },
  methods: {
    itemClicked(itemLabel) {
      this.activeItem = itemLabel;
    },
  }
}
</script>

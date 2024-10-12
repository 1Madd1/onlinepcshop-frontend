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
          icon: 'home',
          label: 'Home',
          routeTo: "/",
          subItems: [],
        },
        {
          icon: 'apartment',
          label: 'Admin Options',
          subItems: [
            { label: "Users", routeTo: "/users", id: uuidv4() },
            { label: "Computers", routeTo: "/computers", id: uuidv4() },
            { label: "Motherboards", routeTo: "/motherboards", id: uuidv4() },
            { label: "Case Fans", routeTo: "/case-fans", id: uuidv4() },
            { label: "Cpu's", routeTo: "/cpus", id: uuidv4() },
            { label: "Gpu's", routeTo: "/gpus", id: uuidv4() },
            { label: "Ram's", routeTo: "/rams", id: uuidv4() },
            { label: "Storages", routeTo: "/storages", id: uuidv4() },
            { label: "Computer Cases", routeTo: "/computer-cases", id: uuidv4() },
            { label: "Coolers", routeTo: "/coolers", id: uuidv4() },
            { label: "Power Supplies", routeTo: "/power-supplys", id: uuidv4() },
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

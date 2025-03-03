<template>
  <q-list>
    <template v-for="(menuItem, index) in activeMenu" :key="index">
      <left-drawer-content-item :p-menu-item="menuItem" :p-active="activeItem" @sub-item-clicked="subItemClicked" @item-clicked="itemClicked"/>
    </template>
  </q-list>
</template>
<script>

import LeftDrawerContentItem from "components/main-layout/LeftDrawerContentItem.vue";
import { v4 as uuidv4 } from 'uuid';
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {LeftDrawerContentItem},
  emits: ["itemClicked", "subItemClicked"],
  data() {
    return {
      drawer: false,
      securityStore: useSecurityStore(),
      activeItem: "",
      menuListAdmin: [
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
      ],
      menuListUser: [
        {
          icon: 'computer',
          label: 'Computers',
          subItems: [
            { label: "Business Computers", routeTo: "/computers-cards-business", id: uuidv4() },
            { label: "Normal Computers", routeTo: "/computers-cards-normal", id: uuidv4() },
            { label: "Gaming Computers", routeTo: "/computers-cards-gaming", id: uuidv4() },
          ],
        },
        {
          icon: 'memory',
          label: 'Components',
          subItems: [
            { label: "Motherboards", routeTo: "/motherboards-cards", id: uuidv4() },
            { label: "Case Fans", routeTo: "/case-fans-cards", id: uuidv4() },
            { label: "Cpus", routeTo: "/cpus-cards", id: uuidv4() },
            { label: "Gpus", routeTo: "/gpus-cards", id: uuidv4() },
            { label: "Rams", routeTo: "/rams-cards", id: uuidv4() },
            { label: "Storages", routeTo: "/storages-cards", id: uuidv4() },
            { label: "Computer Cases", routeTo: "/computer-cases-cards", id: uuidv4() },
            { label: "Coolers", routeTo: "/coolers-cards", id: uuidv4() },
            { label: "Power Supplies", routeTo: "/power-supplys-cards", id: uuidv4() },
          ],
        },
      ],
    }
  },
  computed: {
    activeMenu() {
      if (this.securityStore.role === "ROLE_ADMIN") {
        return this.menuListAdmin;
      }
      return this.menuListUser;
    }
  },
  methods: {
    itemClicked(itemLabel) {
      this.$emit("itemClicked");
      this.activeItem = itemLabel;
    },
    subItemClicked() {
      this.$emit("subItemClicked");
    }
  }
}
</script>

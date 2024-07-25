<template>
  <q-expansion-item
    v-if="pMenuItem.subItems.length !== 0"
    :icon="pMenuItem.icon"
    :label="pMenuItem.label"
  >
    <q-card>
      <q-card-section class="q-pa-none q-pl-xl">
          <span v-for="subItem in pMenuItem.subItems" :key="subItem">
            <left-drawer-sub-item :p-sub-item="subItem" :p-active="activeSubItem" @sub-item-clicked="subItemClicked"/>
          </span>
      </q-card-section>
    </q-card>
    <q-separator />
  </q-expansion-item>


  <template v-else>
        <router-link :to="pMenuItem.routeTo" class=" no-a-style">
          <q-item clickable v-ripple :active="active" @click="itemClicked">
            <q-item-section avatar>
              <q-icon :name="pMenuItem.icon"/>
            </q-item-section>
            <q-item-section>
              {{ pMenuItem.label }}
            </q-item-section>
          </q-item>
        </router-link>
  </template>
</template>
<script>

import LeftDrawerSubItem from "components/main-layout/LeftDrawerSubItem.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {LeftDrawerSubItem},
  props: {
    pMenuItem: {
      type: Object,
      default: function () {
        return {
          icon: "help",
          label: "<missing-menu-item>"
        }
      }
    },
    pActive: {
      type: String,
      default: ""
    },
  },
  emits: ["itemClicked"],
  data() {
    return {
      active: null,
      activeSubItem: null,
      securityStore: useSecurityStore(),
    }
  },
  watch: {
    pActive(newValue) {
      this.activeSubItem = null;
      this.active = this.pMenuItem.label === newValue;
    }
  },
  methods: {
    itemClicked() {
      this.$emit("itemClicked", this.pMenuItem.label);
    },
    subItemClicked(activeSubItemId) {
      this.activeSubItem = activeSubItemId;
    }
  }
}
</script>
<style scoped>
.no-a-style {
  text-decoration: none;
  color: inherit;
}
</style>

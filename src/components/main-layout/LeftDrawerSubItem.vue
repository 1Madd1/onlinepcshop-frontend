<template>
  <router-link :to="pSubItem.routeTo" class="no-a-style">
    <q-item v-ripple clickable :active="pActive === pSubItem.id" class="items-center"
            @click="itemClicked">
      {{ pSubItem.label }}
    </q-item>
  </router-link>
</template>
<script>
export default {
  props: {
    pActive: String,
    pSubItem: {
      type: Object,
      required: false,
      default: function() {
        return {
          label: "<not-found>", routeTo: "/hhhh"
        }
      }
    }
  },
  emits: ["subItemClicked"],
  data() {
    return {
      active: false,
    }
  },
  watch: {
    pActive(newValue) {
      this.active = this.pSubItem.id === newValue;
    }
  },
  methods: {
    itemClicked() {
      this.$emit("subItemClicked", this.pSubItem.id);
    }
  }
}
</script>

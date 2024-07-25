<template>
  <q-tr :props="pProps">
    <q-th
      v-for="col in pProps.cols"
      :key="col.name"
      :props="pProps"
      class="vertical-top"
    >
      <div>{{ col.label }}</div>
      <div v-if="filterFields.includes(col.name)">
        <input :ref="col.name" type="text" style="width: 100%;" @input="doFilter"/>
      </div>
    </q-th>
  </q-tr>
</template>
<script>
export default {
  emits: ["filterChanged"],
  props: {
    pProps: {
      type: Object,
      required: true,
    },
    pFilter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filter: JSON.parse(JSON.stringify(this.pFilter)),
      filterFields: Object.keys(JSON.parse(JSON.stringify(this.pFilter))),
      filterTimeout: null,
    }
  },
  methods: {
    doFilter() {
      if (this.filterTimeout !== null) {
        clearTimeout(this.filterTimeout);
      }
      this.filterTimeout = setTimeout(() => {
        for (let i in this.filterFields) {
          this.filter[this.filterFields[i]] = this.$refs[this.filterFields[i]][0].value;
        }
        this.$emit("filterChanged", this.filter);
      }, 1000);
    }
  }
}
</script>

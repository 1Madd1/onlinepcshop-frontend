<template>
  <q-select
    v-model="model"
    filled
    use-input
    hide-selected
    fill-input
    :label="pLabel"
    input-debounce="0"
    :option-value="pOptionLabel"
    :option-label="pOptionValue"
    :options="pOptions"
    dense
    @filter="doFilter"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
export default {
  props: {
    pLabel: {
      type: String,
      required: true,
    },
    pOptionValue: {
      type: String,
      required: true,
    },
    pOptionLabel: {
      type: String,
      required: true,
    },
    pOptions: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      model: null,
    }
  },
  methods: {
    doFilter() {

    }
  }
}
</script>

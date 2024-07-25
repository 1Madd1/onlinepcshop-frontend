<template>
  <div class="flex justify-center">
    <q-btn @click="pMethodToInvoke" class="q-mt-sm q-mb-sm" color="primary" :label="pLabel" />
  </div>
</template>
<script>
export default {
  props: {
    pMethodToInvoke: {
      type: Function,
      required: true,
    },
    pLabel: {
      type: String,
      required: true,
    }
  }
}
</script>

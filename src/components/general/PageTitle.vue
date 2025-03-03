<template>
  <div class="flex justify-center text-h4 text-uppercase text-grey-9 q-pt-xs q-pb-xs">{{ pTitle }}</div>
</template>
<script>
export default {
  props: {
    pTitle: {
      type: String,
      required: true
    }
  }
}
</script>

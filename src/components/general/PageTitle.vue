<template>
  <div class="flex justify-center text-h4 text-uppercase bg-blue-grey-1 text-grey-9 q-pt-xs q-pb-xs">{{ pTitle }}</div>
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

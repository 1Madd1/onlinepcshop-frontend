<template>
  <div class="q-pa-md text-center">
    <h3>Product Manufacturers</h3>
    <div class="row q-gutter-md">
      <div v-for="manufacturer in this.manufacturers" :key="manufacturer" class="manufacturer-div col-3" style="margin-left: 6%; margin-top: 5%; background-color: rgba(255,255,255,0.65)">
        <q-img v-if="manufacturer === 'noctua'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 20%"/>
        <q-img v-else-if="manufacturer === 'nzxt'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 26%"/>
        <q-img v-else-if="manufacturer === 'amd'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 10%"/>
        <q-img v-else-if="manufacturer === 'intel'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 5%"/>
        <q-img v-else-if="manufacturer === 'kingston'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 7%"/>
        <q-img v-else-if="manufacturer === 'corsair'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 9%; height: 70%"/>
        <q-img v-else-if="manufacturer === 'gigabyte'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 25%"/>
        <q-img v-else-if="manufacturer === 'msi'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 19%"/>
        <q-img v-else-if="manufacturer === 'asrock'" :src="'src/img/' + manufacturer + '-logo.png'" style="margin-top: 38%"/>
        <q-img v-else :src="'src/img/' + manufacturer + '-logo.png'"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      manufacturers: ["amd", "intel", "cooler-master", "corsair", "noctua", "nzxt", "kingston",
      "asus", "gigabyte", "msi", "asrock", "thermalight"],
    }
  },
}
</script>

<style>
</style>

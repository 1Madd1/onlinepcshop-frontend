<template>
  <div v-if="securityStore.role !== 'ROLE_ADMIN'" class="q-pa-md">
    <div class="q-gutter-md text-center">
      <h3 style="margin-left: 4vw;">PRODUCTS ON SALE</h3>
      <q-carousel
        v-model="carouselSlide1"
        v-if="checkCarouselResult1"
        swipeable
        animated
        infinite
        autoplay
        control-color="white"
        transition-prev="jump-right"
        transition-next="jump-left"
        padding
        arrows
        height="300px"
        style="margin-left: 5%; margin-right: 5%; border: 1px solid black"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide v-for="item in this.carouselResult1" :key="item.id" img-src="src/img/product-carousel-background.jpg" :name="item.id" class="row no-wrap flex-center">
            <div class="col-4 q-mt-md text-center">
              <p v-if="checkIfItemIsComputer(item)" style="font-size: 250%;">{{ item.computerName }}</p>
              <p v-else style="font-size: 250%;">{{ item.componentName }}</p>
            </div>
          <div class="col-2">
            <q-img v-if="utilMethods.checkIfImageExists(item)" class="cursor-pointer" :src="item.image" alt='src/img/unavailable-image.jpg' style="border: 1px solid black; border-radius: 10px;" @click="viewItem(item)" />
            <q-img v-else src="src/img/unavailable-image.png" class="cursor-pointer" style="border: 1px solid black; border-radius: 10px;" @click="viewItem(item)" />
          </div>
            <div class="col-4 q-mt-md text-center">
              <p style="font-size: 350%; color: red;">ON SALE NOW</p>
              <p style="font-size: 350%; color: red;">{{ utilMethods.priceWithDots(item.price) + ' ' + item.currency }}</p>
            </div>
        </q-carousel-slide>
      </q-carousel>
      <div v-else class="q-mt-md text-center">
        <q-img width="15%"
               src="src/img/empty-box.png"/>
        <h3>There are no products on sale!</h3>
      </div>

      <h3 style="margin-top: 5%; margin-left: 4vw;">TOP RATED PRODUCTS</h3>
      <q-carousel
        v-model="carouselSlide2"
        v-if="checkCarouselResult2"
        swipeable
        animated
        infinite
        autoplay
        control-color="white"
        transition-prev="jump-right"
        transition-next="jump-left"
        padding
        arrows
        height="300px"
        style="margin-left: 5%; margin-right: 5%; border: 1px solid black"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide v-for="item in this.carouselResult2" :key="item.id" img-src="src/img/product-carousel-background.jpg" :name="item.id" class="row no-wrap flex-center">
          <div class="col-4 q-mt-md text-center">
            <p v-if="checkIfItemIsComputer(item)" style="font-size: 250%;">{{ item.computerName }}</p>
            <p v-else style="font-size: 250%;">{{ item.componentName }}</p>
          </div>
          <div class="col-2">
            <q-img v-if="utilMethods.checkIfImageExists(item)" class="cursor-pointer" @click="viewItem(item)" :src="item.image" alt='src/img/unavailable-image.jpg' style="border: 1px solid black; border-radius: 10px;" />
            <q-img v-else src="src/img/unavailable-image.png" class="cursor-pointer" @click="viewItem(item)" style="border: 1px solid black; border-radius: 10px;" />
          </div>
          <div class="col-4 q-mt-md text-center">
            <p style="font-size: 350%; color: red;">{{ utilMethods.priceWithDots(item.price) + ' ' + item.currency }}</p>
            <div class="q-pa-md no-pointer-events">
              <q-rating
                v-model="item.avgRating"
                size="4em"
                color="gold"
              />
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div v-else class="q-mt-md text-center">
        <q-img width="15%"
               src="src/img/empty-box.png"/>
        <h3>There are no products with ratings!</h3>
      </div>
    </div>
  </div>
  <div v-else>

  </div>
</template>

<script>

import {useSecurityStore} from "stores/securityStore";
import apiClient from "src/lib/api-clients/api-client";
import utilMethods from "../components/util/util-methods";

export default {
  data() {
    return {
      carouselSlide1: null,
      carouselSlide2: null,
      securityStore: useSecurityStore(),
      loginCardShow: true,
      carouselResult1: [],
      carouselResult2: [],
    }
  },
  async created() {
    let allProductsOnSale = await apiClient.request('get', `/multiple-tables/all-products-on-sale`, null, null);
    let allTopRatedProducts = await apiClient.request('get', `/multiple-tables/all-top-rated-products`, null, null);
    this.carouselSlide1 = this.fillArrayWithResults(this.carouselResult1, allProductsOnSale);
    this.carouselSlide2 = this.fillArrayWithResults(this.carouselResult2, allTopRatedProducts);
  },
  computed: {
    utilMethods() {
      return utilMethods;
    },
    checkCarouselResult1() {
      return this.carouselResult1.length !== 0;
    },
    checkCarouselResult2() {
      return this.carouselResult2.length !== 0;
    },
  },
  methods: {
    checkIfItemIsComputer(item) {
      return item.computerName !== undefined;
    },
    fillArrayWithResults(resultArray, productsArray) {
      if (productsArray !== undefined && productsArray !== null && productsArray.computerList !== null){
        utilMethods.sortOutMultipleArrays(resultArray, productsArray);
        return resultArray[(Math.floor(Math.random() * resultArray.length))].id;
      }
      return null;
    },
    viewItem(item) {
      let tab = utilMethods.getProductType(item);
      let path = "/" + tab;
      let index = tab.indexOf("-");
      tab = tab.replace("-", "");
      if (index !== -1) {
        tab = tab.slice(0, index) + tab.charAt(index).toUpperCase() + tab.slice(index + 1) + "Info";
      } else {
        tab += "Info";
      }
      this.$router.push({
        path: path,
        query: {
          id: item.id,
          tab: tab
        }
      });
    },
  }
}
</script>

<style>
</style>

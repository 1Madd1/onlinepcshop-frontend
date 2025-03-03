<template>
  <div class="q-pa-md">
    <q-card flat bordered class="filter-card">
      <q-card-actions class="product-filter-card">
        <q-select :options="filterValues" v-model="filter" label="Sort By" style="width: 15%"/>
        <q-input v-model="searchText" outlined v-on:keyup.enter="search" label="Search" style="width: 45%; margin-left: 12%">
          <template v-slot:prepend>
            <q-icon name="search" class="cursor-pointer" @click="search"/>
          </template>
        </q-input>
        <q-btn
          color="primary"
          style="width: 15%; margin-left: 12%"
          size="lg"
          class="glossy"
          @click="clearFilters"
          label="CLEAR FILTER"
        />
      </q-card-actions>
    </q-card>
  </div>
  <div v-if="!checkIfMotherboardListIsEmpty" class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="motherboard in this.filteredMotherboards" :key="motherboard.tempId" class="product-card col-2" flat bordered>
        <q-img v-if="utilMethods.checkIfImageExists(motherboard)" class="cursor-pointer q-hoverable" @click="viewMotherboard(motherboard.id)" :src=motherboard.image width="100%" height="100%" />
        <q-img v-else src="src/img/unavailable-image.png" class="cursor-pointer" @click="viewMotherboard(motherboard.id)" />
        <q-separator />
        <q-card-section style="max-height: 77px">
          <div class="text-h7 q-mt-sm cursor-pointer" @click="viewMotherboard(motherboard.id)">
            <p class="product-name">{{ motherboard.componentName }}</p>
          </div>
        </q-card-section>
        <q-card-section class="amount">
          <div class="text-h6">
            Available: {{ motherboard.quantity }}
          </div>
        </q-card-section>
        <div class="q-pa-md no-pointer-events">
          <q-rating
            v-model="motherboard.avgRating"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            disable
            size="2em"
            color="primary"
          />
        </div>

        <q-separator />

        <q-card-actions>
          <div class="text-h6" style="margin-left: 2%">
            Price: {{ utilMethods.priceWithDots(motherboard.price) + ' ' + motherboard.currency }}
          </div>
          <q-space />
          <q-btn
            color="green"
            style="width: 100%"
            size="md"
            class="glossy"
            label="ADD TO CART"
            @click="addMotherboardToCart(motherboard)"
          />
        </q-card-actions>
        <div class="on-sale-sticker" v-if="motherboard.saleType !== null">On Sale</div>
      </q-card>
  </div>
  <div v-else class="col text-center" style="height: 90vh; padding-top: 7%">
    <q-img width="20%"
           src="src/img/empty-box.png"/>
    <h2>There are no motherboards</h2>
    <q-btn label="Return To Home Screen" rounded glossy color="primary" @click="returnOnHomePage"/>
  </div>
</template>
<script>
import {useSecurityStore} from "stores/securityStore";
import apiClient from "src/lib/api-clients/api-client";
import utilMethods from "components/util/util-methods";
import {Notify} from "quasar";
import {useCartStore} from "stores/cartStore";

export default {
  computed: {
    utilMethods() {
      return utilMethods
    },
    checkIfMotherboardListIsEmpty() {
      if (this.motherboards.length === 0) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      motherboards: [],
      filteredMotherboards: [],
      expanded: false,
      searchText: null,
      filterValues: [
        {
          label: "Select Filter",
          value: 4
        },
        {
          label: "Price: Low to High",
          value: 1
        },
        {
          label: "Price: High to Low",
          value: 2
        },
        {
          label: "Rating",
          value: 3
        }
      ],
      filter: {
        label: "Select Filter",
        value: 4
      },
      securityStore: useSecurityStore(),
      cartStore: useCartStore(),
    }
  },
  watch: {
    filter(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        this.sortFilteredValues(newValue.value);
      } else {
        this.filteredMotherboards = [];
        for (let numberKey in this.motherboards) {
          this.filteredMotherboards.push(this.motherboards[numberKey]);
        }
      }
    }
  },
  async created() {
    apiClient.request('get', `/motherboard/find-all-available`, null, null).then(
      result => {
          for (let numberKey in result) {
            result[numberKey].tempId = utilMethods.generateRandomUUID();
            this.motherboards.push(result[numberKey]);
            this.filteredMotherboards.push(result[numberKey]);
          }
      }
    );
  },
  methods: {
    returnOnHomePage() {
      this.$router.push({
        path: "/",
      });
    },
    async search() {
      let url = '/motherboard/search-by-name?name=' + this.searchText;
      if (!(this.searchText === null)) {
        if (this.searchText === "") {
          url = '/motherboard/find-all-available';
          this.filter = {
            label: "Select Filter",
            value: 4
          };
        }
        this.motherboards = [];
        this.filteredMotherboards = [];
        await apiClient.request('get', url, null, null).then(
          result => {
            for (let numberKey in result) {
              result[numberKey].tempId = utilMethods.generateRandomUUID();
              this.motherboards.push(result[numberKey]);
              this.filteredMotherboards.push(result[numberKey]);
            }
          }
        );
        this.sortFilteredValues(this.filter.value);
      }
    },
    addMotherboardToCart(motherboard) {
      let product = motherboard;
      product.selectedAmount = 1;
      if (this.cartStore.addProduct(product)) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "Product " + motherboard.componentName + " added to cart!",
        });
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Product not added to cart!"
        });
      }
    },
    viewMotherboard(motherboardId) {
      this.$router.push({
        path: "/motherboard",
        query: {
          id: motherboardId,
          tab: 'motherboardInfo'
        }
      });
    },
    clearFilters() {
      this.filter = {
        label: "Select Filter",
        value: 4
      };
      this.searchText = "";
      this.search();
    },
    filterLowToHigh(a, b) {
      if ( a.price < b.price ){
        return -1;
      }
      if ( a.price > b.price ){
        return 1;
      }
      return 0;
    },
    filterHighTolow(a, b) {
      if ( a.price > b.price ){
        return -1;
      }
      if ( a.price < b.price ){
        return 1;
      }
      return 0;
    },
    filterRating(a, b) {
      if (a.avgRating === null) {
        return 1;
      }
      if (b.avgRating === null) {
        return -1;
      }
      if ( a.avgRating > b.avgRating ){
        return -1;
      }
      if ( a.avgRating < b.avgRating ){
        return 1;
      }
      return 0;
    },
    sortFilteredValues(filterValue) {
      switch(filterValue) {
        case 1:
          this.filteredMotherboards.sort(this.filterLowToHigh);
          break;
        case 2:
          this.filteredMotherboards.sort(this.filterHighTolow);
          break;
        case 3:
          this.filteredMotherboards.sort(this.filterRating);
          break;
        case 4:
          break;
      }
    }
  },
}
</script>

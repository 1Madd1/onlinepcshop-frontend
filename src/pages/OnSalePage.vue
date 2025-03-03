<template>
  <div class="row" style="text-align: center">
    <h4 class="col-12">ON SALE PRODUCTS</h4>
  </div>
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
  <div v-if="!checkIfProductListIsEmpty" class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="product in this.filteredProducts" :key="product.tempId" class="product-card col-2" flat bordered>
      <div style="max-height: 400%;">
        <q-img v-if="utilMethods.checkIfImageExists(product)"
               class="cursor-pointer q-hoverable"
               @click="viewProduct(product)"
               :src=product.image
               width="100%"
               height="100%"
        />
        <q-img v-else src="src/img/unavailable-image.png" width="100%" height="100%" class="cursor-pointer" style="border-bottom: 1px solid black;" @click="viewProduct(product)"/>
      </div>
      <q-separator/>
      <q-card-section style="max-height: 77px">
        <div class="text-h7 q-mt-sm cursor-pointer q-hoverable" @click="viewProduct(product)">
          <p v-if="product.componentName !== undefined" class="product-name">{{ product.componentName }}</p>
          <p v-else class="product-name">{{ product.computerName }}</p>
        </div>
      </q-card-section>
      <q-card-section class="amount">
        <div class="text-h6">
          Available: {{ product.quantity }}
        </div>
      </q-card-section>
      <div class="q-pa-md no-pointer-events">
        <q-rating
          v-model="product.avgRating"
          disable
          size="2em"
          color="primary"
        />
      </div>

      <q-separator/>

      <q-card-actions>
        <div class="text-h6" style="margin-left: 2%">
          Price: {{ utilMethods.priceWithDots(product.price) + ' ' + product.currency }}
        </div>
        <q-space/>
        <q-btn
          color="green"
          style="width: 100%"
          size="md"
          class="glossy"
          label="ADD TO CART"
          @click="addProductToCart(product)"
        />
      </q-card-actions>
      <div class="on-sale-sticker" v-if="product.saleType !== null">On Sale</div>
    </q-card>
  </div>
  <div v-else class="col text-center" style="height: 90vh; padding-top: 7%">
    <q-img width="20%"
           src="src/img/empty-box.png"/>
    <h2>There are no products on sale</h2>
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
    checkIfProductListIsEmpty() {
      if (this.products.length === 0) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      expanded: false,
      searchText: null,
      cartStore: useCartStore(),
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
    }
  },
  watch: {
    filter(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        this.sortFilteredValues(newValue.value);
      } else {
        this.filteredProducts = [];
        for (let numberKey in this.products) {
          this.filteredProducts.push(this.products[numberKey]);
        }
      }
    }
  },
  async created() {
    apiClient.request('get', `/multiple-tables/all-products-on-sale`, null, null).then(
      result => {
        let tempResult = [];
        utilMethods.sortOutMultipleArrays(tempResult, result);
        for (let numberKey in tempResult) {
          tempResult[numberKey].tempId = utilMethods.generateRandomUUID();
          this.products.push(tempResult[numberKey]);
          this.filteredProducts.push(tempResult[numberKey]);
        }
      }
    );
  },
  methods: {
    addProductToCart(product) {
      product.selectedAmount = 1;
      if (this.cartStore.addProduct(product)) {
        let message;
        if (Object.hasOwn(product, 'computerName')) {
          message = "Product " + product.computerName + " added to cart!"
        } else {
          message = "Product " + product.componentName + " added to cart!"
        }
        Notify.create({
          color: "positive",
          icon: "check",
          message: message,
        });
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Product not added to cart!"
        });
      }
    },
    async search() {
      let url = '/multiple-tables/all-products-on-sale?productName=' + this.searchText;
      if (this.searchText !== null) {
        this.products = [];
        this.filteredProducts = [];
        await apiClient.request('get', url, null, null).then(
          result => {
            let tempResult = [];
            utilMethods.sortOutMultipleArrays(tempResult, result);
            for (let numberKey in tempResult) {
              tempResult[numberKey].tempId = utilMethods.generateRandomUUID();
              this.products.push(tempResult[numberKey]);
              this.filteredProducts.push(tempResult[numberKey]);
            }
          }
        );
        this.sortFilteredValues(this.filter.value);
      }
    },
    viewProduct(product) {
      let tab = utilMethods.getProductType(product);
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
          id: product.id,
          tab: tab
        }
      });
    },
    returnOnHomePage() {
      this.$router.push({
        path: "/",
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
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    },
    filterHighToLow(a, b) {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
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
      if (a.avgRating > b.avgRating) {
        return -1;
      }
      if (a.avgRating < b.avgRating) {
        return 1;
      }
      return 0;
    },
    sortFilteredValues(filterValue) {
      switch(filterValue) {
        case 1:
          this.filteredProducts.sort(this.filterLowToHigh);
          break;
        case 2:
          this.filteredProducts.sort(this.filterHighToLow);
          break;
        case 3:
          this.filteredProducts.sort(this.filterRating);
          break;
        case 4:
          break;
      }
    },
  },
}
</script>

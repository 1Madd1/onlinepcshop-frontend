<template>
  <div class="q-pa-md row items-start q-gutter-md product-info-page">
    <q-card class="product-card-info" flat bordered>
      <div class="on-sale-sticker" v-if="storage.saleType !== null">{{ getSaleType() }}</div>
      <q-card-actions>
        <q-img v-if="storage.image !== null && storage.image !== ''"
               :src=storage.image
               width="50%"
               height="50%"
        />
        <q-img v-else src="src/img/unavailable-image.png" width="45%" height="45%" />
        <q-space/>
        <div class="text-h4 q-mt-sm q-mb-xs product-info">
          <q-separator/>
          <p>Storage Type: {{ storage.storageType }}</p>
          <q-separator/>
          <p>Storage Capacity: {{ storage.capacity }}GB</p>
          <q-separator/>
          <p>Manufacturer: {{ storage.manufacturer }}</p>
          <q-separator/>
          <p>Total Draw Power: {{ storage.tdp }}W</p>
          <q-separator/>
          <div v-if="checkIfRatingIsLoaded" class="q-pa-md rating">
            <q-rating
              v-model="storageRating"
              :disable="!this.hasBeenBoughtPreviously"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              size="2em"
              color="primary"
            />
          </div>
          <q-separator/>
        </div>
      </q-card-actions>
      <q-separator/>
      <q-card-actions v-if="storage.description !== null">
        <div class="text-h6 q-mt-sm q-mb-xs">
          <p>Description:</p>
          {{ storage.description }}
        </div>
      </q-card-actions>
      <q-separator v-if="storage.description !== null"/>
      <q-card-actions>
        <div class="text-h4">
          Amount available: {{ storage.quantity }}
        </div>
        <q-space/>
        <div class="text-h4 q-mr-sm">
          Price:
        </div>
        <div v-if="storage.saleType !== null" class="text-h4 price-color">
          {{ this.priceWithDots(storage.price) + ' ' + storage.currency }}
        </div>
        <div v-else class="text-h4">
          {{ this.priceWithDots(storage.price) + ' ' + storage.currency }}
        </div>
      </q-card-actions>
      <q-card-actions>
          <q-btn
            class="add-to-cart-btn glossy"
            color="green"
            size="lg"
            label="ADD TO CART"
            @click="addStorageToCart(storage)"
          />
      </q-card-actions>
    </q-card>
  </div>
</template>
<style scoped>
.add-to-cart-btn {
  width: 100%;
}
.on-sale-sticker {
  font-size: 35px;
}
</style>
<script>

import userClient from "src/lib/api-clients/user-client";
import {useSecurityStore} from "stores/securityStore";
import {Notify} from "quasar";
import {useCartStore} from "stores/cartStore";
import apiClient from "src/lib/api-clients/api-client";

export default {
  props: {
    pStorage: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          storageType: null,
          capacity: null,
          tdp: null,
          manufacturer: null,
          description: null,
          image: null,
          saleType: null,
          rating: null,
        }
      }
    }
  },
  data() {
    return {
      expanded: false,
      selectedAmount: 1,
      storageRating: null,
      hasBeenBoughtPreviously: false,
      userClient: userClient,
      cartStore: useCartStore(),
      securityStore: useSecurityStore(),
      storage: JSON.parse(JSON.stringify(this.pStorage)),
    }
  },
  async created() {
    await apiClient.request('get', '/storage/get-storage-average-rating?storageId=' + this.storage.id, null, null)
      .then(
        result => {
          this.storageRating = result;
        }
      );
    if (this.checkIfLoggedIn) {
      let tempResult;
      await apiClient.request('get', '/multiple-tables/purchase-history?userId=' + this.securityStore.user.id, null, null)
        .then(
          result => {
            tempResult = result;
          }
        );
      let tempPurchasedProducts = [];
      for (let tempResultElement of tempResult) {
        tempPurchasedProducts.push(tempResultElement.purchasedProductResponseList);
      }
      for (let tempPurchasedProduct of tempPurchasedProducts) {
        for (let tempPurchasedProductElement of tempPurchasedProduct) {
          if (tempPurchasedProductElement.productId === this.storage.id) {
            this.hasBeenBoughtPreviously = true;
            break;
          }
        }
      }
    }
  },
  computed: {
    checkIfLoggedIn() {
      return this.securityStore.role === "ROLE_USER";
    },
    checkIfRatingIsLoaded() {
      return this.storageRating !== null;
    }
  },
  methods: {
    addStorageToCart(storage) {
      let product = storage;
      product.selectedAmount = 1;
      if (this.cartStore.addProduct(product)) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "Product " + storage.componentName + " added to cart!",
        });
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Product not added to cart!"
        });
      }
    },
    priceWithDots(price) {
      return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    },
    getSaleType() {
      let saleType = this.storage.saleType;
      saleType = saleType.replace("_", " ");
      saleType += "% OFF"
      return saleType;
    },
    async addRating() {
      if (!this.checkIfLoggedIn) {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "You have to be logged in to add ratings!"
        });
      }
      else if (!this.hasBeenBoughtPreviously) {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "You have to had purchased this product to add a rating!"
        });
      } else {
        let httpMethod = 'post';
        if (this.storageRating !== null) {
          httpMethod = 'put';
        }
        let productRating = {
          productId: this.storage.id,
          productType: "storage",
          rating: this.storageRating,
          userId: this.securityStore.user.id
        }
        let tempProductRating = null;
        await apiClient.request('get', '/product-rating/find-by-user-id-and-product-id?userId=' + this.securityStore.user.id + '&productId=' + this.storage.id, null, null)
          .then(
            result => {
              tempProductRating = result;
            }
          );
        let endMessage = "added!";
        if (tempProductRating !== null) {
          endMessage = "updated!"
          productRating.id = tempProductRating.id;
        }
        await apiClient.request(httpMethod, '/product-rating', null, productRating)
          .then(
            result => {
              if(result !== null && result.id !== null) {
                Notify.create({
                  color: "positive",
                  icon: "check",
                  message: "Rating " + endMessage
                });
              } else {
                Notify.create({
                  color: "negative",
                  icon: "warning",
                  message: "Rating not added!"
                });
              }
            }
          );
      }
    }
  },
}
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md product-info-page" v-if="checkIfMapsAreEmpty">
    <q-card class="product-card-info" flat bordered>
      <div class="on-sale-sticker" v-if="motherboard.saleType !== null">{{ getSaleType() }}</div>
      <q-card-actions>
        <q-img v-if="motherboard.image !== null && motherboard.image !== ''"
               :src=motherboard.image
               width="50%"
               height="50%"
        />
        <q-img v-else src="src/img/unavailable-image.png" width="45%" height="45%"/>
        <q-space/>
        <div class="text-h4 q-mt-sm q-mb-xs product-info">
          <q-separator/>
          <p>Socket Type: {{ motherboard.socketType }}</p>
          <q-separator/>
          <p>Memory Type: {{ motherboard.memoryType }}</p>
          <q-separator/>
          <p>Manufacturer: {{ motherboard.manufacturer }}</p>
          <q-separator/>
          <p>Total Draw Power: {{ motherboard.tdp }}W</p>
          <q-separator/>
          <div v-if="checkIfRatingIsLoaded" class="q-pa-md rating">
            <q-rating
              v-model="motherboardRating"
              :disable="!this.hasBeenBoughtPreviously"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              size="2em"
              color="primary"
              @click="addRating"
            />
          </div>
          <q-separator/>
        </div>
      </q-card-actions>
      <q-separator/>
      <q-card-section v-if="motherboard.description !== null">
        <div class="text-h6 q-mt-sm q-mb-xs">
          <p>Description:</p>
          {{ motherboard.description }}
        </div>
      </q-card-section>
      <q-separator v-if="motherboard.description !== null"/>
      <q-card-section>
        <div class="text-h6 q-mt-sm q-mb-xs">
          <p v-if="pcieInterfaceMap.size !== 0">PCIe's:</p>
          <div v-for="[key, value] in pcieInterfaceMap" :key="key">
            <p> {{ value }}X {{ key }}</p>
          </div>
          <q-separator v-if="storageInterfaceMap.size !== 0"/>
          <p v-if="storageInterfaceMap.size !== 0">Storages:</p>
          <div v-for="[key, value] in storageInterfaceMap" :key="key">
            <p>{{ value }}X {{ key }}</p>
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <div class="text-h4">
          Amount available: {{ motherboard.quantity }}
        </div>
        <q-space/>
        <div class="text-h4 q-mr-sm">
          Price:
        </div>
        <div v-if="motherboard.saleType !== null" class="text-h4 price-color">
          {{ this.priceWithDots(motherboard.price) + ' ' + motherboard.currency }}
        </div>
        <div v-else class="text-h4">
          {{ this.priceWithDots(motherboard.price) + ' ' + motherboard.currency }}
        </div>
      </q-card-actions>
      <q-card-actions>
        <q-btn
          class="add-to-cart-btn glossy"
          color="green"
          size="lg"
          label="ADD TO CART"
          @click="addMotherboardToCart(motherboard)"
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
import apiClient from "src/lib/api-clients/api-client";
import {Notify} from "quasar";
import {useCartStore} from "stores/cartStore";

export default {
  props: {
    pMotherboard: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          socketType: null,
          memoryType: null,
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
      pcieInterfaceMap: new Map(),
      storageInterfaceMap: new Map(),
      expanded: false,
      selectedAmount: 1,
      motherboardRating: null,
      hasBeenBoughtPreviously: false,
      userClient: userClient,
      cartStore: useCartStore(),
      securityStore: useSecurityStore(),
      motherboard: JSON.parse(JSON.stringify(this.pMotherboard)),
    }
  },
  async created() {
    await apiClient.request('get', '/motherboard/get-all-interfaces-by-motherboard-id/' + this.motherboard.id, null, null)
      .then(
        result => {
          for (const val of result.pcieInterfaceList) {
            if (!this.pcieInterfaceMap.has(val.pcieType)) {
              this.pcieInterfaceMap.set(val.pcieType, 1);
            } else {
              this.pcieInterfaceMap.set(val.pcieType, (this.pcieInterfaceMap.get(val.pcieType)) + 1);
            }
          }
          for (const val of result.storageInterfaceList) {
            if (!this.storageInterfaceMap.has(val.storageType)) {
              this.storageInterfaceMap.set(val.storageType, 1);
            } else {
              this.storageInterfaceMap.set(val.storageType, (this.storageInterfaceMap.get(val.storageType)) + 1);
            }
          }
        }
      );
    await apiClient.request('get', '/motherboard/get-motherboard-average-rating?motherboardId=' + this.motherboard.id, null, null)
      .then(
        result => {
          this.motherboardRating = result;
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
          if (tempPurchasedProductElement.productId === this.motherboard.id) {
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
    checkIfMapsAreEmpty() {
      return this.pcieInterfaceMap.size !== 0 && this.storageInterfaceMap !== 0;
    },
    checkIfRatingIsLoaded() {
      return this.motherboardRating !== null;
    }
  },
  methods: {
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
    priceWithDots(price) {
      return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    },
    getSaleType() {
      let saleType = this.motherboard.saleType;
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
        if (this.motherboardRating !== null) {
          httpMethod = 'put';
        }
        let productRating = {
          productId: this.motherboard.id,
          productType: "motherboard",
          rating: this.motherboardRating,
          userId: this.securityStore.user.id
        }
        let tempProductRating = null;
        await apiClient.request('get', '/product-rating/find-by-user-id-and-product-id?userId=' + this.securityStore.user.id + '&productId=' + this.motherboard.id, null, null)
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

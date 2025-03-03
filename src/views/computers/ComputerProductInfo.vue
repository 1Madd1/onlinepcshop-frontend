<template>
  <div class="q-pa-md row items-start q-gutter-md product-info-page">
    <q-card class="product-card-info" flat bordered>
      <div class="on-sale-sticker" v-if="computer.saleType !== null">{{ getSaleType() }}</div>
      <q-card-actions>
        <q-img v-if="computer.image !== null && computer.image !== ''"
               :src=computer.image
               width="50%"
               height="50%"
        />
        <q-img v-else src="src/img/unavailable-image.png" width="45%" height="45%" />
        <q-space/>
        <div class="text-h4 q-mt-sm q-mb-xs product-info" v-if="checkAllComponents">
          <q-separator/>
          <p>Computer Type: {{ computer.computerType }} </p>
          <q-separator/>
          <p>Computer Case: {{ computerCase.componentName }}</p>
          <q-separator/>
          <p>Motherboard: {{ motherboard.componentName }}</p>
          <q-separator/>
          <p v-if="computer.gpuId != null">Gpu: {{ gpu.componentName }}</p>
          <q-separator v-if="computer.gpuId != null" />
          <p>Cpu: {{ cpu.componentName }}</p>
          <q-separator/>
          <p v-if="computer.coolerId != null">Cooler: {{ cooler.componentName }}</p>
          <q-separator v-if="computer.coolerId != null" />
          <p>Power Supply: {{ powerSupply.componentName }}</p>
          <q-separator/>
          <p>Total Draw Power: {{ computer.tdp }}W</p>
          <q-separator/>
          <div v-if="checkIfRatingIsLoaded" class="q-pa-md rating">
            <q-rating
              v-model="computerRating"
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
      <q-card-actions v-if="computer.description !== null">
        <div class="text-h6 q-mt-sm q-mb-xs">
          <p>Description:</p>
          {{ computer.description }}
        </div>
      </q-card-actions>
      <q-separator v-if="computer.description !== null"/>
      <q-card-actions>
        <div class="text-h4">
          Amount available: {{ computer.quantity }}
        </div>
        <q-space/>
        <div class="text-h4 q-mr-sm">
          Price:
        </div>
        <div v-if="computer.saleType !== null" class="text-h4 price-computerCaseId">
          {{ this.priceWithDots(computer.price) + ' ' + computer.currency }}
        </div>
        <div v-else class="text-h4">
          {{ this.priceWithDots(computer.price) + ' ' + computer.currency }}
        </div>
      </q-card-actions>
      <q-card-actions>
          <q-btn
            class="add-to-cart-btn glossy"
            color="green"
            size="lg"
            label="ADD TO CART"
            @click="addComputerToCart(computer)"
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
    pComputer: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          computerName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          computerType: null,
          computerCaseId: null,
          gpuId: null,
          powerSupplyId: null,
          coolerId: null,
          cpuId: null,
          motherboardId: null,
          tdp: null,
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
      computerRating: null,
      userClient: userClient,
      hasBeenBoughtPreviously: false,
      securityStore: useSecurityStore(),
      cartStore: useCartStore(),
      computer: JSON.parse(JSON.stringify(this.pComputer)),
      computerCase: null,
      motherboard: null,
      cpu: null,
      gpu: null,
      cooler: null,
      powerSupply: null,
      caseFans: [],
      storages: [],
      rams: [],
    }
  },
  async created() {
    let motherboardIds = [this.computer.motherboardId];
    let computerCaseIds = [this.computer.computerCaseId];
    let cpuIds = [this.computer.cpuId];
    let gpuIds = [];
    let coolerIds = [];
    if (this.computer.gpuId !== null) {
      gpuIds = [this.computer.gpuId];
    }
    if (this.computer.coolerId !== null) {
      coolerIds = [this.computer.coolerId];
    }
    let powerSupplyIds = [this.computer.powerSupplyId];
    // Srediti da dobije sve komponente putem get poziva samo pomocu computer id
    let multipleTablesRequest = {
      computerIds: [this.computer.id],
      ramIds: [],
      storageIds: [],
      caseFanIds: [],
      computerCaseIds: computerCaseIds,
      motherboardIds: motherboardIds,
      cpuIds: cpuIds,
      gpuIds: gpuIds,
      coolerIds: coolerIds,
      powerSupplyIds: powerSupplyIds
    }
    await apiClient.request('post', '/multiple-tables/all-requested-components', null, multipleTablesRequest)
      .then(
        result => {
          this.computerCase = result.computerCaseList[0];
          this.motherboard = result.motherboardList[0];
          this.cpu = result.cpuList[0];
          if (result.gpuList[0] !== null && result.gpuList[0] !== undefined) this.gpu = result.gpuList[0];
          if (result.coolerList[0] !== null && result.coolerList[0] !== undefined) this.cooler = result.coolerList[0];
          this.powerSupply = result.powerSupplyList[0];
          this.caseFans = result.caseFanList;
          this.rams = result.ramList;
          this.storages = result.storageList;
        }
      );
    await apiClient.request('get', '/computer/get-computer-average-rating?computerId=' + this.computer.id, null, null)
      .then(
        result => {
          this.computerRating = result;
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
          if (tempPurchasedProductElement.productId === this.computer.id) {
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
    checkAllComponents() {
      return this.computerCase !== null && this.motherboard !== null && this.cpu !== null && this.powerSupply !== null;
    },
    checkIfRatingIsLoaded() {
      return this.computerRating !== null;
    }
  },
  methods: {
    addComputerToCart(computer) {
      let product = computer;
      product.selectedAmount = 1;
      if (this.cartStore.addProduct(product)) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "Product " + computer.computerName + " added to cart!",
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
      let saleType = this.computer.saleType;
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
        if (this.computerRating !== null) {
          httpMethod = 'put';
        }
        let productRating = {
          productId: this.computer.id,
          productType: "computer-case",
          rating: this.computerRating,
          userId: this.securityStore.user.id
        }
        let tempProductRating = null;
        await apiClient.request('get', '/product-rating/find-by-user-id-and-product-id?userId=' + this.securityStore.user.id + '&productId=' + this.computer.id, null, null)
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

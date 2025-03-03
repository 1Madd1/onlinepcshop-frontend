<template>
  <div v-if="!checkIfPurchaseHistoryIsEmpty" :style="purchaseHistoryPageHeight" style="padding: 1% 16vw 0 16vw; text-align: center;">
    <h2>Purchase History</h2>
    <div class="q-pa-lg row" style="background-color: rgba(255,255,255,0.6); border: 1px solid black; border-radius: 10px">
      <q-card v-for="purchaseHistory in purchaseHistories" :key="purchaseHistory" flat bordered style="width: 25%; margin-top: 2vh; margin-left: 4vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-subtitle2">Buyer first name: {{ purchaseHistory.purchaseTransaction.buyerFirstName }}</div>
          <div class="text-subtitle2">Buyer last name: {{ purchaseHistory.purchaseTransaction.buyerLastName }}</div>
          <div class="text-subtitle2">Date of purchase: {{ purchaseHistory.purchaseTransaction.dateOfPurchase }}</div>
          <div class="text-subtitle2">Payment type: {{ purchaseHistory.purchaseTransaction.paymentType }}</div>
          <div class="text-subtitle2">Total price: {{ utilMethods.priceWithDots(purchaseHistory.purchaseTransaction.totalPrice) + ' ' + "RSD" }}</div>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn label="View" flat @click="viewPurchaseHistoryInfo(purchaseHistory.purchaseTransaction, purchaseHistory.purchasedProductResponseList)"/>
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <div v-else class="col text-center" style="height: 90vh; padding-top: 7%">
    <q-img width="20%"
           src="src/img/empty-box.png"/>
    <h2>You have no purchase history</h2>
    <q-btn label="Return To Home Screen" rounded glossy color="primary" @click="returnOnHomePage"/>
  </div>

</template>
<script>

import {useCartStore} from "stores/cartStore";
import utilMethods from "components/util/util-methods";
import apiClient from "src/lib/api-clients/api-client";
import {useSecurityStore} from "stores/securityStore";
import {Notify} from "quasar";

export default {
  data() {
    return {
      purchaseHistories: [],
      purchaseHistoryPageHeight: {height: "auto"},
      cartStore: useCartStore(),
      securityStore: useSecurityStore(),
    }
  },
  mounted() {
    this.matchHeight();
  },
  async created() {
    if (this.securityStore.role !== "ROLE_USER") {
      Notify.create({
        color: "negative",
        icon: "warning",
        message: "You have to be logged in as a user to use this page!"
      });
      this.$router.push({
        path: "/"
      });
    }
    await apiClient.request("get", "/multiple-tables/purchase-history?userId=" + this.securityStore.user.id, null, null)
      .then(
        result => {
          this.purchaseHistories = result;
        }
      );
  },
  computed: {
    utilMethods() {
      return utilMethods;
    },
    checkIfPurchaseHistoryIsEmpty() {
      if (this.purchaseHistories.length === 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    getRandomUUID() {
      return utilMethods.generateRandomUUID();
    },
    matchHeight() {
      if (this.purchaseHistories.length < 6) {
        this.purchaseHistoryPageHeight.height = "90vh";
      } else {
        this.purchaseHistoryPageHeight.height = "auto";
      }
    },
    returnOnHomePage() {
      this.$router.push({
        path: "/",
      });
    },
    viewPurchaseHistoryInfo(purchaseTransaction, purchasedProductsList) {
      this.$router.push({
        path: "/purchase-history-detail",
        query: {
          purchaseTransaction: JSON.stringify(purchaseTransaction),
          purchasedProductsList: JSON.stringify(purchasedProductsList)
        }
      });
    },
  }
}
</script>

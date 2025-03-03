<template>
  <div v-if="!checkIfPurchaseTransactionIsEmpty && !checkIfPurchasedProductsListIsEmpty" style="text-align: center; padding: 5%">
    <div class="row" style="width: 80%; margin: auto; background-color: rgba(255,255,255,0.6); padding: 2%; border: 1px solid black; border-radius: 10px;">
      <div class="col-12">
        <h2>Buyer Info</h2>
        <q-card>
          <q-card-section class="row bg-blue-4 glossy text-white">
            <div class="text-h5 col-6">Buyer first name: {{ purchaseTransaction.buyerFirstName }}</div>
            <div class="text-h5 col-6">Buyer last name: {{ purchaseTransaction.buyerLastName }}</div>
            <div class="text-h5 col-6">Buyer email: {{ purchaseTransaction.buyerEmail }}</div>
            <div class="text-h5 col-6">Buyer phone number: {{ purchaseTransaction.buyerPhoneNumber }}</div>
            <div class="text-h5 col-6">Buyer street: {{ purchaseTransaction.buyerStreet }}</div>
            <div class="text-h5 col-6">Buyer postal code: {{ purchaseTransaction.buyerPostalCode }}</div>
            <div class="text-h5 col-6">Date of purchase: {{ purchaseTransaction.dateOfPurchase }}</div>
            <div class="text-h5 col-6">Payment type: {{ purchaseTransaction.paymentType }}</div>
            <div class="text-h3 col-12" style="margin-top: 2%">Total price: {{ utilMethods.priceWithDots(purchaseTransaction.totalPrice) + ' ' + "RSD" }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <h2>Purchased Products</h2>
      </div>
      <div v-for="product in purchasedProductsList" :key="product.productName" class="col-3 q-pa-md" style="margin: auto">
        <q-card style="border: 1px solid black; border-radius: 10px;" flat bordered>
          <q-img v-if="utilMethods.checkIfImageExists(product)" :src=product.image />
          <q-img v-else src="src/img/unavailable-image.png"/>
          <q-separator/>
          <q-card-section style="max-height: 77px">
            <div class="text-h7 q-mt-sm cursor-pointer">
              <p class="product-name">{{ product.productName }}</p>
            </div>
          </q-card-section>
          <q-card-section class="amount">
            <div class="text-h6">
              Selected amount: {{ product.amount }}
            </div>
          </q-card-section>

          <q-separator/>

          <q-card-section class="text-h6">
              Price: {{ utilMethods.priceWithDots(product.price) }} RSD
          </q-card-section>
        </q-card>
      </div>

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
import {useSecurityStore} from "stores/securityStore";
import {Notify} from "quasar";

export default {
  data() {
    return {
      cartStore: useCartStore(),
      securityStore: useSecurityStore(),
      purchaseTransaction: {
        id: null,
        buyerEmail: null,
        buyerFirstName: null,
        buyerLastName: null,
        buyerPhoneNumber: null,
        buyerPostalCode: null,
        buyerStreet: null,
        dateOfPurchase: null,
        totalPrice: null,
        paymentType: null,
      },
      purchasedProductsList: [],
    }
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
    this.purchaseTransaction = JSON.parse(this.$route.query.purchaseTransaction);
    this.purchasedProductsList = JSON.parse(this.$route.query.purchasedProductsList);
  },
  computed: {
    utilMethods() {
      return utilMethods;
    },
    checkIfPurchaseTransactionIsEmpty() {
      if (this.purchaseTransaction.id === null || this.purchaseTransaction.id === "" || this.purchaseTransaction.id === undefined) {
        return true;
      }
      return false;
    },
    checkIfPurchasedProductsListIsEmpty() {
      if (this.purchasedProductsList.length === 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    returnOnHomePage() {
      this.$router.push({
        path: "/",
      });
    },
  }
}
</script>

<template>
  <div style="padding: 5vh;">
    <div class="row" style="margin: 5vh; background-color: rgb(255,255,255); border: 2px solid black; padding: 2vh;">
      <div class="col-6">
        <div>
          <q-card flat style="margin-left: 4vw;">
            <q-card-section style="padding-bottom: 20px">
              <q-form class="q-px-xl purchasing-form" id="form1" @submit="purchase">
                <div class="row" style="margin-top: 1vh">
                  <q-input v-model="buyerForm.firstName" :rules="rules.firstNameRule" outlined clearable
                           label="First name"/>
                  <q-space/>
                  <q-input v-model="buyerForm.lastName" :rules="rules.lastNameRule" outlined clearable
                           label="Last name"/>
                </div>
                <q-input class="purchasing-form-input" :rules="rules.emailRule" v-model="buyerForm.email" outlined
                         clearable type="email" label="Email"/>
                <q-input class="purchasing-form-input" :rules="rules.streetRule" v-model="buyerForm.street" outlined
                         clearable label="Street"/>
                <q-input class="purchasing-form-input" :rules="rules.postalCodeRule" v-model="buyerForm.postalCode"
                         outlined clearable label="Postal Code"/>
                <q-input class="purchasing-form-input" fill-mask mask="(###) ### - ####" :rules="rules.telephoneRule"
                         v-model="buyerForm.phoneNumber" outlined clearable type="tel" label="Phone Number"/>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-5 q-mt-lg">
        <table class="product-table-compact">
          <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products" :key="product.id">
            <td v-if="product.componentName !== undefined" style="width: 30%;">{{ product.componentName }}</td>
            <td v-else style="width: 30%;">{{ product.computerName }}</td>
            <td v-if="product.saleType !== null" class="price" style="color: red">
              {{ utilMethods.priceWithDots(product.price) }} RSD
            </td>
            <td v-else class="price">{{ utilMethods.priceWithDots(product.price) }} RSD</td>
            <td> {{ product.selectedAmount }}</td>
            <td v-if="product.saleType !== null" style="color: red" class="total-price">
              {{ utilMethods.priceWithDots(product.price * product.selectedAmount) }} RSD
            </td>
            <td v-else class="total-price">{{ utilMethods.priceWithDots(product.price * product.selectedAmount) }} RSD
            </td>
          </tr>
          <tr class="table-total">
            <td colspan="2" style="text-align: left; font-size: 30px;">
              Shopping Cart Total
            </td>
            <td colspan="2" style="text-align: right; font-size: 30px;">
              {{ utilMethods.priceWithDots(cartStore.shoppingCartTotal()) }} RSD
            </td>
          </tr>
          </tbody>
        </table>
        <q-card class="q-mt-lg">
          <q-card-section>
            <q-form>
              <q-select :options="paymentTypes" v-model="paymentType" label="Payment Type"/>
            </q-form>
          </q-card-section>
        </q-card>
        <q-btn
          color="green"
          size="xl"
          type="submit"
          rounded
          :disable="disablePurchase"
          class="glossy full-width q-mt-xl"
          form="form1"
          label="Purchase"
        />
      </div>
    </div>
  </div>
  <credit-card-form-dialog v-if="creditCardPrompt" :p-credit-card-prompt="creditCardPrompt" :p-is-payment-page="true"
                           @dialog-closed="closeCreditCardDialog"
                           @successful-purchase="successfulPurchaseAfterCreditCardDialog"/>

</template>
<script>

import {useCartStore} from "stores/cartStore";
import utilMethods from "../components/util/util-methods";
import {Notify} from "quasar";
import {useSecurityStore} from "stores/securityStore";
import CreditCardFormDialog from "components/general/CreditCardFormDialog.vue";
import {date} from 'quasar';
import apiClient from "src/lib/api-clients/api-client";

export default {
  components: {CreditCardFormDialog},
  data() {
    return {
      products: [],
      creditCardPrompt: false,
      cartStore: useCartStore(),
      securityStore: useSecurityStore(),
      paymentType: {
        label: "Select Payment Type",
        value: 0
      },
      paymentTypes: [
        {
          label: "Cash",
          value: 1
        },
        {
          label: "Credit Card",
          value: 2
        },
        {
          label: "Select Payment Type",
          value: 0
        },
      ],
      buyerForm: {
        firstName: null,
        lastName: null,
        email: null,
        street: null,
        postalCode: null,
        phoneNumber: null,
      },
      rules: {
        emailRule: [
          (val, rules) => val !== null && val.length > 0 && utilMethods.validateEmail(val) || 'Insert valid email!'
        ],
        streetRule: [
          (val) => val !== null && val.length > 0 || "Insert valid street!"
        ],
        firstNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid first name!"
        ],
        lastNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid last name!"
        ],
        telephoneRule: [
          (val) => val !== null && val.length > 0 && !val.includes("_") || "Insert valid telephone number!"
        ],
        postalCodeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid postal code!"
        ],
      },
    }
  },
  created() {
    if (this.cartStore.arrayOfProducts().length < 1) {
      Notify.create({
        color: "negative",
        icon: "warning",
        message: "Shopping Cart is Empty!"
      });
      this.$router.push({
        path: "/",
      });
    }
    this.products = this.cartStore.arrayOfProducts();
  },
  mounted() {
    if (this.securityStore.user !== null) {
      this.buyerForm.firstName = this.securityStore.user.firstName;
      this.buyerForm.lastName = this.securityStore.user.lastName;
      this.buyerForm.phoneNumber = this.securityStore.user.phoneNumber;
      this.buyerForm.postalCode = this.securityStore.user.postalCode;
      this.buyerForm.email = this.securityStore.user.email;
      this.buyerForm.street = this.securityStore.user.street;
    }
  },
  computed: {
    utilMethods() {
      return utilMethods
    },
    disablePurchase() {
      return this.paymentType.value == 0 || !this.checkIfFormIsFilled();
    }
  },
  methods: {
    checkIfFormIsFilled() {
      for (const [key, value] of Object.entries(this.buyerForm)) {
        if (value === null || value === undefined || value === "") {
          return false;
        }
      }
      return true;
    },
    async purchase() {
      let purchaseProductRequests = [];
      for (let product of this.products) {
        purchaseProductRequests.push({
          productId: product.id,
          amount: product.selectedAmount,
          price: product.price,
          productType: product.productType
        });
      }
      let today = date.formatDate(new Date(), 'YYYY-MM-DD');
      let purchaseTransaction = {
        buyerFirstName: this.buyerForm.firstName,
        buyerLastName: this.buyerForm.lastName,
        buyerEmail: this.buyerForm.email,
        buyerStreet: this.buyerForm.street,
        buyerPhoneNumber: this.buyerForm.phoneNumber,
        buyerPostalCode: this.buyerForm.postalCode,
        userId: this.securityStore.user !== null ? this.securityStore.user.id : null,
        totalPrice: this.cartStore.shoppingCartTotal(),
        dateOfPurchase: today
      };
      let paymentType;
      if (this.paymentType.value === 2) {
        paymentType = "credit-card";
        purchaseTransaction.paymentType = paymentType;
        if (this.securityStore.user !== null) {
          if (this.securityStore.user.creditCardId !== null) {
            await this.sendPurchaseApi(purchaseTransaction);
          } else {
            this.showCreditCardPrompt();
          }
        } else {
          this.showCreditCardPrompt();
        }
      } else if (this.paymentType.value === 1) {
        paymentType = "cash";
        purchaseTransaction.paymentType = paymentType;
        await this.sendPurchaseApi(purchaseTransaction);
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Select payment type!"
        });
      }
    },
    async sendPurchaseApi(purchaseTransaction) {
      let purchaseProductsRequest = {
        purchaseTransaction: purchaseTransaction,
        purchaseProductRequests: this.modifyListOfProductsForPurchase()
      }
      let isPurchased;
      await apiClient.request("post", "/multiple-tables/purchase-products", null, purchaseProductsRequest)
        .then(
          result => {
            isPurchased = result
          }
        );
      if (isPurchased) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "Purchase successful!"
        });
        this.cartStore.clearProducts();
        this.$router.push({
          path: "/",
        });
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Purchase unsuccessful!"
        });
      }
    },
    async successfulPurchaseAfterCreditCardDialog() {
      let today = date.formatDate(new Date(), 'YYYY-MM-DD');
      let purchaseTransaction = {
        buyerFirstName: this.buyerForm.firstName,
        buyerLastName: this.buyerForm.lastName,
        buyerEmail: this.buyerForm.email,
        buyerStreet: this.buyerForm.street,
        buyerPhoneNumber: this.buyerForm.phoneNumber,
        buyerPostalCode: this.buyerForm.postalCode,
        userId: this.securityStore.user !== null ? this.securityStore.user.id : null,
        totalPrice: this.cartStore.shoppingCartTotal(),
        dateOfPurchase: today,
        paymentType: "credit-card"
      };
      await this.sendPurchaseApi(purchaseTransaction);

    },
    closeCreditCardDialog() {
      this.creditCardPrompt = false;
    },
    showCreditCardPrompt() {
      this.creditCardPrompt = !this.creditCardPrompt;
    },
    modifyListOfProductsForPurchase() {
      let modifiedProductsForPurchase = [];
      for (let product of this.products) {
        let modifiedProduct = {
          productId: product.id,
          amount: product.selectedAmount,
          price: product.price,
          productType: product.productType,
        }
        modifiedProductsForPurchase.push(modifiedProduct);
      }
      return modifiedProductsForPurchase;
    },
  }
}
</script>

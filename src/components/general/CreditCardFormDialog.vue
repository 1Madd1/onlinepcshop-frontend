<template>
  <q-dialog v-model="creditCardPrompt" @hide="dialogHidden">
    <q-card style="min-width: 350px">
      <q-form @submit.prevent="methodToInvoke" ref="creditCardForm">
        <q-card-section class="q-pt-lg">
          <label class="text-bold">Card Number</label>
          <q-input dense v-model="creditCardForm.cardNumber" :rules="rules.cardNumberRule" hint="Hint: 6163-####-####-####" mask="####-####-####-####" />
        </q-card-section>

        <q-card-section class="q-pt-lg">
          <label class="text-bold">Name On Card</label>
          <q-input dense v-model="creditCardForm.nameOnCard" hint="Hint: John Doe" :rules="rules.nameOnCardRule" />
        </q-card-section>

        <div class="row">
          <q-card-section class="q-pt-lg">
            <label class="text-bold">Expiry Date</label>
            <q-input dense v-model="creditCardForm.expiryDate" hint="Hint: 02/25" mask="##/##" :rules="rules.expiryDateRule" />
          </q-card-section>
          <q-card-section class="q-pt-lg">
            <label class="text-bold">CVV</label>
            <q-input dense v-model="creditCardForm.cvv" hint="Hint: 412" mask="###" :rules="rules.cvvRule" />
          </q-card-section>
        </div>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" type="submit" class="full-width" label="Save" :disable="isPaymentPage ? false : checkIfCreditCardFormIsChanged" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
import {Notify} from "quasar";
import apiClient from "src/lib/api-clients/api-client";
import {useSecurityStore} from "stores/securityStore";

export default {
  emits: ["dialogClosed", "successfulPurchase"],
  props: {
    pCreditCardForm: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          cardNumber: null,
          nameOnCard: null,
          expiryDate: null,
          ccv: null
        };
      }
    },
    pCreditCard: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          cardNumber: null,
          nameOnCard: null,
          expiryDate: null,
          ccv: null
        };
      }
    },
    pCreditCardPrompt: {
      type: Boolean,
      required: false,
      default: false,
    },
    pIsPaymentPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      creditCardForm: {
        id: null,
        cardNumber: null,
        nameOnCard: null,
        expiryDate: null,
        ccv: null
      },
      creditCard: {
        id: null,
        cardNumber: null,
        nameOnCard: null,
        expiryDate: null,
        ccv: null
      },
      creditCardPrompt: false,
      securityStore: useSecurityStore(),
      isPaymentPage: false,
      methodToInvoke: null,
      rules: {
        cardNumberRule: [
          (val) => val !== null && val.length === 19 || "Insert valid card number!"
        ],
        nameOnCardRule: [
          (val) => val !== null && val.length > 0 || "Insert valid name on card!"
        ],
        expiryDateRule: [
          (val) => val !== null && val.length === 5 && this.expiryDateValidation(val) || "Insert valid postal code!"
        ],
        cvvRule: [
          (val) => val !== null && val !== undefined && val.length === 3 || "Insert valid cvv!"
        ],
      },
    };
  },
  watch: {
    pCreditCardPrompt(newValue) {
      this.creditCardPrompt = newValue;
    },
    pCreditCardForm(newValue) {
      this.creditCardForm = newValue;
    },
    pCreditCard(newValue) {
      this.creditCard = newValue;
    },
    pIsPaymentPage(newValue) {
      this.isPaymentPage = newValue;
    },
  },
  created() {
    this.creditCard = this.pCreditCard;
    this.creditCardForm = this.pCreditCardForm;
    this.creditCardPrompt = this.pCreditCardPrompt;
    this.isPaymentPage = this.pIsPaymentPage;
    this.methodToInvoke = this.pIsPaymentPage ? this.purchase : this.addCreditCard;
  },
  computed: {
    checkIfCreditCardFormIsChanged() {
      let loadedCreditCardWithoutId = this.creditCard;
      loadedCreditCardWithoutId.id = null;
      if (!loadedCreditCardWithoutId.cardNumber === null) {
        if (JSON.stringify(this.creditCardForm) === JSON.stringify(loadedCreditCardWithoutId)) {
          Notify.create({
            color: "negative",
            icon: "warning",
            message: "Credit card with this information has already been added!"
          });
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    async addCreditCard() {
      let lastPartOfMessage = "added!";
      let creditCard;
      if (this.checkIfUserHasCreditCard) {
        creditCard = await apiClient.request("put","/credit-card", null, this.creditCardForm);
        lastPartOfMessage = "updated!";
      } else {
        let creditCardCreateRequest = {
          userId: this.securityStore.user.id,
          creditCard: this.creditCardForm
        }
        creditCard = await apiClient.request("post","/credit-card", null, creditCardCreateRequest);
      }
      if (creditCard !== null) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "Credit card starting with " + creditCard.cardNumber.substring(0,4) + " has been " + lastPartOfMessage,
        });
        location.reload();
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Credit card has not been " + lastPartOfMessage
        });
      }
    },
    purchase() {
      this.$emit("successfulPurchase");
      this.creditCardPrompt = null;
      this.creditCard = null;
      this.creditCardForm = null;
      return;
    },
    dialogHidden() {
      this.$emit("dialogClosed");
    },
    expiryDateValidation(val) {
      let today, exDay;
      let exMonth= parseInt(val.substring(0,2));
      let exYear= parseInt(val.substring(3,5));
      if (exMonth > 12 || exMonth < 1) {
        return false;
      }
      today = new Date();
      exDay = new Date();
      exDay.setFullYear((2000 + exYear), exMonth - 1, 1);

      if (exDay < today) {
        return false;
      }
      return true;
    },

  },
}
</script>

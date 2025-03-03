<template>
  <div v-if="!checkIfCartIsEmpty" class="row cart-page" id="cart-page" ref="cartPage" :style="cartPageHeight">
    <div class="col-8 q-mt-lg q-ml-xl">
      <table ref="productTable" id="productTable">
        <thead>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 10%;">
            <img v-if="product.image !== null && product.image !== ''" :src=product.image width="100%" height="100%" />
            <img v-else src="src/img/unavailable-image.png" width="100%" />
          </td>
          <td v-if="product.componentName !== undefined" style="width: 30%;">{{ product.componentName }}</td>
          <td v-else style="width: 30%;">{{ product.computerName }}</td>
          <td v-if="product.saleType !== null" class="price" style="color: red">{{ utilMethods.priceWithDots(product.price) }} RSD</td>
          <td v-else class="price">{{ utilMethods.priceWithDots(product.price) }} RSD</td>
          <td>
            <div class="quantity-input grid-container">
              <q-btn round flat class="grid-item" @click="decreaseSelectedAmount(product)" label="-" text-color="black" />
              <div class="product-quantity grid-item">
                {{ product.selectedAmount }}
              </div>
              <q-btn round flat class="grid-item" @click="increaseSelectedAmount(product)" label="+" text-color="black" />
            </div>
          </td>
          <td v-if="product.saleType !== null" style="color: red" class="total-price">{{ utilMethods.priceWithDots(product.price * product.selectedAmount) }} RSD</td>
          <td v-else class="total-price">{{ utilMethods.priceWithDots(product.price * product.selectedAmount) }} RSD</td>
          <td><q-btn round flat @click="removeProduct(product)" label="X" text-color="black" /></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-3 text-center shopping-cart-overview q-mt-lg q-ml-xl" style="height: 260px;">
      <h5>Shopping Cart Overview</h5>
      <h5>Total Price: {{ utilMethods.priceWithDots(shoppingCartTotalPrice) }} RSD</h5>
      <q-btn
        color="green"
        style="width: 90%"
        size="lg"
        rounded
        class="glossy q-mb-md"
        label="Continue"
        @click="goToPurchasePage"
      />
    </div>
  </div>
  <div v-else class="col text-center" style="height: 90vh; padding-top: 7%">
    <q-img width="20%" src="https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Sale-Stickers-PNG/Shopping_Cart_Icon_PNG_Clipart.png?m=1629833029" style="margin-bottom: 2%; margin-right: 4%" />
    <h2>Your Shopping cart is empty</h2>
    <q-btn label="Return To Home Screen" rounded glossy color="primary" @click="returnOnHomePage"/>
  </div>

</template>
<script>

import {useCartStore} from "stores/cartStore";
import utilMethods from "../components/util/util-methods";
import {Notify} from "quasar";

export default {
  data() {
    return {
      products: [],
      cartPageHeight: { height : "auto"},
      cartStore: useCartStore(),
    }
  },
  mounted() {
    this.matchHeight();
  },
  async created() {
    this.products = this.cartStore.arrayOfProducts();
  },
  computed: {
    utilMethods() {
      return utilMethods;
    },
    shoppingCartTotalPrice() {
      let totalPrice = 0;
      for (let product of this.products) {
        totalPrice += (product.price * product.selectedAmount);
      }
      return totalPrice;
    },
    checkIfCartIsEmpty() {
      if (this.cartStore.products.length === 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    matchHeight() {
      if (this.products.length < 6) {
        this.cartPageHeight.height = "90vh";
      } else {
        this.cartPageHeight.height = "auto";
      }
    },
    increaseSelectedAmount(product) {
      if (product.selectedAmount < product.quantity){
        product.selectedAmount++;
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "You can't increase product amount! Current available amount: " + product.quantity
        });
      }
    },
    decreaseSelectedAmount(product) {
      if (product.selectedAmount > 1){
        product.selectedAmount--;
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "You can't decrease product amount below 1!"
        });
      }
    },
    removeProduct(product) {
      this.products = this.products.filter(p => p.id != product.id);
      this.cartStore.products = this.cartStore.products.filter(p => p.id != product.id);
      this.matchHeight();
    },
    returnOnHomePage() {
      this.$router.push({
        path: "/",
      });
    },
    goToPurchasePage() {
      this.$router.push({
        path: "/purchasing-page",
      });
    }
  }
}
</script>

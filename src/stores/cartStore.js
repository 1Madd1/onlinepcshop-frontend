import { defineStore } from 'pinia';
import UtilMethods from "components/util/util-methods";

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    products: [],
  }),
  getters: {

  },
  actions: {
    arrayOfProducts() {
      return this.products;
    },
    numberOfUniqueProducts() {
      return this.products.length;
    },
    addProduct(newProduct) {
      newProduct.productType = UtilMethods.getProductType(newProduct);
      for (let product of this.products) {
        if (newProduct.id === product.id) {
          product.selectedAmount++;
          return true;
        }
      }
      this.products.push(newProduct);
      return true;
    },
    removeProduct(product) {
      this.products = this.products.filter(p => p.id != product.id);
    },
    clearProducts() {
      this.products = [];
    },
    shoppingCartTotal() {
      let total = 0
      for (let product of this.products) {
        total += (product.price * product.selectedAmount);
      }
      return total;
    }
  },
});

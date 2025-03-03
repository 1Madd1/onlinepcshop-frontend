<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="powerSupplyForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="powerSupply.componentName"
            :rules="rules.componentNameRule"
            outlined
            label="Component Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="powerSupply.quantity"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="powerSupply.price"
            :rules="rules.priceRule"
            outlined
            label="Price"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="powerSupply.manufacturer"
            :rules="rules.manufacturerRule"
            :options="manufacturers"
            label="Manufacturer"
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="powerSupply.efficiencyRating"
            :rules="rules.efficiencyRatingRule"
            :options="efficiencyRatings"
            label="Efficiency Rating" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="powerSupply.wattage"
            :rules="rules.wattageRule"
            outlined
            label="Wattage"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="powerSupply.color"
            :rules="rules.colorRule"
            :options="colors"
            label="Color" />
        </div>

        <div class="q-mb-lg q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="powerSupply.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="powerSupply.image"
            outlined
            label="Image link"
            dense
          />
        </div>

        <div style="padding: 0.9%">
          <q-checkbox v-model="hasSale" label="Has Sale" color="teal" />
        </div>

        <div v-if="hasSale" class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="powerSupply.saleType"
            :rules="rules.saleTypeRule"
            :options="saleTypes"
            label="Sale Type" />
        </div>

        <div>
          <q-btn :label="addOrUpdateButton.displayText" class="q-mr-sm q-ml-md" type="submit" color="primary" :disable="updateButtonDisabled"/>
          <q-btn v-if="!pEditMode" :label="addAndNewFormButtonDisplayText" class="q-mr-sm" type="button" color="primary" @click="addAndClearForm" />
        </div>
      </q-form>
    </fieldset>
  </div>
</template>
<script>
import {date, Notify} from "quasar";
import apiClient from "src/lib/api-clients/api-client";
import {useSecurityStore} from "stores/securityStore";

export default {
  props: {
    pEditMode: {
      type: Boolean,
      default: false
    },
    pPowerSupply: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          dateOfCreation: null,
          currency: "RSD",
          wattage: null,
          color: null,
          efficiencyRating: null,
          manufacturer: null,
          description: null,
          image: null,
          saleType: null,
        }
      }
    }
  },
  data() {
    return {
      securityStore: useSecurityStore(),
      powerSupply: JSON.parse(JSON.stringify(this.pPowerSupply)),
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updatePowerSupply : () => {this.addNewPowerSupply()},
      },
      manufacturers: ["CORSAIR", "NZXT", "COOLER_MASTER", "ASUS"],
      efficiencyRatings: ["80+", "80+ Titanium", "80+ Platinum", "80+ Gold", "80+ Silver", "80+ Bronze"],
      colors: ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE", "BROWN", "BLACK", "WHITE",
        "BLACK_BROWN", "BLACK_GREEN", "BLACK_YELLOW", "BLACK_ORANGE",
        "WHITE_BROWN", "WHITE_GREEN", "WHITE_YELLOW", "WHITE_ORANGE", "WHITE_BLACK",
        "GOLD", "GOLD_BLACK", "GOLD_WHITE"],
      hasSale: false,
      saleTypes: [
        {
          label: "SALE 10% OFF",
          value: "SALE_10"
        },
        {
          label: "SALE 15% OFF",
          value: "SALE_15"
        },
        {
          label: "SALE 20% OFF",
          value: "SALE_20"
        },
        {
          label: "SALE 25% OFF",
          value: "SALE_25"
        },
        {
          label: "SALE 30% OFF",
          value: "SALE_30"
        },
        {
          label: "SALE 35% OFF",
          value: "SALE_35"
        },{
          label: "SALE 40% OFF",
          value: "SALE_40"
        },
        {
          label: "SALE 45% OFF",
          value: "SALE_45"
        },
        {
          label: "SALE 50% OFF",
          value: "SALE_50"
        }
      ],
      addAndNewFormButtonDisplayText: "Add & Continue on New Form",
      rules: {
        componentNameRule: [
          (val, rules) => val !== null && val.length > 0 || 'Insert valid component name!'
        ],
        quantityRule: [
          (val) => val !== null && val.length > 0 || "Insert valid quantity amount!"
        ],
        priceRule: [
          (val) => val !== null && val.length > 0 || "Insert valid price!"
        ],
        manufacturerRule: [
          (val) => val !== null && val.length > 0 || "Insert valid manufacturer!"
        ],
        efficiencyRatingRule: [
          (val) => val !== null && val.length > 0 || "Insert valid efficiency rating!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
        ],
        wattageRule: [
          (val) => val !== null && val.length > 0 && parseInt(val) >= 200 || "Insert valid wattage!"
        ],
        colorRule: [
          (val) => val !== null && val.length > 0 || "Insert valid color!"
        ],
        imageRule: [
          (val) => val !== null && val.length > 0 || "Insert valid image link/url!"
        ],
      },
    }
  },
  computed: {
    updateButtonDisabled() {
      return this.pEditMode && JSON.stringify(this.pPowerSupply) === JSON.stringify(this.powerSupply);
    },
    legendText() {
      return this.pEditMode ? "Power Supply Info" : "Creating New Power Supply";
    }
  },
  created() {
    if (this.pEditMode) {
      if (this.pPowerSupply !== null) {
        if (this.pPowerSupply.saleType !== null) {
          this.hasSale = true;
        }
      }
      this.turnNumbersToString(this.powerSupply);
    }
  },
  methods: {
    async addNewPowerSupply(ignore = false) {
      this.checkSaleType();
      this.powerSupply.dateOfCreation = date.formatDate(new Date(), 'YYYY-MM-DD');
      let powerSupply = await apiClient.request('post', '/power-supply', null, this.powerSupply);
      if (powerSupply !== null) {
        Notify.create("Power supply " + powerSupply.componentName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewPowerSupply(true);
      this.clearData();
      this.$refs.powerSupplyForm.reset();
    },
    async updatePowerSupply() {
      this.checkSaleType();
      let powerSupply = await apiClient.request('put', '/power-supply', null, this.powerSupply);
      if (powerSupply !== null) {
        Notify.create("Power supply " + powerSupply.componentName + " has been edited!");
        this.$router.go(-1);
      }
    },
    clearData() {
      this.clearJsonObject(this.powerSupply);
      this.powerSupply.currency = "RSD";
      this.hasSale = false;
    },
    turnNumbersToString(jsonObject) {
      for (const key in jsonObject) {
        if (typeof jsonObject[key] == "number") {
          jsonObject[key] = jsonObject[key] + '';
        }
      }
    },
    clearJsonObject(jsonObject) {
      for (const key in jsonObject) {
        if (typeof jsonObject[key] == "string") {
          jsonObject[key] = '';
        } else if (Array.isArray(jsonObject[key])) {
          jsonObject[key] = [];
        }
      }
    },
    checkSaleType() {
      if (this.hasSale) {
        if (this.powerSupply.saleType.hasOwnProperty("value")) {
          this.powerSupply.saleType = this.powerSupply.saleType.value;
        }
      } else {
        this.powerSupply.saleType = null;
      }
    },
  }
}
</script>

<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="computerCaseForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="computerCase.componentName"
            :rules="rules.componentNameRule"
            outlined
            label="Component Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="computerCase.quantity"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="computerCase.price"
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
            v-model="computerCase.manufacturer"
            :rules="rules.manufacturerRule"
            :options="manufacturers"
            label="Manufacturer"
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computerCase.caseType"
            :rules="rules.caseTypeRule"
            :options="caseTypes"
            label="Case Type" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computerCase.color"
            :rules="rules.colorRule"
            :options="colors"
            label="Color" />
        </div>

        <div class="q-mb-lg q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="computerCase.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <!--            :rules="rules.imageRule"-->
          <q-input
            v-model="computerCase.image"
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
            v-model="computerCase.saleType"
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
import {Notify} from "quasar";
import apiClient from "src/lib/api-clients/api-client";
import {useSecurityStore} from "stores/securityStore";

export default {
  props: {
    pEditMode: {
      type: Boolean,
      default: false
    },
    pComputerCase: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          caseType: null,
          color: null,
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
      computerCase: JSON.parse(JSON.stringify(this.pComputerCase)),
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateComputerCase : () => {this.addNewComputerCase()},
      },
      manufacturers: ["COOLER_MASTER", "NZXT"],
      caseTypes: ["ATX_DESKTOP", "ATX_FULL_TOWER", "ATX_MID_TOWER", "ATX_MINI_TOWER", "ATX_TEST_BENCH", "HTPC",
      "MICROATX_DESKTOP", "MICROATX_MID_TOWER", "MICROATX_MINI_TOWER", "MICROATX_SLIM", "MINI_ITX_DESKTOP",
        "MINI_ITX_TEST_BENCH", "MINI_ITX_TOWER"],
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
        caseTypeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid Case type!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
        ],
        tdpRule: [
          (val) => val !== null && val.length > 0 || "Insert valid tdp!"
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
      return this.pEditMode && JSON.stringify(this.pComputerCase) === JSON.stringify(this.computerCase);
    },
    legendText() {
      // Srediti kod ostalih komponenata da pise veliko slovo
      return this.pEditMode ? "Computer Case Info" : "Creating New Computer Case";
    }
  },
  created() {
    if (this.pEditMode) {
      if (this.pComputerCase !== null) {
        if (this.pComputerCase.saleType !== null) {
          this.hasSale = true;
        }
      }
      this.turnNumbersToString(this.computerCase);
    }
  },
  methods: {
    async addNewComputerCase(ignore = false) {
      this.checkSaleType();
      let computerCase = await apiClient.request('post', '/computer-case', null, this.computerCase);
      if (computerCase !== null) {
        Notify.create("Computer case " + computerCase.componentName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewComputerCase(true);
      this.clearData();
      this.$refs.computerCaseForm.reset();
    },
    async updateComputerCase() {
      this.checkSaleType();
      let computerCase = await apiClient.request('put', '/computer-case', null, this.computerCase);
      if (computerCase !== null) {
        Notify.create("Computer case " + computerCase.componentName + " has been edited!");
        this.$router.go(-1);
      }
    },
    clearData() {
      this.clearJsonObject(this.computerCase);
      this.computerCase.currency = "RSD";
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
        if (this.computerCase.saleType.hasOwnProperty("value")) {
          this.computerCase.saleType = this.computerCase.saleType.value;
        }
      } else {
        this.computerCase.saleType = null;
      }
    },
  }
}
</script>

<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="caseFanForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="caseFan.componentName"
            :rules="rules.componentNameRule"
            outlined
            label="Component Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="caseFan.quantity"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="caseFan.price"
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
            v-model="caseFan.manufacturer"
            :rules="rules.manufacturerRule"
            :options="manufacturers"
            label="Manufacturer"
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="caseFan.fanSize"
            :rules="rules.fanSizeRule"
            outlined
            label="Fan Size"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="caseFan.color"
            :rules="rules.colorRule"
            :options="colors"
            label="Color" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="caseFan.rpm"
            :rules="rules.rpmRule"
            outlined
            label="RPM"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="caseFan.noiseLevel"
            :rules="rules.noiseLevelRule"
            outlined
            label="Noise Level"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="caseFan.tdp"
            :rules="rules.tdpRule"
            outlined
            label="TDP"
            dense
          />
        </div>

        <div class="q-mb-lg q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="caseFan.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="caseFan.image"
            :rules="rules.imageRule"
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
            v-model="caseFan.saleType"
            :rules="rules.saleTypeRule"
            :options="saleTypes"
            label="Sale Type" />
        </div>

<!--        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">-->
<!--          <q-select outlined dense v-model="caseFan.manufacturer" :options="manufacturers" label="Manufacturer" />-->
<!--        </div>-->

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
    pCaseFan: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          fanSize: null,
          color: null,
          rpm: null,
          noiseLevel: null,
          tdp: null,
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
      caseFan: JSON.parse(JSON.stringify(this.pCaseFan)),
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateCaseFan : () => {this.addNewCaseFan()},
      },
      colors: ["RED", "BLUE"],
      manufacturers: ["TOSHIBA", "ASROCK", "EVGA"],
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
        fanSizeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid fan size!"
        ],
        colorRule: [
          (val) => val !== null && val.length > 0 || "Insert valid color!"
        ],
        rpmRule: [
          (val) => val !== null && val.length > 0 || "Insert valid rpm!"
        ],
        noiseLevelRule: [
          (val) => val !== null && val.length > 0 || "Insert valid noise level!"
        ],
        tdpRule: [
          (val) => val !== null && val.length > 0 || "Insert valid tdp!"
        ],
        imageRule: [
          (val) => val !== null && val.length > 0 || "Insert valid image link/url!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
        ],
      },
    }
  },
  computed: {
    updateButtonDisabled() {
      return this.pEditMode && JSON.stringify(this.pCaseFan) === JSON.stringify(this.caseFan);
    },
    legendText() {
      return this.pEditMode ? "Case Fan info" : "Creating New Case Fan";
    }
  },
  created() {
    if (this.pEditMode) {
      if (this.pCaseFan !== null) {
        if (this.pCaseFan.saleType !== null) {
          this.hasSale = true;
        }
      }
      this.turnNumbersToString(this.caseFan);
    }
  },
  methods: {
    async addNewCaseFan(ignore = false) {
      this.checkSaleType();
      let caseFan = await apiClient.request('post', '/case-fan', null, this.caseFan);
      if (caseFan !== null) {
        Notify.create("Case fan " + caseFan.componentName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewCaseFan(true);
      this.clearData();
      this.$refs.caseFanForm.reset();
    },
    async updateCaseFan() {
      this.checkSaleType();
      let caseFan = await apiClient.request('put', '/case-fan', null, this.caseFan);
      if (caseFan !== null) {
        Notify.create("Case fan " + caseFan.componentName + " has been edited!");
        this.$router.go(-1);
      }
    },
    clearData() {
      this.clearJsonObject(this.caseFan);
      this.caseFan.currency = "RSD";
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
    turnNumbersToString(jsonObject) {
      for (const key in jsonObject) {
        if (typeof jsonObject[key] == "number") {
          jsonObject[key] = jsonObject[key] + '';
        }
      }
    },
    checkSaleType() {
      if (this.hasSale) {
        if (this.caseFan.saleType.hasOwnProperty("value")) {
          this.caseFan.saleType = this.caseFan.saleType.value;
        }
      } else {
        this.caseFan.saleType = null;
      }
    },
  }
}
</script>

<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="ramForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="ram.componentName"
            :rules="rules.componentNameRule"
            outlined
            label="Component Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="ram.quantity"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="ram.price"
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
            v-model="ram.manufacturer"
            :rules="rules.manufacturerRule"
            :options="manufacturers"
            label="Manufacturer"
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="ram.memoryType"
            :rules="rules.memoryTypeRule"
            :options="memoryTypes"
            label="Memory Type" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="ram.ramSpeed"
            :rules="rules.ramSpeedRule"
            outlined
            label="Ram Speed (MHz)"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="ram.ramStorage"
            :rules="rules.ramStorageRule"
            :options="ramStorages"
            label="Ram Storage (in GB)" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="ram.tdp"
            :rules="rules.tdpRule"
            outlined
            label="TDP"
            dense
          />
        </div>

        <div class="q-mb-lg q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="ram.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <!--            :rules="rules.imageRule"-->
          <q-input
            v-model="ram.image"
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
            v-model="ram.saleType"
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
    pRam: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          memoryType: null,
          ramSpeed: null,
          ramStorage: null,
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
      ram: JSON.parse(JSON.stringify(this.pRam)),
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateRam : () => {this.addNewRam()},
      },
      manufacturers: ["SAMSUNG", "KINGSTON", "CORSAIR"],
      memoryTypes: ["DDR2", "DDR3", "DDR4", "DDR5"],
      ramStorages: [8, 16, 24, 32, 64],
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
        memoryTypeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid Memory type!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
        ],
        tdpRule: [
          (val) => val !== null && val.length > 0 || "Insert valid tdp!"
        ],
        ramSpeedRule: [
          (val) => val !== null && val.length > 0 || "Insert valid ram speed!"
        ],
        ramStorageRule: [
          (val) => val !== null || "Insert valid ram storage!"
        ],
        imageRule: [
          (val) => val !== null && val.length > 0 || "Insert valid image link/url!"
        ],
      },
    }
  },
  computed: {
    updateButtonDisabled() {
      return this.pEditMode && JSON.stringify(this.pRam) === JSON.stringify(this.ram);
    },
    legendText() {
      return this.pEditMode ? "Ram info" : "Creating New Ram";
    }
  },
  created() {
    if (this.pEditMode) {
      if (this.pRam !== null) {
        if (this.pRam.saleType !== null) {
          this.hasSale = true;
        }
      }
      this.turnNumbersToString(this.ram);
    }
  },
  methods: {
    async addNewRam(ignore = false) {
      this.checkSaleType();
      let ram = await apiClient.request('post', '/ram', null, this.ram);
      if (ram !== null) {
        Notify.create("Ram " + ram.componentName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewRam(true);
      this.clearData();
      this.$refs.ramForm.reset();
    },
    async updateRam() {
      this.checkSaleType();
      let ram = await apiClient.request('put', '/ram', null, this.ram);
      if (ram !== null) {
        Notify.create("Ram " + ram.componentName + " has been edited!");
        this.$router.go(-1);
      }
    },
    clearData() {
      this.clearJsonObject(this.ram);
      this.ram.currency = "RSD";
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
        if (this.ram.saleType.hasOwnProperty("value")) {
          this.ram.saleType = this.ram.saleType.value;
        }
      } else {
        this.ram.saleType = null;
      }
    },
  }
}
</script>

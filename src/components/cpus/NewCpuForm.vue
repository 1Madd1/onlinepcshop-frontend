<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="cpuForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="cpu.componentName"
            :rules="rules.componentNameRule"
            outlined
            label="Component Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="cpu.quantity"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="cpu.price"
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
            v-model="cpu.manufacturer"
            :rules="rules.manufacturerRule"
            :options="manufacturers"
            label="Manufacturer"
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="cpu.socketType"
            :rules="rules.socketTypeRule"
            :options="socketTypes"
            label="Socket Type" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="cpu.coreCount"
            :rules="rules.coreCountRule"
            outlined
            label="Core Count"
            dense
          />
        </div>

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="cpu.performanceCoreClock"
            :rules="rules.performanceCoreClockRule"
            outlined
            label="Performance Core Clock"
            dense
          />
        </div>

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="cpu.performanceCoreBoostClock"
            :rules="rules.performanceCoreBoostClockRule"
            outlined
            label="Performance Core Boost Clock"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="cpu.tdp"
            :rules="rules.tdpRule"
            outlined
            label="TDP"
            dense
          />
        </div>

        <div class="q-mb-lg q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="cpu.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="cpu.image"
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
            v-model="cpu.saleType"
            :rules="rules.saleTypeRule"
            :options="saleTypes"
            label="Sale Type" />
        </div>

        <div style="padding: 0.9%">
            <q-checkbox v-model="cpu.includesCooler" label="Includes Cooler" color="teal" />
            <q-checkbox v-model="cpu.includesIntegratedGpu" label="Includes Integrated GPU" color="teal" />
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
    pCpu: {
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
          socketType: null,
          coreCount: null,
          performanceCoreClock: null,
          performanceCoreBoostClock: null,
          tdp: null,
          manufacturer: null,
          description: null,
          image: null,
          includesCooler: false,
          includesIntegratedGpu: false,
          saleType: null,
        }
      }
    }
  },
  data() {
    return {
      securityStore: useSecurityStore(),
      cpu: JSON.parse(JSON.stringify(this.pCpu)),
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateCpu : () => {this.addNewCpu()},
      },
      manufacturers: ["INTEL", "AMD"],
      socketTypes: ["LGA1700", "AM4", "STR5", "AM5"],
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
        socketTypeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid socket type!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
        ],
        coreCountRule: [
          (val) => val !== null && val.length > 0 || "Insert valid core count!"
        ],
        performanceCoreClockRule: [
          (val) => val !== null && val.length > 0 || "Insert valid performance core clock!"
        ],
        performanceCoreBoostClockRule: [
          (val) => val !== null && val.length > 0 || "Insert valid performance core boost clock!"
        ],
        tdpRule: [
          (val) => val !== null && val.length > 0 || "Insert valid tdp!"
        ],
        imageRule: [
          (val) => val !== null && val.length > 0 || "Insert valid image link/url!"
        ],
      },
    }
  },
  computed: {
    updateButtonDisabled() {
      return this.pEditMode && JSON.stringify(this.pCpu) === JSON.stringify(this.cpu);
    },
    legendText() {
      return this.pEditMode ? "Cpu info" : "Creating New Cpu";
    }
  },
  created() {
    if (this.pEditMode) {
      if (this.pCpu !== null) {
        if (this.pCpu.saleType !== null) {
          this.hasSale = true;
        }
      }
      this.turnNumbersToString(this.cpu);
    }
  },
  methods: {
    async addNewCpu(ignore = false) {
      this.checkSaleType();
      this.cpu.dateOfCreation = date.formatDate(new Date(), 'YYYY-MM-DD');
      let cpu = await apiClient.request('post', '/cpu', null, this.cpu);
      if (cpu !== null) {
        Notify.create("Cpu " + cpu.componentName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewCpu(true);
      this.clearData();
      this.$refs.cpuForm.reset();
    },
    async updateCpu() {
      this.checkSaleType();
      let cpu = await apiClient.request('put', '/cpu', null, this.cpu);
      if (cpu !== null) {
        Notify.create("Cpu " + cpu.componentName + " has been edited!");
        this.$router.go(-1);
      }
    },
    clearData() {
      this.clearJsonObject(this.cpu);
      this.cpu.currency = "RSD";
      this.hasSale = false;
      this.cpu.includesIntegratedGpu = false;
      this.cpu.includesCooler = false;
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
        if (this.cpu.saleType.hasOwnProperty("value")) {
          this.cpu.saleType = this.cpu.saleType.value;
        }
      } else {
        this.cpu.saleType = null;
      }
    },
  }
}
</script>

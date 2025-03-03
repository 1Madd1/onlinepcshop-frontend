<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="motherboardForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="motherboard.componentName"
            :rules="rules.componentNameRule"
            outlined
            label="Component Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="motherboard.quantity"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="motherboard.price"
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
            v-model="motherboard.manufacturer"
            :rules="rules.manufacturerRule"
            :options="manufacturers"
            label="Manufacturer"
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="motherboard.socketType"
            :rules="rules.socketTypeRule"
            :options="socketTypes"
            label="Socket Type" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="motherboard.memoryType"
            :rules="rules.memoryTypeRule"
            :options="memoryTypes"
            label="Memory Type" />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="motherboard.tdp"
            :rules="rules.tdpRule"
            outlined
            label="TDP"
            dense
          />
        </div>

        <div class="q-mb-lg q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="motherboard.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="motherboard.image"
            outlined
            label="Image link"
            dense
          />
        </div>

        <fieldset class="form-filedset col-12 motherboard-fieldset">
          <legend class="form-filedset-legend">PCIe Interfaces</legend>

          <div class="row">
            <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-select
                outlined
                dense
                v-model="pcieInterface"
                :rules="rules.pcieTypeRule"
                :options="pcieTypes"
                label="Select PCIe Interface" />
            </div>

            <div class="q-mb-sm q-pt-xs q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-btn
                round
                size="sm"
                color="primary"
                label="+"
                @click="assignPcieInterface"/>
            </div>
          </div>

          <div v-for="pInterface in pcieInterfaces" :key="pInterface.tempId" class="row">
            <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-input v-model="pInterface.pcieType" outlined filled disable label="PCIe type" stack-label dense/>
            </div>
            <div class="q-mb-sm q-pt-xs q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-btn round size="sm" color="red-7" label="-" @click="unassignPcieInterface(pInterface.tempId)"/>
            </div>
          </div>
        </fieldset>

        <fieldset class="form-filedset col-12 motherboard-fieldset">
          <legend class="form-filedset-legend">Storage Interfaces</legend>

          <div class="row">
            <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-select
                outlined
                dense
                v-model="storageInterface"
                :options="storageTypes"
                label="Select Storage Interface" />
            </div>

            <div class="q-mb-sm q-pt-xs q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-btn
                round
                size="sm"
                color="primary"
                label="+"
                @click="assignStorageInterface"/>
            </div>
          </div>

          <div v-for="sInterface in storageInterfaces" :key="sInterface.tempId" class="row">
            <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-input v-model="sInterface.storageType" outlined filled disable label="Storage type" stack-label dense/>
            </div>
            <div class="q-mb-sm q-pt-xs q-pr-none q-pr-md-xs col-md-4 col-12">
              <q-btn round size="sm" color="red-7" label="-" @click="unassignStorageInterface(sInterface.tempId)"/>
            </div>
          </div>
        </fieldset>

        <div style="padding: 0.9%">
          <q-checkbox v-model="hasSale" label="Has Sale" color="teal" />
        </div>

        <div v-if="hasSale" class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="motherboard.saleType"
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
    pMotherboard: {
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
          memoryType: null,
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
      motherboard: JSON.parse(JSON.stringify(this.pMotherboard)),
      motherboardPcieInterfaceAmount: 4,
      motherboardStorageInterfaceAmount: 4,
      pcieInterface: null,
      storageInterface: null,
      pcieInterfaces: [],
      storageInterfaces: [],
      pcieInterfacesToBeRemoved: [],
      storageInterfacesToBeRemoved: [],
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateMotherboard : () => {this.addNewMotherboard()},
      },
      manufacturers: ["ASUS", "ASROCK", "AMD", "ACER", "GIGABYTE", "EVGA"],
      socketTypes: ["LGA1700", "AM4", "STR5", "AM5"],
      memoryTypes: ["DDR2", "DDR3", "DDR4", "DDR5"],
      amounts: [1, 2, 3, 4],
      pcieTypes: [],
      storageTypes: [],
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
          (val) => val !== null && val.length > 0 || 'Insert valid component name!'
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
        memoryTypeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid memory type!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
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
      return this.pEditMode && JSON.stringify(this.pMotherboard) === JSON.stringify(this.motherboard);
    },
    legendText() {
      return this.pEditMode ? "Motherboard Info" : "Creating New Motherboard";
    },
  },
  created() {
    if (this.pEditMode) {
      if (this.pMotherboard !== null) {
        if (this.pMotherboard.saleType !== null) {
          this.hasSale = true;
        }
      }
      // Srediti da sve uzima putem jedno api poziva
      this.turnNumbersToString(this.motherboard);
      apiClient.request('get', '/storage-interface/find-all-by-motherboard-id?motherboardId=' + this.motherboard.id, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              tempId: this.generateRandomUUID(),
              id: val.id,
              storageType: val.storageType
            }
            this.storageInterfaces.push(tempObj);
          }
        }
      );
      apiClient.request('get', '/pcie-interface/find-all-by-motherboard-id?motherboardId=' + this.motherboard.id, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              tempId: this.generateRandomUUID(),
              id: val.id,
              pcieType: val.pcieType
            }
            this.pcieInterfaces.push(tempObj);
          }
        }
      );
    }
    apiClient.request('get', '/pcie-interface', null, null).then(
      result => {
        for(let val of result) {
          const tempObj = {
            label: val.pcieType,
            value: val
          }
          this.pcieTypes.push(tempObj);
        }
      }
    );
    apiClient.request('get', '/storage-interface', null, null).then(
      result => {
        for(let val of result) {
          const tempObj = {
            label: val.storageType,
            value: val
          }
          this.storageTypes.push(tempObj);
        }
      }
    );
  },
  methods: {
    async addNewMotherboard(ignore = false) {
      this.checkSaleType();
      this.motherboard.dateOfCreation = date.formatDate(new Date(), 'YYYY-MM-DD');
      const motherboardWithInterfacesRequest = {
        motherboard: this.motherboard,
        pcieInterfaceList: this.pcieInterfaces,
        storageInterfaceList: this.storageInterfaces
      }
      let motherboard = await apiClient.request('post', '/motherboard', null, motherboardWithInterfacesRequest);
      if (motherboard !== null) {
        Notify.create("Motherboard " + this.motherboard.componentName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }

    },
    async addAndClearForm() {
      await this.addNewMotherboard(true);
      this.clearData();
      this.$refs.motherboardForm.reset();
    },
    async updateMotherboard() {
      this.checkSaleType();
      const motherboardWithInterfacesRequest = {
        motherboard: this.motherboard,
        pcieInterfaceList: this.pcieInterfaces,
        storageInterfaceList: this.storageInterfaces,
        pcieInterfacesToBeRemovedList: this.pcieInterfacesToBeRemoved,
        storageInterfacesToBeRemovedList: this.storageInterfacesToBeRemoved
      }
      let result = await apiClient.request('put', '/motherboard', null, motherboardWithInterfacesRequest);
      if (result !== null) {
        Notify.create("Motherboard " + result.motherboard.componentName + " has been edited!");
        this.$router.go(-1);
      }

    },
    assignPcieInterface() {
      if (this.checkIfPcieInterfacesAreAboveLimit()) {
        return;
      }
      if (this.pcieInterface === null) {
        Notify.create("PCIe interface must be selected!");
        return;
      } else if (this.checkIfPcieInterfaceIsPresent()) {
        Notify.create("PCIe interface " + this.pcieInterface.value.pcieType + " is already assigned!");
        return;
      }
      this.pcieInterfacesToBeRemoved = this.pcieInterfacesToBeRemoved.filter(pi => pi.pcieInterfaceId !== this.pcieInterface.value.id);
      const assignedPcieInterface = {
        tempId: this.generateRandomUUID(),
        id: this.pcieInterface.value.id,
        pcieType: this.pcieInterface.value.pcieType
      }
      this.pcieInterfaces.push(assignedPcieInterface);
      this.pcieInterface = null;
    },
    unassignPcieInterface(piId) {
      let result = this.pcieInterfaces.filter(pi => pi.tempId === piId);
      let tempObj = {
        pcieInterfaceId: result[0].id,
        motherboardId: this.motherboard.id
      }
      this.pcieInterfacesToBeRemoved.push(tempObj);
      this.pcieInterfaces = this.pcieInterfaces.filter(pi => pi.tempId !== piId);
    },
    assignStorageInterface() {
      if (this.checkIfStorageInterfacesAreAboveLimit()) {
        return;
      }
      if (this.storageInterface === null) {
        Notify.create("Storage interface must be selected!");
        return;
      } else if (this.checkIfStorageInterfaceIsPresent()) {
        Notify.create("Storage interface " + this.storageInterface.value.storageType + " is already assigned!");
        return;
      }
      this.storageInterfacesToBeRemoved = this.storageInterfacesToBeRemoved.filter(si => si.storageInterfaceId !== this.storageInterface.value.id);
      const assignedStorageInterface = {
        tempId: this.generateRandomUUID(),
        id: this.storageInterface.value.id,
        storageType: this.storageInterface.value.storageType
      }
      this.storageInterfaces.push(assignedStorageInterface);
      this.storageInterface = null;
    },
    unassignStorageInterface(siId) {
      let result = this.storageInterfaces.filter(si => si.tempId === siId);
      this.storageInterfacesToBeRemoved.push({
        storageInterfaceId: result[0].id,
        motherboardId: this.motherboard.id
      });
      this.storageInterfaces = this.storageInterfaces.filter(si => si.tempId !== siId);
    },
    clearData() {
      this.clearJsonObject(this.motherboard);
      this.motherboard.currency = "RSD";
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
    checkIfPcieInterfacesAreAboveLimit() {
      if (this.pcieInterfaces.length === this.motherboardPcieInterfaceAmount) {
        Notify.create("PCIe interfaces has reached a limit of 4 interfaces!");
        return true;
      }
      return false;
    },
    checkIfStorageInterfacesAreAboveLimit() {
      if (this.storageInterfaces.length === this.motherboardStorageInterfaceAmount) {
        Notify.create("Storage interfaces has reached a limit of 4 interfaces!");
        return true;
      }
      return false;
    },
    checkIfPcieInterfaceIsPresent() {
      for (const val of this.pcieInterfaces) {
        if (val.pcieType === this.pcieInterface.value.pcieType) {
          return true;
        }
      }
      return false;
    },
    checkIfStorageInterfaceIsPresent() {
      for (const val of this.storageInterfaces) {
        if (val.storageType === this.storageInterface.value.storageType) {
          return true;
        }
      }
      return false;
    },
    checkSaleType() {
      if (this.hasSale) {
        if (this.motherboard.saleType.hasOwnProperty("value")) {
          this.motherboard.saleType = this.motherboard.saleType.value;
        }
      } else {
        this.motherboard.saleType = null;
      }
    },
    generateRandomUUID() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      );
    }
  }
}
</script>

<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="computerForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

        <div class="q-mb-sm q-mt-sm  q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="computer.computerName"
            :rules="rules.computerNameRule"
            outlined
            label="Computer Name"
            dense
          />
        </div>

        <div class="q-mb-sm q-mt-sm  q-pr-md-xs col-md-3 col-12">
          <q-input
            type="number"
            v-model="computer.quantity"
            min="1"
            :rules="rules.quantityRule"
            outlined
            label="Quantity"
            dense
          />
        </div>

        <div class="q-mb-sm  q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.computerType"
            :rules="rules.computerTypeRule"
            :options="computerTypes"
            label="Computer Type" />
        </div>

        <div v-if="computerCases.length !== 0" class="q-mb-sm  q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.computerCaseId"
            :rules="rules.computerCaseRule"
            :options="computerCases"
            label="Select Computer Case" />
        </div>

        <div v-if="motherboards.length !== 0" class="q-mb-sm  q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.motherboardId"
            :rules="rules.motherboardRule"
            :options="motherboards"
            label="Select Motherboard" />
        </div>

        <div v-if="cpus.length !== 0" class="q-mb-sm  q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.cpuId"
            :rules="rules.cpuRule"
            :options="cpus"
            label="Select Cpu" />
        </div>

        <div v-if="coolers.length !== 0" class="q-mb-sm  q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.coolerId"
            :rules="rules.coolerRule"
            :options="coolers"
            label="Select Cooler" />
        </div>

        <div v-if="gpus.length !== 0" class="q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.gpuId"
            :rules="rules.gpuRule"
            :options="gpus"
            label="Select Gpu" />
        </div>

        <fieldset v-if="fetchedRams.length !== 0" class="form-filedset col-12 computer-fieldset">
          <legend class="form-filedset-legend">Rams</legend>

          <div class="row">
            <div class="q-mb-sm q-mt-lg q-pr-md-xs col-md-8 col-12">
              <q-select
                outlined
                dense
                v-model="ram"
                :disable="ramFormDisabled"
                :rules="rules.ramRule"
                :options="fetchedRams"
                label="Select RAM" />
            </div>
            <div class="q-mb-sm q-mt-lg q-pt-xs q-pr-md-xs col-md-4 col-12">
              <q-btn
                round
                size="sm"
                color="primary"
                label="+"
                :disable="ramFormDisabled"
                @click="assignRam"/>
            </div>
          </div>

          <div v-for="ram in rams" :key="ram.tempId" class="row">
            <div class="q-mb-sm  q-pr-md-xs col-md-4 col-12">
              <q-input v-model="ram.componentName" outlined filled disable label="RAM" stack-label dense/>
            </div>
            <div class="q-mb-sm  q-pr-md-xs col-md-4 col-12">
              <q-input type="number" v-model="ram.quantity" min="1" max="4" :disable="ramFormDisabled" @click="checkComputerRamAmount" :rules="rules.ramQuantityRule" outlined label="Quantity" dense />
            </div>
            <div class="q-mb-sm q-pt-xs  q-pr-md-xs col-md-4 col-12">
              <q-btn round size="sm" color="red-7" label="-" @click="unassignRam(ram.tempId)"/>
            </div>
          </div>
        </fieldset>

        <fieldset v-if="fetchedStorages.length !== 0" class="form-filedset col-12 computer-fieldset">
          <legend class="form-filedset-legend">Storages</legend>

          <div class="row">
            <div class="q-mb-sm q-mt-lg q-pr-md-xs col-md-8 col-12">
              <q-select
                outlined
                dense
                v-model="storage"
                :disable="storageFormDisabled"
                :rules="rules.storageRule"
                :options="fetchedStorages"
                label="Select Storage" />
            </div>

            <div class="q-mb-sm q-pt-xs q-mt-lg q-pr-md-xs col-md-4 col-12">
              <q-btn
                round
                size="sm"
                color="primary"
                label="+"
                :disable="storageFormDisabled"
                @click="assignStorage"/>
            </div>
          </div>

          <div v-for="storage in storages" :key="storage.tempId" class="row">
            <div class="q-mb-sm  q-pr-md-xs col-md-4 col-12">
              <q-input v-model="storage.componentName" outlined filled disable label="Storage" stack-label dense/>
            </div>
            <div class="q-mb-sm  q-pr-md-xs col-md-4 col-12">
              <q-input type="number" v-model="storage.quantity" min="1" max="4" :disable="storageFormDisabled" @click="checkComputerStorageAmount" :rules="rules.storageQuantityRule" outlined label="Quantity" dense />
            </div>
            <div class="q-mb-sm q-pt-xs  q-pr-md-xs col-md-4 col-12">
              <q-btn round size="sm" color="red-7" label="-" @click="unassignStorage(storage.tempId)"/>
            </div>
          </div>
        </fieldset>

        <fieldset v-if="checkFetchedCaseFansLength" class="form-filedset col-12 computer-fieldset">
          <legend class="form-filedset-legend">Case Fans</legend>

          <div class="row">
            <div class="q-mb-sm q-mt-lg q-pr-md-xs col-md-8 col-12">
              <q-select
                outlined
                dense
                v-model="caseFan"
                :disable="caseFanFormDisabled"
                :rules="rules.caseFanRule"
                :options="fetchedCaseFans"
                label="Select Case Fan" />
            </div>

            <div class="q-mb-sm q-pt-xs q-mt-lg q-pr-md-xs col-md-4 col-12">
              <q-btn
                round
                size="sm"
                color="primary"
                label="+"
                :disable="caseFanFormDisabled"
                @click="assignCaseFan"/>
            </div>
          </div>

          <div v-for="cf in caseFans" :key="cf.tempId" class="row">
            <div class="q-mb-sm  q-pr-md-xs col-md-4 col-12">
              <q-input v-model="cf.componentName" outlined filled disable label="Case Fan" stack-label dense/>
            </div>
            <div class="q-mb-sm  q-pr-md-xs col-md-4 col-12">
              <q-input type="number" v-model="cf.quantity" min="1" max="3" :disable="caseFanFormDisabled" @click="checkComputerCaseFanAmount" :rules="rules.caseFanQuantityRule" outlined label="Quantity" dense />
            </div>
            <div class="q-mb-sm q-pt-xs  q-pr-md-xs col-md-4 col-12">
              <q-btn round size="sm" color="red-7" label="-" @click="unassignCaseFan(cf.tempId)"/>
            </div>
          </div>
        </fieldset>

        <div v-if="powerSupplys.length !== 0" class="q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.powerSupplyId"
            :rules="rules.powerSupplyRule"
            :options="powerSupplys"
            label="Select Power Supply" />
        </div>

        <div class="q-mb-lg q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="computer.description"
            outlined
            label="Description"
            dense
          />
        </div>

        <div class="q-mb-sm q-pr-md-xs col-md-3 col-12">
          <q-input
            v-model="computer.image"
            outlined
            label="Image link"
            dense
          />
        </div>

        <div style="padding: 0.9%">
          <q-checkbox v-model="hasSale" label="Has Sale" color="teal" />
        </div>

        <div v-if="hasSale" class="q-mb-sm  q-pr-md-xs col-md-3 col-12">
          <q-select
            outlined
            dense
            v-model="computer.saleType"
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
    pComputer: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          computerName: null,
          price: null,
          dateOfCreation: null,
          currency: "RSD",
          quantity: null,
          computerType: null,
          tdp: null,
          description: null,
          image: null,
          saleType: null,
          computerCaseId: null,
          gpuId: null,
          cpuId: null,
          coolerId: null,
          motherboardId: null,
          powerSupplyId: null,
        }
      }
    }
  },
  watch: {
    "computer.computerType"(newValue, oldValue) {
      if (newValue !== oldValue) {
      //   reset metoda
        this.storageFormDisabled = false;
        this.caseFanFormDisabled = false;
        this.ramFormDisabled = false;
        this.computerCases = [];
        this.motherboards = [];
        this.cpus = [];
        this.gpus = [];
        this.coolers = [];
        this.rams = [];
        this.fetchedRams = [];
        this.caseFans = [];
        this.fetchedCaseFans = [];
        this.storages = [];
        this.fetchedStorages = [];
        this.powerSupplys = [];
        this.computer.computerCaseId = null;
        this.computer.motherboardId = null;
        this.computer.cpuId = null;
        this.computer.gpuId = null;
        this.computer.powerSupplyId = null;
        this.computer.coolerId = null;
      }
      if (newValue === "BUSINESS") {
        this.ramAmountLimit = 2;
        this.storageAmountLimit = 2;
        this.fetchComputerCases(3000.00);
        this.fetchMotherboards(3000.00);
      } else if (newValue === "NORMAL") {
        this.ramAmountLimit = 4;
        this.storageAmountLimit = 3;
        this.caseFanAmountLimit = 2;
        this.fetchComputerCases(5000.00);
        this.fetchMotherboards(5000.00);
      } else if (newValue === "GAMING") {
        this.ramAmountLimit = 4;
        this.storageAmountLimit = 4;
        this.caseFanAmountLimit = 3;
        this.fetchComputerCases(100000.00);
        this.fetchMotherboards(100000.00);
      }
    },
    "computer.motherboardId"(newValue, oldValue) {
      if (newValue === null) {
        return;
      }
      this.storageFormDisabled = false;
      this.caseFanFormDisabled = false;
      this.ramFormDisabled = false;
      this.cpus = [];
      this.gpus = [];
      this.coolers = [];
      this.fetchedRams = [];
      this.fetchedCaseFans = [];
      this.fetchedStorages = [];
      this.powerSupplys = [];
      if (!this.pEditMode || !this.onEditLoad) {
        this.rams = [];
        this.storages = [];
        this.caseFans = [];
        this.computer.cpuId = null;
        this.computer.gpuId = null;
        this.computer.powerSupplyId = null;
        this.computer.coolerId = null;
      }
      const result = this.motherboards.filter(m => {
        return m.value.id === newValue.value.id;
      });
      this.loadCpus(result[0].value.socketType);
    },
    "computer.cpuId"(newValue, oldValue) {
      // Dodati posle biranja procesora da ucita cooler-e za druge slucajeve
      if (newValue === null) {
        return;
      }
      this.storageFormDisabled = false;
      this.caseFanFormDisabled = false;
      this.ramFormDisabled = false;
      this.gpus = [];
      this.coolers = [];
      this.fetchedRams = [];
      this.fetchedCaseFans = [];
      this.fetchedStorages = [];
      this.powerSupplys = [];
      if (!this.pEditMode || !this.onEditLoad) {
        this.rams = [];
        this.storages = [];
        this.caseFans = [];
        this.computer.gpuId = null;
        this.computer.powerSupplyId = null;
        this.computer.coolerId = null;
      }
      const result = this.motherboards.filter(m => {
        return m.value.id === this.computer.motherboardId.value.id;
      });
      if (!newValue.value.includesCooler) {
        this.loadCoolers();
      }
      if (newValue.value.includesIntegratedGpu) {
        this.loadRams(result[0].value.memoryType);
      } else {
        this.loadGpus(this.computer.motherboardId.value.id);
      }
    },
    "computer.gpuId"(newValue, oldValue) {
      if (newValue === null) {
        return;
      }
      this.storageFormDisabled = false;
      this.caseFanFormDisabled = false;
      this.ramFormDisabled = false;
      this.fetchedRams = [];
      this.fetchedCaseFans = [];
      this.fetchedStorages = [];
      this.powerSupplys = [];
      if (!this.pEditMode || !this.onEditLoad) {
        this.rams = [];
        this.storages = [];
        this.caseFans = [];
        this.computer.powerSupplyId = null;
      }
      const result = this.motherboards.filter(m => {
        return m.value.id === this.computer.motherboardId.value.id;
      });
      this.loadRams(result[0].value.memoryType);
    },
    "fetchedRams.length"(newValue, oldValue) {
      if (newValue === 0) {
        return;
      }
        this.loadStorages(this.computer.motherboardId.value.id);
    },
    "rams.length"(newValue, oldValue) {
      if (this.storages.length > 0 && newValue > 0) {
        if (this.computer.computerType === "BUSINESS") {
          this.loadPowerSupplys();
        } else {
          this.loadCaseFans();
        }
      } else {
        this.storageFormDisabled = false;
        this.caseFanFormDisabled = false;
        this.ramFormDisabled = false;
        this.fetchedCaseFans = [];
        this.powerSupplys = [];
        if (!this.pEditMode || !this.onEditLoad) {
          this.caseFans = [];
          this.computer.powerSupplyId = null;
        }
      }
      this.checkComputerRamAmount();
    },
    "storages.length"(newValue, oldValue) {
      if (this.rams.length > 0 && newValue > 0) {
        if (this.computer.computerType === "BUSINESS") {
          this.loadPowerSupplys();
        } else {
          this.loadCaseFans();
        }
      } else {
        this.storageFormDisabled = false;
        this.caseFanFormDisabled = false;
        this.ramFormDisabled = false;
        this.fetchedCaseFans = [];
        this.powerSupplys = [];
        if (!this.pEditMode || !this.onEditLoad) {
          this.caseFans = [];
          this.computer.powerSupplyId = null;
        }
      }
      this.checkComputerStorageAmount();
    },
    "caseFans.length"(newValue, oldValue) {
      if (newValue > 0) {
        this.loadPowerSupplys();
      } else {
        this.caseFanFormDisabled = false;
        this.powerSupplys = [];
        if (!this.pEditMode || !this.onEditLoad) {
          this.computer.powerSupplyId = null;
        }
      }
      this.checkComputerCaseFanAmount();
    },
  },
  data() {
    return {
      onEditLoad: false,
      securityStore: useSecurityStore(),
      computer: JSON.parse(JSON.stringify(this.pComputer)),
      ram: null,
      storage: null,
      caseFan: null,
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateComputer : () => {
          this.addNewComputer()
        },
      },
      manufacturers: ["SAMSUNG", "KINGSTON", "CORSAIR"],
      computerTypes: ["BUSINESS", "NORMAL", "GAMING"],
      hasSale: false,
      ramFormDisabled: false,
      storageFormDisabled: false,
      caseFanFormDisabled: false,
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
      computerCases: [],
      motherboards: [],
      cpus: [],
      coolers: [],
      gpus: [],
      rams: [],
      fetchedRams: [],
      caseFans: [],
      fetchedCaseFans: [],
      storages: [],
      fetchedStorages: [],
      powerSupplys: [],
      ramAmountLimit: 0,
      storageAmountLimit: 0,
      caseFanAmountLimit: 0,
      rules: {
        computerNameRule: [
          (val) => val !== null && val.length > 3 || "Insert valid computer name!"
        ],
        quantityRule: [
          (val) => val !== null && val.length > 0 || "Insert valid quantity amount!"
        ],
        computerTypeRule: [
          (val) => val !== null && val.length > 0 || "Insert valid computer type!"
        ],
        saleTypeRule: [
          (val) => val !== null || "Insert valid sale type!"
        ],
        tdpRule: [
          (val) => val !== null && val.length > 0 || "Insert valid tdp!"
        ],
        capacityRule: [
          (val) => val !== null && val.length > 0 || "Insert valid computer capacity!"
        ],
        imageRule: [
          (val) => val !== null && val.length > 0 || "Insert valid image link/url!"
        ],
        computerCaseRule: [
          (val) => val !== null || "Insert valid computer case!"
        ],
        motherboardRule: [
          (val) => val !== null || "Insert valid motherboard!"
        ],
        cpuRule: [
          (val) => val !== null || "Insert valid cpu!"
        ],
        coolerRule: [
          (val) => val !== null || "Insert valid cooler!"
        ],
        gpuRule: [
          (val) => val !== null || "Insert valid gpu!"
        ],
        ramQuantityRule: [
          (val) => val !== null && val > 0 && val < 5 || "Insert valid ram amount!"
        ],
        storageQuantityRule: [
          (val) => val !== null && val > 0 && val < 5 || "Insert valid storage amount!"
        ],
        caseFanQuantityRule: [
          (val) => val !== null && val > 0 && val < 4 || "Insert valid case fan amount!"
        ],
        powerSupplyRule: [
          (val) => val !== null || "Insert valid power supply!"
        ],
      }
    }
  },
  computed: {
    updateButtonDisabled() {
      return false;
    },
    legendText() {
      return this.pEditMode ? "Computer info" : "Creating New Computer";
    },
    checkFetchedCaseFansLength() {
      return this.fetchedCaseFans.length !== 0;
    }
  },
  async created() {
    if (this.pEditMode) {
      if (this.pComputer !== null) {
        if (this.pComputer.saleType !== null) {
          this.hasSale = true;
        }
      }
      this.onEditLoad = true;
      this.turnNumbersToString(this.computer);
      // Srediti da sve uzima putem jednog api poziva
      let tempComputerCase = await apiClient.request('get', '/computer-case/' + this.computer.computerCaseId, null, null);
      let tempMotherboard = await apiClient.request('get', '/motherboard/' + this.computer.motherboardId, null, null);
      let tempCpu = await apiClient.request('get', '/cpu/' + this.computer.cpuId, null, null);
      let tempPowerSupply = await apiClient.request('get', '/power-supply/' + this.computer.powerSupplyId, null, null);
      let tempGpu;
      let tempCooler;
      if (this.computer.gpuId !== null && this.computer.gpuId !== "") {
        tempGpu = await apiClient.request('get', '/gpu/' + this.computer.gpuId, null, null);
      }
      if (this.computer.coolerId !== null && this.computer.coolerId !== "") {
        tempCooler = await apiClient.request('get', '/cooler/' + this.computer.coolerId, null, null);
      }
      if (this.computer.computerType === "BUSINESS") {
        this.ramAmountLimit = 2;
        this.storageAmountLimit = 2;
        this.fetchComputerCases(3000.00);
        this.fetchMotherboards(3000.00);
      } else if (this.computer.computerType === "NORMAL") {
        this.ramAmountLimit = 4;
        this.storageAmountLimit = 3;
        this.caseFanAmountLimit = 2;
        this.fetchComputerCases(5000.00);
        this.fetchMotherboards(5000.00);
      } else if (this.computer.computerType === "GAMING") {
        this.ramAmountLimit = 4;
        this.storageAmountLimit = 4;
        this.caseFanAmountLimit = 3;
        this.fetchComputerCases(100000.00);
        this.fetchMotherboards(100000.00);
      }
      let tempRams = [];
      let tempStorages = [];
      let tempCaseFans = [];
      await apiClient.request('get', '/ram/find-by-computer-id?computerId=' + this.computer.id, null, null).then(
        result => {
          tempRams = result;
        }
      );
      await apiClient.request('get', '/storage/find-by-computer-id?computerId=' + this.computer.id, null, null).then(
        result => {
          tempStorages = result;
        }
      );
      await apiClient.request('get', '/case-fan/find-by-computer-id?computerId=' + this.computer.id, null, null).then(
        result => {
          tempCaseFans = result;
        }
      );
      this.computer.computerCaseId = {
        label: tempComputerCase.componentName,
        value: tempComputerCase
      }
      this.computer.motherboardId = {
        label: tempMotherboard.componentName,
        value: tempMotherboard
      }
      this.computer.cpuId = {
        label: tempCpu.componentName,
        value: tempCpu
      }
      if (tempCooler !== undefined && tempCooler !== null) {
        this.computer.coolerId = {
          label: tempCooler.componentName,
          value: tempCooler
        }
      }
      if (tempGpu !== undefined && tempGpu !== null) {
        this.computer.gpuId = {
          label: tempGpu.componentName,
          value: tempGpu
        }
      }
      this.computer.powerSupplyId = {
        label: tempPowerSupply.componentName,
        value: tempPowerSupply
      }
      for (const r of tempRams) {
        let quantity = await apiClient.request('get', '/ram/find-quantity-by-ram-id-and-computer-id?ramId=' + r.id + '&computerId=' + this.computer.id, null, null);
        const assignedRam = {
          tempId: this.generateRandomUUID(),
          componentName: r.componentName,
          ramId: r.id,
          computerId: this.computer.id,
          quantity: quantity,
          tdp: r.tdp,
          price: r.price
        }
        this.rams.push(assignedRam);
      }
      for (const s of tempStorages) {
        let quantity = await apiClient.request('get', '/storage/find-quantity-by-storage-id-and-computer-id?storageId=' + s.id + '&computerId=' + this.computer.id, null, null);
        const assignedStorage = {
          tempId: this.generateRandomUUID(),
          componentName: s.componentName,
          storageId: s.id,
          computerId: this.computer.id,
          quantity: quantity,
          tdp: s.tdp,
          price: s.price
        }
        this.storages.push(assignedStorage);
      }
      for (const cf of tempCaseFans) {
        let quantity = await apiClient.request('get', '/case-fan/find-quantity-by-case-fan-id-and-computer-id?caseFanId=' + cf.id + '&computerId=' + this.computer.id, null, null);
        const assignedCaseFan = {
          tempId: this.generateRandomUUID(),
          componentName: cf.componentName,
          caseFanId: cf.id,
          computerId: this.computer.id,
          quantity: quantity,
          tdp: cf.tdp,
          price: cf.price
        }
        this.caseFans.push(assignedCaseFan);
      }
      this.onEditLoad = false;
    }
  },
  methods: {
    async addNewComputer(ignore = false) {
      this.checkSaleType();
      this.computer.tdp = this.calculateTotalWattage();
      this.computer.price = this.calculateTotalPrice();
      this.computer.dateOfCreation = date.formatDate(new Date(), 'YYYY-MM-DD');
      if (!this.checkComputerComponentsValidation) {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Make sure all minimum components have been added (computer case, motherboard, cpu, power supply)!"
        });
      }
      const computerCreationRequest = {
        computer: this.createTempComputer(),
        computerRamList: this.rams,
        computerStorageList: this.storages,
        computerCaseFanList: this.caseFans
      }
      let computer = await apiClient.request('post', '/computer', null, computerCreationRequest);
      if (computer !== null) {
        Notify.create("Computer " + this.computer.computerName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewComputer(true);
      this.clearData();
      this.$refs.computerForm.reset();
    },
    async updateComputer() {
      this.checkSaleType();
      this.computer.tdp = this.calculateTotalWattage();
      this.computer.price = this.calculateTotalPrice();
      const computerCreationRequest = {
        computer: this.createTempComputer(),
        computerRamList: this.rams,
        computerStorageList: this.storages,
        computerCaseFanList: this.caseFans,
      }
      computerCreationRequest.computer.id = this.computer.id;
      let computer = await apiClient.request('put', '/computer', null, computerCreationRequest);
      if (computer !== null) {
        Notify.create("Computer " + this.computer.computerName + " has been edited!");
        this.$router.go(-1);
      }
    },
    assignRam() {
      if (this.checkIfComponentIsPresent(this.ram)) {
        Notify.create("RAM " + this.ram.value.componentName + " has already been added to computer!");
        return;
      }
      if (this.rams.length === this.ramAmountLimit) {
        Notify.create("RAM limit reached!");
        return;
      } else if (this.ram === null || this.ram === '') {
        Notify.create("RAM must be selected!");
        return;
      }
      const assignedRam = {
        tempId: this.generateRandomUUID(),
        componentName: this.ram.value.componentName,
        ramId: this.ram.value.id,
        computerId: null,
        quantity: 1,
        tdp: this.ram.value.tdp,
        price: this.ram.value.price
      }
      this.rams.push(assignedRam);
      this.ram = '';
      this.checkComputerRamAmount();
    },
    unassignRam(ramId) {
      let result = this.rams.filter(r => r.tempId === ramId);
      let tempObj = {
        ramId: result[0].ramId,
        computerId: this.computer.id
      }
      this.rams = this.rams.filter(ram => ram.tempId !== ramId);
      this.checkComputerRamAmount();
    },
    assignStorage() {
      if (this.checkIfComponentIsPresent(this.storage)) {
        Notify.create("Storage " + this.storage.value.componentName + " has already been added to computer!");
        return;
      }
      if (this.storages.length === this.storageAmountLimit) {
        Notify.create("Storage limit reached!");
        return;
      } else if (this.storage === null || this.storage === '') {
        Notify.create("Storage must be selected!");
        return;
      }
      const assignedStorage = {
        tempId: this.generateRandomUUID(),
        componentName: this.storage.value.componentName,
        storageId: this.storage.value.id,
        computerId: null,
        quantity: 1,
        tdp: this.storage.value.tdp,
        price: this.storage.value.price
      }
      this.storages.push(assignedStorage);
      this.storage = '';
      this.checkComputerStorageAmount();
    },
    unassignStorage(storageId) {
      let result = this.storages.filter(s => s.tempId === storageId);
      let tempObj = {
        storageId: result[0].storageId,
        computerId: this.computer.id
      }
      this.storages = this.storages.filter(storage => storage.tempId !== storageId);
      this.checkComputerStorageAmount();
    },
    assignCaseFan() {
      if (this.checkIfComponentIsPresent(this.caseFan)) {
        Notify.create("Case fan " + this.caseFan.value.componentName + " has already been added to computer!");
        return;
      }
      if (this.caseFans.length === this.caseFanAmountLimit) {
        Notify.create("Case fan limit reached!");
        return;
      } else if (this.caseFan === null || this.caseFan === '') {
        Notify.create("Case fan must be selected!");
        return;
      }
      const assignedCaseFan = {
        tempId: this.generateRandomUUID(),
        componentName: this.caseFan.value.componentName,
        caseFanId: this.caseFan.value.id,
        computerId: null,
        quantity: 1,
        tdp: this.caseFan.value.tdp,
        price: this.caseFan.value.price
      }
      this.caseFans.push(assignedCaseFan);
      this.caseFan = '';
      this.checkComputerCaseFanAmount();
    },
    unassignCaseFan(caseFanId) {
      let result = this.caseFans.filter(cf => cf.tempId === caseFanId);
      let tempObj = {
        caseFanId: result[0].caseFanId,
        computerId: this.computer.id
      }
      this.caseFans = this.caseFans.filter(caseFan => caseFan.tempId !== caseFanId);
      this.checkComputerCaseFanAmount();
    },
    fetchComputerCases(maxPrice) {
      this.computerCases = [];
      apiClient.request('get', '/computer-case/find-by-max-price?maxPrice=' + maxPrice, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.computerCases.push(tempObj);
          }
        }
      );
    },
    fetchMotherboards(maxPrice) {
      this.motherboards = []
      apiClient.request('get', '/motherboard/find-by-max-price-and-storage-interface-limit?maxPrice=' + maxPrice + '&storageInterfaceLimit=' + this.storageAmountLimit, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.motherboards.push(tempObj);
          }
        }
      );
    },
    fetchCpus(maxPrice, includesCooler, includesIntegratedGpu, socketType) {
      this.cpus = [];
      apiClient.request('get', '/cpu/find-by-requested-params?maxPrice=' + maxPrice + '&includesCooler='
        + includesCooler + '&includesIntegratedGpu=' + includesIntegratedGpu + '&socketType=' + socketType, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.cpus.push(tempObj);
          }
        }
      );
    },
    fetchGpus(maxPrice, motherboardId) {
      this.gpus = [];
      apiClient.request('get', '/gpu/find-by-max-price-and-motherboard-id?maxPrice=' + maxPrice + '&motherboardId=' + motherboardId, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.gpus.push(tempObj);
          }
        }
      );
    },
    fetchRams(maxPrice, memoryType) {
      this.fetchedRams = [];
      apiClient.request('get', '/ram/find-by-max-price-and-memory-type?maxPrice=' + maxPrice + '&memoryType=' + memoryType, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.fetchedRams.push(tempObj);
          }
        }
      );
    },
    fetchStorages(maxPrice, motherboardId) {
      this.fetchedStorages = [];
      apiClient.request('get', '/storage/find-by-max-price-and-motherboard-id?maxPrice=' + maxPrice + '&motherboardId=' + motherboardId, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.fetchedStorages.push(tempObj);
          }
        }
      );
    },
    fetchCoolers(maxPrice) {
      this.coolers = [];
      apiClient.request('get', '/cooler/find-by-max-price?maxPrice=' + maxPrice, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.coolers.push(tempObj);
          }
        }
      );
    },
    fetchCaseFans(maxPrice) {
      this.fetchedCaseFans = [];
      apiClient.request('get', '/case-fan/find-by-max-price?maxPrice=' + maxPrice, null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.fetchedCaseFans.push(tempObj);
          }
        }
      );
    },
    fetchPowerSupplys(maxPrice) {
      this.powerSupplys = [];
      apiClient.request('get', '/power-supply/find-by-max-price-and-wattage?maxPrice=' + maxPrice + '&minWattage=' + this.calculateTotalWattage(), null, null).then(
        result => {
          for(let val of result) {
            const tempObj = {
              label: val.componentName,
              value: val
            }
            this.powerSupplys.push(tempObj);
          }
        }
      );
    },
    loadGpus(motherboardId) {
      if (this.computer.computerType === "NORMAL") {
        this.fetchGpus(5000.00, motherboardId);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchGpus(100000.00, motherboardId);
      }
    },
    loadCpus(socketType) {
      if (this.computer.computerType === "BUSINESS") {
        this.fetchCpus(3000.00, true, true, socketType);
      } else if (this.computer.computerType === "NORMAL") {
        this.fetchCpus(5000.00, false, false, socketType);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchCpus(100000.00, false, false, socketType);
      }
    },
    loadRams(memoryType) {
      if (this.computer.computerType === "BUSINESS") {
        this.fetchRams(3000.00, memoryType);
      } else if (this.computer.computerType === "NORMAL") {
        this.fetchRams(5000.00, memoryType);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchRams(100000.00, memoryType);
      }
    },
    loadStorages(motherboardId) {
      if (this.computer.computerType === "BUSINESS") {
        this.fetchStorages(3000.00, motherboardId);
      } else if (this.computer.computerType === "NORMAL") {
        this.fetchStorages(5000.00, motherboardId);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchStorages(100000.00, motherboardId);
      }
    },
    loadCoolers() {
      if (this.computer.computerType === "BUSINESS") {
        this.fetchCoolers(3000.00);
      } else if (this.computer.computerType === "NORMAL") {
        this.fetchCoolers(5000.00);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchCoolers(100000.00);
      }
    },
    loadCaseFans() {
      if (this.computer.computerType === "BUSINESS") {

      } else if (this.computer.computerType === "NORMAL") {
        this.fetchCaseFans(5000.00);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchCaseFans(100000.00);
      }
    },
    loadPowerSupplys() {
      if (this.computer.computerType === "BUSINESS") {
        this.fetchPowerSupplys(3000);
      } else if (this.computer.computerType === "NORMAL") {
        this.fetchPowerSupplys(5000);
      } else if (this.computer.computerType === "GAMING") {
        this.fetchPowerSupplys(100000);
      }
    },
    clearData() {
      this.clearJsonObject(this.computer);
      this.hasSale = false;
      this.computer.currency = "RSD";
    },
    calculateTotalWattage() {
      let wattage = 0;
      if (this.pEditMode) {
        wattage += Number(this.computer.tdp);
      } else {
        wattage += this.computer.motherboardId.value.tdp;
        wattage += this.computer.cpuId.value.tdp;
        if (this.computer.coolerId !== null) {
          wattage += this.computer.coolerId.value.tdp;
        }
        if (this.computer.gpuId !== null) {
          wattage += this.computer.gpuId.value.tdp;
        }
        for (let val of this.rams) {
          wattage += val.tdp * val.quantity;
        }
        for (let val of this.storages) {
          wattage += val.tdp * val.quantity;
        }
        for (let val of this.caseFans) {
          wattage += val.tdp * val.quantity;
        }
      }
      return wattage;
    },
    checkComputerComponentsValidation(){
      return this.computer.computerCaseId !== null && this.computer.cpuId !== null
        && this.computer.motherboardId !== null && this.computer.powerSupplyId !== null
    },
    calculateTotalPrice() {
      let price = 0;
      if (this.pEditMode) {
        price += Number(this.computer.price);
      } else {
        price += this.computer.motherboardId.value.price;
        price += this.computer.cpuId.value.price;
        if (this.computer.coolerId !== null) {
          price += this.computer.coolerId.value.price;
        }
        if (this.computer.gpuId !== null) {
          price += this.computer.gpuId.value.price;
        }
        for (let val of this.rams) {
          price += val.price * val.quantity;
        }
        for (let val of this.storages) {
          price += val.price * val.quantity;
        }
        for (let val of this.caseFans) {
          price += val.price * val.quantity;
        }
      }
      return price;
    },
    createTempComputer() {
      return {
        id: null,
        computerName: this.computer.computerName,
        price: this.computer.price,
        currency: "RSD",
        quantity: this.computer.quantity,
        computerType: this.computer.computerType,
        tdp: this.computer.tdp,
        description: this.computer.description,
        image: this.computer.image,
        saleType: this.computer.saleType,
        computerCaseId: this.computer.computerCaseId.value.id,
        gpuId: this.computer.gpuId === null ? null : this.computer.gpuId.value.id,
        cpuId: this.computer.cpuId.value.id,
        coolerId: this.computer.coolerId === null ? null : this.computer.coolerId.value.id,
        motherboardId: this.computer.motherboardId.value.id,
        powerSupplyId: this.computer.powerSupplyId.value.id,
      }
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
        if (this.computer.saleType.hasOwnProperty("value")) {
          this.computer.saleType = this.computer.saleType.value;
        }
      } else {
        this.computer.saleType = null;
      }
    },
    checkComputerRamAmount() {
      let counter = 0;
      for (const ram of this.rams) {
        counter += Number(ram.quantity);
        if (counter >= this.ramAmountLimit) {
          this.ramFormDisabled = true;
        } else {
          this.ramFormDisabled = false;
        }
      }
    },
    checkComputerStorageAmount() {
      let counter = 0;
      for (const storage of this.storages) {
        counter += Number(storage.quantity);
        if (counter >= this.storageAmountLimit) {
          this.storageFormDisabled = true;
        } else {
          this.storageFormDisabled = false;
        }
      }
    },
    checkComputerCaseFanAmount() {
      let counter = 0;
      for (const caseFan of this.caseFans) {
        counter += Number(caseFan.quantity);
        if (counter >= this.caseFanAmountLimit) {
          this.caseFanFormDisabled = true;
        } else {
          this.caseFanFormDisabled = false;
        }
      }
    },
    checkIfComponentIsPresent(component) {
      if (component === '') {
        return;
      }
      if ('memoryType' in component.value) {
        for (const val of this.rams) {
          if (val.ramId === component.value.id) {
            return true;
          }
        }
      } else if ('storageType' in component.value) {
        for (const val of this.storages) {
          if (val.storageId === component.value.id) {
            return true;
          }
        }
      } else if ('fanSize' in component.value) {
        for (const val of this.caseFans) {
          if (val.caseFanId === component.value.id) {
            return true;
          }
        }
      }
      return false;
    },
    generateRandomUUID() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      );
    }
  }
}
</script>

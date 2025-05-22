<template>
  <div class="card calculator-card">
    <div class="card-body">
      <h5 class="card-title mb-4">Energy Consumption Calculator</h5>

      <!-- Select and add appliance to the user's list -->
      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="form-label">Select Appliance</label>
          <select v-model="selectedAppliance" class="form-control">
            <option v-for="app in appliances" :key="app.name" :value="app.name">
              {{ app.name }} ({{ app.wattage }}W)
            </option>
          </select>
        </div>
        <div class="col-md-4 mb-2">
          <label class="form-label">Quantity</label>
          <input
            type="number"
            v-model.number="selectedQuantity"
            min="1"
            class="form-control"
          />
        </div>
        <div class="col-md-2 mb-2 d-flex align-items-end">
          <button class="btn btn-primary w-100" @click="addToMyAppliances" :disabled="!canAddToList">
            Add
          </button>
        </div>
      </div>

      <!-- Table of added appliances -->
      <div v-if="myAppliances.length" class="table-responsive mt-4">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Appliance</th>
              <th>Wattage</th>
              <th>Qty</th>
              <th>Daily Hours</th>
              <th>Total kWh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in myAppliances" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.wattage }}W</td>
              <td>{{ item.quantity }}</td>
              <td v-if="advanced">
                <input
                  type="number"
                  class="form-control form-control-sm"
                  v-model.number="item.usageHours"
                  min="0"
                />
              </td>
              <td v-else>
                {{ defaultUsageHours }}
              </td>
              <td>{{ calculateApplianceKwh(item).toFixed(2) }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="removeAppliance(index)">✕</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add new appliance type -->
      <div class="border rounded p-3 mb-4 mt-4">
        <h6>Add New Appliance Type</h6>
        <input
          type="text"
          v-model="newApplianceName"
          placeholder="Name"
          class="form-control mb-2"
        />
        <input
          type="number"
          v-model.number="newApplianceWattage"
          placeholder="Wattage (W)"
          class="form-control mb-2"
        />
        <button
          class="btn btn-secondary btn-sm"
          @click="addApplianceType"
          :disabled="!canAddApplianceType"
        >
          Add Appliance Type
        </button>
      </div>

      <!-- Advanced settings toggle -->
      <div class="form-check form-switch mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="advancedToggle"
          v-model="advanced"
        />
        <label class="form-check-label" for="advancedToggle">Advanced Mode</label>
      </div>

      <!-- Advanced inputs -->
      <div v-if="advanced">
        <div class="mb-3">
          <label for="billingPeriod">Billing Period (days)</label>
          <input
            type="number"
            id="billingPeriod"
            v-model.number="billingPeriod"
            min="1"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="costPerKwh">Cost per kWh (₦)</label>
          <input
            type="number"
            id="costPerKwh"
            v-model.number="costPerKwh"
            min="0"
            class="form-control"
          />
        </div>
      </div>

      <!-- Result Summary -->
      <div class="card mt-4">
        <div class="card-body text-center">
          <p class="font-weight-semibold mb-1">Total Consumption</p>
          <p class="lead mb-3">{{ totalConsumption.toFixed(2) }} kWh</p>

          <p class="font-weight-semibold mb-1">Estimated Cost</p>
          <p class="lead">₦{{ totalCost.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnergyCalculator",
  data() {
    return {
      appliances: [
        { name: "Fan", wattage: 75 },
        { name: "Bulb", wattage: 10 },
        { name: "TV", wattage: 100 },
        { name: "Refrigerator", wattage: 150 },
      ],
      selectedAppliance: "Fan",
      selectedQuantity: 1,
      newApplianceName: "",
      newApplianceWattage: null,
      myAppliances: [],

      // Advanced controls
      advanced: false,
      billingPeriod: 30,
      costPerKwh: 50,
      defaultUsageHours: 3,
    };
  },
  computed: {
    canAddToList() {
      return this.selectedAppliance && this.selectedQuantity > 0;
    },
    canAddApplianceType() {
      return (
        this.newApplianceName.trim() !== "" &&
        this.newApplianceWattage > 0 &&
        !this.appliances.some(
          (a) => a.name.toLowerCase() === this.newApplianceName.trim().toLowerCase()
        )
      );
    },
    totalConsumption() {
      return this.myAppliances.reduce(
        (sum, item) => sum + this.calculateApplianceKwh(item),
        0
      );
    },
    totalCost() {
      return this.totalConsumption * this.costPerKwh;
    },
  },
  methods: {
    addToMyAppliances() {
      const appliance = this.appliances.find(
        (a) => a.name === this.selectedAppliance
      );
      if (!appliance) return;

      this.myAppliances.push({
        name: appliance.name,
        wattage: appliance.wattage,
        quantity: this.selectedQuantity,
        usageHours: this.defaultUsageHours,
      });

      this.selectedQuantity = 1;
    },
    calculateApplianceKwh(item) {
      const hours = this.advanced ? item.usageHours : this.defaultUsageHours;
      return (
        (item.wattage * item.quantity * hours * this.billingPeriod) / 1000
      );
    },
    removeAppliance(index) {
      this.myAppliances.splice(index, 1);
    },
    addApplianceType() {
      this.appliances.push({
        name: this.newApplianceName.trim(),
        wattage: this.newApplianceWattage,
      });
      this.selectedAppliance = this.newApplianceName.trim();
      this.newApplianceName = "";
      this.newApplianceWattage = null;
    },
  },
};
</script>

<style scoped>
.calculator-card {
  max-width: 720px;
  margin: auto;
}
</style>

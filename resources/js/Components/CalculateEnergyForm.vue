<template>
  <div class="card calculator-card">
    <div class="card-body">
      <h5 class="card-title mb-4">Energy Consumption Calculator</h5>

      <!-- Appliance selector + quantity -->
      <div class="mb-3">
        <label for="appliance" class="form-label">Select Appliance</label>
        <select id="appliance" v-model="selectedAppliance" class="form-control">
          <option v-for="app in appliances" :key="app.name" :value="app.name">
            {{ app.name }} ({{ app.wattage }}W)
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="quantity" class="form-label">Quantity</label>
        <input type="number" id="quantity" v-model.number="quantity" min="1" class="form-control" />
      </div>

      <!-- Advanced mode toggle -->
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="advancedToggle" v-model="advanced" />
        <label class="form-check-label" for="advancedToggle">Advanced Mode</label>
      </div>

      <!-- Advanced inputs -->
      <div v-if="advanced">
        <div class="mb-3">
          <label for="usageHours" class="form-label">Usage Hours per Day</label>
          <input
            type="number"
            id="usageHours"
            v-model.number="usageHours"
            min="0"
            step="0.1"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="billingPeriod" class="form-label">Billing Period (days)</label>
          <input
            type="number"
            id="billingPeriod"
            v-model.number="billingPeriod"
            min="1"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="costPerKwh" class="form-label">Cost per kWh (₦)</label>
          <input
            type="number"
            id="costPerKwh"
            v-model.number="costPerKwh"
            min="0"
            step="0.01"
            class="form-control"
          />
        </div>
      </div>

      <!-- Results Card -->
      <div class="card mt-4">
        <div class="card-body text-center">
          <i class="ik ik-power mr-2" style="font-size: 24px;"></i>
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
  name: "EnergyCalculatorCard",
  data() {
    return {
      appliances: [
        { name: "LED Bulb", wattage: 10 },
        { name: "Fan", wattage: 75 },
        { name: "Refrigerator", wattage: 150 },
        { name: "Air Conditioner", wattage: 1200 },
        { name: "Laptop", wattage: 65 },
      ],
      selectedAppliance: "LED Bulb",
      quantity: 1,
      advanced: false,
      usageHours: 3, // default usage hours per day for advanced mode
      billingPeriod: 30, // default billing period in days
      costPerKwh: 50, // default cost in Naira per kWh
    };
  },
  computed: {
    // Find the wattage of selected appliance
    selectedWattage() {
      const appliance = this.appliances.find(
        (a) => a.name === this.selectedAppliance
      );
      return appliance ? appliance.wattage : 0;
    },
    // Calculate total consumption in kWh
    totalConsumption() {
      if (this.advanced) {
        return (
          (this.selectedWattage * this.quantity * this.usageHours * this.billingPeriod) /
          1000
        );
      }
      // Normal mode assumes 3 hours/day and 30 days billing period by default
      return (this.selectedWattage * this.quantity * 3 * 30) / 1000;
    },
    // Calculate total cost in Naira
    totalCost() {
      return this.totalConsumption * this.costPerKwh;
    },
  },
};
</script>

<style scoped>
.calculator-card {
  max-width: 400px;
  margin: auto;
}

.ik-power {
  color: #007bff;
}

/* You can add more custom styling here to fit your app theme */
</style>

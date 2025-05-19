<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const amount = ref('')
const deposits = ref([])
const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)

async function fetchDeposits() {
  try {
    const res = await axios.get('/api/deposits')
    deposits.value = res.data
  } catch (e) {
    error.value = 'Failed to load deposits'
  }
}

async function submitDeposit() {
  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    await axios.post('/api/deposits', { amount: amount.value })
    successMessage.value = 'Deposit submitted successfully'
    amount.value = ''
    await fetchDeposits()
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to submit deposit'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDeposits()
})
</script>

<template>
  <div class="container mx-auto max-w-3xl p-4">
    <h4 class="mb-4">Buy Electricity</h4>

    <form @submit.prevent="submitDeposit" class="mb-6">
      <label for="amount" class="block mb-1">Deposit Money</label>
      <input
        id="amount"
        type="number"
        min="1"
        v-model="amount"
        class="border p-2 w-full"
        placeholder="Enter the amount you wish to deposit"
        required
      />
      <button
        type="submit"
        :disabled="loading"
        class="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {{ loading ? 'Processing...' : 'Make payment' }}
      </button>
    </form>

    <div v-if="error" class="mb-4 text-red-600">{{ error }}</div>
    <div v-if="successMessage" class="mb-4 text-green-600">{{ successMessage }}</div>

    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border border-gray-300 px-2 py-1">Amount</th>
          <th class="border border-gray-300 px-2 py-1">Date</th>
          <th class="border border-gray-300 px-2 py-1">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in deposits" :key="dep.id">
          <td class="border border-gray-300 px-2 py-1">₦{{ Number(dep.amount).toLocaleString() }}.00</td>
          <td class="border border-gray-300 px-2 py-1">{{ dep.date }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ dep.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const balance = ref(0)
const transactions = ref([])

async function fetchData() {
  const balRes = await axios.get('/api/balance')
  balance.value = balRes.data.balance

  const txRes = await axios.get('/api/transactions')
  transactions.value = txRes.data
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container mx-auto max-w-4xl p-4">
    <div class="page-header">
      <h4>Transaction History</h4>
    </div>

    <div class="widget mb-6 p-4 border rounded">
      <h6>Balance</h6>
      <h2>₦{{ balance.toLocaleString() }}.00</h2>
    </div>

    <div class="card p-4 border rounded">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in transactions" :key="tx.id">
            <td>₦{{ Number(tx.amount).toLocaleString() }}.00</td>
            <td>{{ tx.date }}</td>
            <td>{{ tx.type }}</td>
            <td>
              <span :class="tx.status === 'paid' ? 'badge-success' : 'badge-danger'">
                {{ tx.status === 'paid' ? 'Paid' : 'Unpaid' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.badge-success {
  color: #fff;
  background-color: #28a745;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
.badge-danger {
  color: #fff;
  background-color: #dc3545;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
</style>

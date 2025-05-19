<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
	meter: '',
	state: '',
	amount: '',
	type: 'prepaid',
})

const states = [
	'Abia', 'Abuja', 'Adamawa', 'Akwa-Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross-river', 'Delta',
	'Edo', 'Ekiti', 'Enugu', 'Ebonyi', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
	'Lagos', 'Nassarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateu', 'Rivers', 'Sokoto', 'Yobe', 'Zamfara'
]

const submitForm = async () => {
	try {
		await axios.post('/api/buy-electricity', form.value)
		alert('Payment initiated')
	} catch (error) {
		console.error(error)
		alert('There was an error submitting the form.')
	}
}
</script>

<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="form-group">
                            <label for="meter">Meter Number</label>
                            <input v-model="form.meter" type="text" class="form-control" id="meter" placeholder="Enter your meter number" />
                        </div>

                        <div class="form-group">
                            <label for="state">State</label>
                            <select v-model="form.state" class="form-control" id="state">
                                <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="amount">Amount</label>
                            <input v-model="form.amount" type="number" class="form-control" id="amount" placeholder="Enter amount" />
                        </div>

                        <div class="form-group">
                            <label for="type">Payment Type</label>
                            <select v-model="form.type" class="form-control" id="type">
                                <option value="prepaid">Prepaid</option>
                                <option value="postpaid">Postpaid</option>
                            </select>
                        </div>

                        <div class="text-center">
                        <button type="submit" class="btn btn-primary">Make Payment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

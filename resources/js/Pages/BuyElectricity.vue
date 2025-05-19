<script setup>
import PageHeader from '@/components/PageHeader.vue'
import BuyElectricityForm from '@/Components/BuyElectricityForm.vue'
</script>

<template>
    <div class="container mx-auto max-w-3xl px-4 py-8">
      <PageHeader title="Buy Electricity" subtitle="Top up your electricity meter with ease." />
      <BuyElectricityForm />
    </div>
</template>

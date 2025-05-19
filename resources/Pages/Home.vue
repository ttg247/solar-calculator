<script setup>
import PageHeader from '@/Components/PageHeader.vue'
import BuyElectricityForm from '@/Components/BuyElectricityForm.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div class="container mx-auto max-w-3xl px-4 py-8">
      <PageHeader title="Buy Electricity" subtitle="Top up your electricity meter with ease." />
      <BuyElectricityForm />
    </div>
  </DefaultLayout>
</template>

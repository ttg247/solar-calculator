<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <div class="py-4">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <p class="text-gray-600">{{ subtitle }}</p>
  </div>
</template>

<script setup>
    import Footer from '@/Components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

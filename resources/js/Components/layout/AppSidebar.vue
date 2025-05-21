<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (name) => route.name === name ? 'active' : ''

const submenuOpen = ref(false)
const submenuRef = ref(null)

const toggleSubmenu = async () => {
  submenuOpen.value = !submenuOpen.value
  await nextTick()
  const el = submenuRef.value
  if (submenuOpen.value) {
    el.style.maxHeight = el.scrollHeight + 'px'
  } else {
    el.style.maxHeight = '0'
  }
}

// Optional: open submenu if route matches
watch(() => route.path, (newPath) => {
  submenuOpen.value = newPath.startsWith('/widgets')
  nextTick(() => {
    const el = submenuRef.value
    el.style.maxHeight = submenuOpen.value ? el.scrollHeight + 'px' : '0'
  })
}, { immediate: true })
</script>


<template>
  <div class="app-sidebar colored">
    <div class="sidebar-header">
      <router-link class="header-brand" to="/">
        <div class="logo-img">
          <img src="src/img/brand-white.svg" class="header-brand-img" alt="lavalite" />
        </div>
        <span class="text">ThemeKit</span>
      </router-link>
    </div>

    <div class="sidebar-content">
      <div class="nav-container">
        <nav id="main-menu-navigation" class="navigation-main">
          <div class="nav-lavel">Navigation</div>

          <div class="nav-item">
            <router-link :class="isActive('dashboard')" to="/dashboard">
              <i class="ik ik-bar-chart-2"></i><span>Dashboard</span>
            </router-link>
          </div>

          <div class="nav-item">
            <router-link :class="isActive('navbar')" to="/navbar">
              <i class="ik ik-menu"></i><span>Navigation</span>
              <span class="badge badge-success">New</span>
            </router-link>
          </div>

          <!-- Submenu toggle -->
          <div class="nav-item has-sub" :class="{ open: submenuOpen }">
            <a href="javascript:void(0)" @click="toggleSubmenu">
              <i class="ik ik-layers"></i><span>Widgets</span>
              <span class="badge badge-danger">150+</span>
            </a>
            <div class="submenu-content" v-show="submenuOpen"  ref="submenuRef">
              <router-link class="menu-item" to="/widgets/basic">Basic</router-link>
              <router-link class="menu-item" to="/widgets/statistic">Statistic</router-link>
              <router-link class="menu-item" to="/widgets/data">Data</router-link>
              <router-link class="menu-item" to="/widgets/chart">Chart Widget</router-link>
            </div>
          </div>

          <div class="nav-item">
            <router-link :class="isActive('layouts')" to="/layouts">
              <i class="ik ik-layout"></i><span>Layouts</span>
              <span class="badge badge-success">New</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* You can keep your sidebar-specific styles here or import them */
</style>

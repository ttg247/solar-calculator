<script setup>
import Header from '@/Components/layout/Header.vue'
import AppSidebar from '@/Components/layout/AppSidebar.vue'
import RightSidebar from '@/Components/layout/RightSidebarChat.vue'
import ChatPanel from '@/Components/layout/ChatPanel.vue'
import Footer from '@/Components/layout/Footer.vue'
import EditableLayoutModal from '@/Components/layout/EditableLayoutModal.vue'
import AppsModal from '@/Components/layout/AppsModal.vue'
</script>

<template>
	<div class="app">
        <div class="wrapper">
            <!-- Header -->
            <Header />

            <!-- Sidebar + Main Layout -->
            <div class="page-wrap">
                <!-- Sidebar -->
                <AppSidebar />

                <!-- Main Content -->
                <main class="main-content">
                    <RouterView />
                </main>

                <!-- Right Sidebar (if used) -->
                <RightSidebar />

                <!-- Chat Panel (if needed globally) -->
                <ChatPanel />

                <!-- Footer -->
                <Footer />
            </div>
        </div>
	</div>
</template>

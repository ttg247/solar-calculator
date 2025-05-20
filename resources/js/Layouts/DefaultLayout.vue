<script setup>
    import AppHeader from '@/Components/layout/Header.vue'
    import AppSidebar from '@/Components/layout/AppSidebar.vue'
    import RightSidebar from '@/Components/layout/RightSidebarChat.vue'
    import ChatPanel from '@/Components/layout/ChatPanel.vue'
    import AppFooter from '@/Components/layout/Footer.vue'
    import EditableLayoutModal from '@/Components/layout/EditableLayoutModal.vue'
    import AppsModal from '@/Components/layout/AppsModal.vue'
</script>

<template>
    <div class="wrapper">
        <!-- Header -->
        <AppHeader />

        <div class="page-wrap">
            <!-- Sidebar -->
            <AppSidebar />

            <!-- Main Content -->
            <div class="main-content">
                <RouterView />
            </div>

            <!-- Right Sidebar -->
            <RightSidebar />

            <!-- Chat Panel -->
            <ChatPanel />

            <!-- Footer -->
            <AppFooter />
        </div>
    </div>

    <EditableLayoutModal />

    <AppsModal />

</template>

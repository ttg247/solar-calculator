<script setup>
	import { ref } from 'vue'
    import ChatPanel from '@/Components/layout/ChatPanel.vue'

    const isChatVisible = ref(false)

    function toggleChat() {
        isChatVisible.value = !isChatVisible.value
    }

	const showNotifications = ref(false)
	const showUserMenu = ref(false)
	const showGridMenu = ref(false)
	const showFullscreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen()
	} else {
		document.exitFullscreen()
	}
	}
</script>

<template>
	<header class="header-top" header-theme="light">
		<div class="container-fluid">
			<div class="d-flex justify-content-between">
				<div class="top-menu d-flex align-items-center">
					<button type="button" class="btn-icon mobile-nav-toggle d-lg-none">
						<span></span>
					</button>

					<!-- Search Input -->
					<div class="header-search">
						<div class="input-group">
							<span class="input-group-addon search-close"><i class="ik ik-x"></i></span>
							<input type="text" class="form-control" />
							<span class="input-group-addon search-btn"><i class="ik ik-search"></i></span>
						</div>
					</div>

					<!-- Fullscreen Toggle -->
					<button @click="showFullscreen" type="button" id="navbar-fullscreen" class="nav-link">
						<i class="ik ik-maximize"></i>
					</button>
				</div>

				<!-- Right-side menu -->
				<div class="top-menu d-flex align-items-center">
					<!-- Notifications -->
					<div class="dropdown">
						<a class="nav-link" href="#" @click.prevent="showNotifications = !showNotifications">
							<i class="ik ik-bell"></i>
							<span class="badge bg-danger">3</span>
						</a>
						<div v-if="showNotifications" class="dropdown-menu dropdown-menu-right notification-dropdown">
							<h4 class="header">Notifications</h4>
							<div class="notifications-wrap">
								<a href="#" class="media">
									<span class="d-flex"><i class="ik ik-check"></i></span>
									<span class="media-body">
										<span class="media-heading">Invitation accepted</span>
										<span class="media-content">You have been invited ...</span>
									</span>
								</a>
								<a href="#" class="media">
									<span class="d-flex"><img src="/img/users/1.jpg" class="rounded-circle" alt="" /></span>
									<span class="media-body">
										<span class="media-heading">Steve Smith</span>
										<span class="media-content">I slowly updated projects</span>
									</span>
								</a>
								<a href="#" class="media">
									<span class="d-flex"><i class="ik ik-calendar"></i></span>
									<span class="media-body">
										<span class="media-heading">To Do</span>
										<span class="media-content">Meeting with Nathan on Friday 8 AM ...</span>
									</span>
								</a>
							</div>
							<div class="footer"><a href="#">See all activity</a></div>
						</div>
					</div>

					<!-- Chat Icon
					<button  @click="toggleChat" type="button" class="nav-link ml-10 right-sidebar-toggle">
						<i class="ik ik-message-square"></i><span class="badge bg-success">3</span>
					</button>

					-- Grid Dropdown -->
					<div class="dropdown">
						<a href="#" @click.prevent="showGridMenu = !showGridMenu" class="nav-link">
							<i class="ik ik-plus"></i>
						</a>
						<div v-if="showGridMenu" class="dropdown-menu dropdown-menu-right menu-grid">
							<a class="dropdown-item" href="#"><i class="ik ik-bar-chart-2"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-mail"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-users"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-shopping-cart"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-briefcase"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-clipboard"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-message-square"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-map-pin"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-inbox"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-calendar"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-bell"></i></a>
							<a class="dropdown-item" href="#"><i class="ik ik-more-horizontal"></i></a>
						</div>
					</div>

					<!-- Apps Modal Trigger -->
					<button type="button" class="nav-link ml-10" @click="$emit('open-modal')">
						<i class="ik ik-grid"></i>
					</button>

					<!-- User Profile Dropdown -->
					<div class="dropdown">
						<a href="#" @click.prevent="showUserMenu = !showUserMenu">
							<img class="avatar" src="/img/user.jpg" alt="" />
						</a>
						<div v-if="showUserMenu" class="dropdown-menu dropdown-menu-right">
							<a class="dropdown-item" href="#"><i class="ik ik-user dropdown-icon"></i> Profile</a>
							<a class="dropdown-item" href="#"><i class="ik ik-settings dropdown-icon"></i> Settings</a>
							<a class="dropdown-item" href="#"><i class="ik ik-mail dropdown-icon"></i> Inbox</a>
							<a class="dropdown-item" href="#"><i class="ik ik-navigation dropdown-icon"></i> Message</a>
							<a class="dropdown-item" href="login.html"><i class="ik ik-power dropdown-icon"></i> Logout</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
	.dropdown-menu {
	display: block;
	position: absolute;
	z-index: 1000;
	background: #fff;
	}
</style>

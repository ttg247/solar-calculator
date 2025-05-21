<script setup>
import { inject } from 'vue'

// Inject shared chat state
const chatState = inject('chatState')

// Example users list; replace or fetch dynamically if needed
const users = [
  { name: 'Gene Newman', username: 'gene_newman', avatar: 'img/users/1.jpg', status: 'user--online' },
  { name: 'Billy Black', username: 'billyblack', avatar: 'img/users/2.jpg', status: 'user--online' },
  { name: 'Herbert Diaz', username: 'herbert', avatar: 'img/users/3.jpg', status: 'user--online' },
  { name: 'Sylvia Harvey', username: 'sylvia', avatar: 'img/users/4.jpg', status: 'user--busy' },
  { name: 'Marsha Hoffman', username: 'm_hoffman', avatar: 'img/users/5.jpg', status: 'user--busy' },
  { name: 'Mason Grant', username: 'masongrant', avatar: 'img/users/1.jpg', status: 'user--offline' },
  { name: 'Shelly Sullivan', username: 'shelly', avatar: 'img/users/2.jpg', status: 'user--offline' },
]

// Open chat panel with selected user
function openChat(user) {
  chatState.selectedUser = user
  chatState.isVisible = true
}
</script>

<template>
  <aside class="right-sidebar">
    <div class="sidebar-chat" data-plugin="chat-sidebar">
      <div class="sidebar-chat-info">
        <h6>Chat List</h6>
        <form class="mr-t-10">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search for friends ..." />
            <i class="ik ik-search"></i>
          </div>
        </form>
      </div>
      <div class="chat-list">
        <div class="list-group row">
          <a
            v-for="user in users"
            :key="user.username"
            href="javascript:void(0)"
            class="list-group-item"
            @click.prevent="openChat(user)"
          >
            <figure :class="user.status">
              <img :src="user.avatar" class="rounded-circle" alt="" />
            </figure>
            <span>
              <span class="name">{{ user.name }}</span>
              <span class="username">@{{ user.username }}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { inject } from 'vue'

const chatState = inject('chatState')

function closeChat() {
  chatState.isVisible = false
  chatState.selectedUser = null
}
</script>

<template>
  <div class="chat-panel" v-show="chatState.isVisible">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <a href="javascript:void(0);"><i class="ik ik-message-square text-success"></i></a>
        <span class="user-name">{{ chatState.selectedUser?.name || 'No User Selected' }}</span>
        <button type="button" class="close" aria-label="Close" @click="closeChat">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div class="card-body">
        <div class="widget-chat-activity flex-1">
          <div class="messages">
            <!-- Example messages, you can enhance this -->
            <div class="message media reply" v-if="chatState.selectedUser">
              <figure :class="chatState.selectedUser.status">
                <a href="#">
                  <img :src="chatState.selectedUser.avatar" class="rounded-circle" alt="" />
                </a>
              </figure>
              <div class="message-body media-body">
                <p>Hello {{ chatState.selectedUser.name }}, this is a test message.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form action="javascript:void(0)" class="card-footer" method="post">
        <div class="d-flex justify-content-end">
          <textarea class="border-0 flex-1" rows="1" placeholder="Type your message here"></textarea>
          <button class="btn btn-icon" type="submit"><i class="ik ik-arrow-right text-success"></i></button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.chat-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  background: white;
  border-left: 1px solid #ccc;
  height: 100vh;
  z-index: 2000;
  padding: 1rem;
}
</style>

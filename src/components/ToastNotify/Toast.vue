<template>
    <div class="toast-notify" v-if="visible">
        <div class="toast-content" :class="type">
        <span class="message">{{ message }}</span>
        <button class="close-btn" @click="closeToast">×</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  message: String,
  type: { type: String, default: "info" },
  duration: { type: Number, default: 3000 }
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => visible.value = false, props.duration)
})

function closeToast() {
  visible.value = false
}
</script>


<style scoped>

.toast-notify {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.toast-content {
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.toast-content.info {
    background-color: #2196F3;
}

.toast-content.success {
    background-color: #4CAF50;
}

.toast-content.error {
    background-color: #F44336;
}

.close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
}
.close-btn:hover {
    color: #ddd;
}
</style>
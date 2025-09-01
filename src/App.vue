<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref<boolean>(false)
import Button from '@/components/Button.vue'
import CustomerListModal from '@/components/CustomerListModal.vue'
function closeModal() {
  isOpen.value = false
}
</script>

<template>
  <div class="container mx-auto font-display">
    <Button @click="isOpen = true" />
    <Teleport to="body">
      <CustomerListModal v-if="isOpen" @close="closeModal" />
    </Teleport>
  </div>
</template>

<style scoped></style>

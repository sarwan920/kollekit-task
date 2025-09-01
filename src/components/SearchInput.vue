<script setup lang="ts">
import { Icon } from '@iconify/vue'
const model = defineModel()
</script>
<template>
  <div class="w-full">
    <!-- Search input -->
    <div class="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
      <!-- Search Icon -->
      <Icon icon="formkit:search" height="24px" width="24px" class="text-gray-400" />
      <!-- Input -->
      <input
        v-model="model"
        type="text"
        placeholder="Search for ID or name"
        class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  </div>
</template>

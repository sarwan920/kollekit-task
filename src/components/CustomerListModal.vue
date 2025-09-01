<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import SearchInput from './SearchInput.vue'
import { computed, onMounted } from 'vue'

const emit = defineEmits(['close'])

const search = ref<string>('')
const userStore = useUserStore()

const { users, loading, error } = storeToRefs(userStore)

function closeModal() {
  emit('close')
}

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.value.toLocaleLowerCase()) ||
      user.lastName.toLowerCase().includes(search.value.toLocaleLowerCase()) ||
      user.id.toString().includes(search.value.toLocaleLowerCase()),
  )
})

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <div class="fixed inset-0 max-w-none overflow-y-auto">
    <div @click="closeModal" class="fixed inset-0 bg-gray-900/50"></div>
    <div class="flex items-end justify-center p-4 sm:p-0">
      <div
        class="relative overflow-hidden rounded-4xl bg-white shadow-xl sm:my-8 sm:w-full sm:max-w-2/3 max-h-[calc(100vh-64px)] flex flex-col"
      >
        <!-- MODAL HEADER/SEARCH SECTION -->
        <div class="flex flex-col gap-8 p-5 border-b border-gray-300 flex-shrink-0">
          <div class="flex justify-between">
            <div class="flex gap-4 items-center">
              <div
                class="flex items-center justify-center cursor-pointer border border-gray-200 rounded-full size-10"
                @click="closeModal"
              >
                <Icon icon="formkit:arrowleft" height="24px" width="24px" class="text-gray-600" />
              </div>
              <div>
                <p class="text-sm font-semibold">Return items</p>
                <h1 class="font-bold text-xl">Select Customer</h1>
              </div>
            </div>

            <div
              class="flex items-center justify-center cursor-pointer bg-gray-100 rounded-full size-10"
              @click="closeModal"
            >
              <Icon icon="formkit:close" height="24px" width="24px" class="text-gray-600" />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="w-[350px]">
              <SearchInput v-model="search" />
            </div>
            <p class="text-sm font-semibold">{{ filteredUsers.length }} of {{ users.length }}</p>
          </div>
        </div>

        <!-- SCROLLABLE CONTENT -->
        <div class="flex-1 overflow-y-auto no-scrollbar">
          <div v-if="loading" class="p-5 flex justify-center items-center">
            <Icon icon="svg-spinners:6-dots-rotate" width="65" height="65" />
          </div>
          <div v-else-if="error" class="p-5">error</div>
          <table v-else class="w-full text-left p-4">
            <thead>
              <tr>
                <th style="width: 60%"></th>
                <th style="width: 20%"></th>
                <th style="width: 400px"></th>
              </tr>
            </thead>
            <tbody>
              <div v-if="filteredUsers.length === 0" class="p-5 font-bold">NO USERS FOUND!</div>
              <tr
                v-else
                class="border-b border-gray-200 p-4"
                v-for="user in filteredUsers"
                :key="user.id"
              >
                <td class="p-4">
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <Icon
                        class="absolute right-0 bottom-0 text-green-500"
                        icon="icon-park-solid:check-one"
                        width="16"
                        height="16"
                      />
                      <img :src="user.avatar" alt="User Avatar" class="w-10 h-10 rounded-lg" />
                    </div>
                    <div>
                      <div class="flex flex-row gap-2 items-center">
                        <span
                          class="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded-4xl text-gray-600"
                          >9372291_{{ user.id }}</span
                        >
                        <p class="font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
                      </div>

                      <p class="font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-ellipsis text-sm font-semibold">{{ user.location }}</td>
                <td class="p-4 flex justify-center items-center">
                  <button
                    class="flex items-center py-2 px-4 rounded-full cursor-pointer text-sm font-semibold bg-gray-100 text-[#2A46FF] min-w-[137px]"
                  >
                    Start return
                    <Icon icon="formkit:arrowright" height="20px" width="20px" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

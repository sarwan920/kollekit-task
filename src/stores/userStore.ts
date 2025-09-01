import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface User {
  id: string
  firstName: string
  lastName: string
  avatar: string
  location: string
  createdAt: string
}

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await axios.get<User[]>('https://68b4aca745c901678770ea96.mockapi.io/users')
      users.value = data
    } catch (err) {
      error.value = 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, fetchUsers }
})

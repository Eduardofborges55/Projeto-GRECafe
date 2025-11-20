import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('user'),
    user: null,
    loading: false,
    error: null,
    success: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  
  actions: {
    // 🎯 Inicializa auth ao abrir o app

    loadFromToken() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token) this.token = token
      if (user) this.user = JSON.parse(user)
    },
    async initializeAuth() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        try {
          const { data } = await axios.get('http://localhost:8000/api/user/profile')
          this.user = data
        } catch {
          this.logout() // Token inválido
        }
      }
    },
    
    // 🔑 Faz login
    async login(credentials) {
      this.loading = true
      this.error = null
      this.success = false
      
      try {
        const { data } = await axios.post('http://localhost:8000/api/user/login', credentials)
        
        // Salva token
        this.token = data.token
        this.user = data.user
        localStorage.setItem('token', data.token)
        
        // Configura axios para futuras requisições
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        
        this.success = true
        setTimeout(() => this.success = false, 3000)
        
      } catch (error) {
        this.error = error.response?.data?.message || "Credenciais inválidas"
        setTimeout(() => this.error = null, 5000)
        throw error
      } finally {
        this.loading = false
      }
    },


    
    // 🚪 Faz logout
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})

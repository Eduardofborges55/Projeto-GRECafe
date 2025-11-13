<template>

    <link rel="stylesheet" href="">
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form
      @submit.prevent="handleRegister"
      class="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
    >
      <fieldset>


        

        

        <div class="mb-4">
          <label for="email" class="block mb-1 font-medium">Seu E-mail:</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="w-full p-2 border rounded-md"
            placeholder="E-mail"
            required
          />
        </div>

        <div class="mb-2">
          <label for="password" class="block mb-1 font-medium">Sua Senha:</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="w-full p-2 border rounded-md"
            placeholder="Senha"
            required
          />
        </div>

        <!-- Exibe feedback dinâmico -->
        <ul class="text-sm mb-4 ml-2">
          <li :class="checkMin ? 'text-green-600' : 'text-gray-500'">• Mínimo 8 caracteres</li>
          <li :class="checkUpper ? 'text-green-600' : 'text-gray-500'">• Letra maiúscula</li>
          <li :class="checkLower ? 'text-green-600' : 'text-gray-500'">• Letra minúscula</li>
          <li :class="checkNumber ? 'text-green-600' : 'text-gray-500'">• Número</li>
          <li :class="checkSpecial ? 'text-green-600' : 'text-gray-500'">• Caractere especial (!@#$%&*)</li>
        </ul>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>

        <p v-if="errorMessage" class="text-red-500 text-center mt-4">
          {{ errorMessage }}
        </p>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const formData = ref({
  name: '',
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

// 🧠 Regras de senha (regex)
const checkMin = computed(() => formData.value.password.length >= 8)
const checkUpper = computed(() => /[A-Z]/.test(formData.value.password))
const checkLower = computed(() => /[a-z]/.test(formData.value.password))
const checkNumber = computed(() => /\d/.test(formData.value.password))
const checkSpecial = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(formData.value.password))

// Validação geral
const isPasswordValid = computed(
  () => checkMin.value && checkUpper.value && checkLower.value && checkNumber.value && checkSpecial.value
)

async function handleRegister() {
  loading.value = true
  errorMessage.value = ''

  // 🧩 Verifica antes de enviar
  if (!isPasswordValid.value) {
    errorMessage.value = 'A senha não atende aos requisitos mínimos.'
    loading.value = false
    return
  }

  try {
    const response = await axios.post('http://localhost:8000/api/register', formData.value)

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }

    alert('Cadastro realizado com sucesso!')
    window.location.href = '/login'
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Falha no cadastro. Verifique os dados.'
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="register-wrapper">
    <!-- Partículas de café no background -->
    <div class="coffee-particles">
      <span v-for="i in 5" :key="i" class="particle">☕</span>
    </div>

    <form @submit.prevent="handleRegister" class="register-container">
      <!-- Logo animado -->
      <div class="logo-container">
        <div class="coffee-icon">☕</div>
        <h1>GRECafe</h1>
        <p>Crie sua conta</p>
      </div>

      <!-- Mensagem de erro animada -->
      <transition name="fade">
        <div v-if="errorMessage" class="error-banner">
          ⚠️ {{ errorMessage }}
        </div>
      </transition>

      <fieldset class="problema">
        <!-- Campo NOME (adicionado) -->
        <div class="input-group">
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              placeholder=" "
              required
            />
            <label for="name" class="floating-label">Seu Nome</label>
          </div>
        </div>

        <!-- Campo EMAIL -->
        <div class="input-group">
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              placeholder=" "
              required
            />
            <label for="email" class="floating-label">Seu E-mail</label>
          </div>
        </div>

        <!-- Campo SENHA com toggle -->
        <div class="input-group">
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder=" "
              required
            />
            <label for="password" class="floating-label">Sua Senha</label>
            <button 
              type="button" 
              class="toggle-password" 
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <!-- 🔥 VALIDAÇÃO DE SENHA (mantida) -->
        <ul class="validation-list">
          <li :class="checkMin ? 'valid' : 'invalid'">
            <span class="icon">{{ checkMin ? '✅' : '⏳' }}</span>
            Mínimo 8 caracteres
          </li>
          <li :class="checkUpper ? 'valid' : 'invalid'">
            <span class="icon">{{ checkUpper ? '✅' : '⏳' }}</span>
            Letra maiúscula
          </li>
          <li :class="checkLower ? 'valid' : 'invalid'">
            <span class="icon">{{ checkLower ? '✅' : '⏳' }}</span>
            Letra minúscula
          </li>
          <li :class="checkNumber ? 'valid' : 'invalid'">
            <span class="icon">{{ checkNumber ? '✅' : '⏳' }}</span>
            Número
          </li>
          <li :class="checkSpecial ? 'valid' : 'invalid'">
            <span class="icon">{{ checkSpecial ? '✅' : '⏳' }}</span>
            Caractere especial
          </li>
        </ul>

        <!-- Botão com loading -->
        <button type="submit" :disabled="loading || !isPasswordValid" class="register-button">
          <span v-if="!loading">Cadastrar</span>
          <div v-else class="loading-spinner"></div>
        </button>

        <!-- Links extras -->
        <div class="extra-links">
          <a href="/login" class="link">Já tem conta? Entrar</a>
        </div>
      </fieldset>
    </form>

    <!-- Toast de sucesso -->
    <transition name="slide">
      <div v-if="showSuccess" class="success-toast">
        ✅ Cadastro realizado! Redirecionando...
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import axios from "axios"

// Estado do formulário
const formData = ref({
  name: "",
  email: "",
  password: "",
})

const loading = ref(false)
const errorMessage = ref("")
const showPassword = ref(false)
const showSuccess = ref(false)

// 🔍 Regras de validação (mantidas do seu código)
const checkMin = computed(() => formData.value.password.length >= 8)
const checkUpper = computed(() => /[A-Z]/.test(formData.value.password))
const checkLower = computed(() => /[a-z]/.test(formData.value.password))
const checkNumber = computed(() => /\d/.test(formData.value.password))
const checkSpecial = computed(() => /[!@#$%^&*(),.?":{}|<>-_]/.test(formData.value.password))

const isPasswordValid = computed(() => 
  checkMin.value && checkUpper.value && checkLower.value && checkNumber.value && checkSpecial.value
)

// 🚀 Função de cadastro
async function handleRegister() {
  loading.value = true
  errorMessage.value = ""

  // Verifica se a senha é válida
  if (!isPasswordValid.value) {
    errorMessage.value = "❌ A senha não atende aos requisitos mínimos."
    loading.value = false
    return
  }

  try {
    const response = await axios.post("http://localhost:8000/api/user", formData.value)

    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }

    showSuccess.value = true
    
    // Redireciona com delay para ver a animação
    setTimeout(() => {
      window.location.href = "/login"
    }, 2000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Falha no cadastro. Verifique os dados."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.problema {
  border: none;
}

/* ======= VARIÁVEIS DE COR ======= */
:root {
  --coffee-brown: #8c6449;
  --coffee-light: #c89f7f;
  --coffee-accent: #e85d04;
  --coffee-accent-hover: #d94d00;
  --text-light: #fff8f0;
  --error-bg: #fee2e2;
  --error-text: #b91c1c;
  --success-bg: #dcfce7;
  --success-text: #166534;
}

/* ======= BACKGROUND ANIMADO ======= */
.register-wrapper {
  background: linear-gradient(135deg, #c89f7f 0%, #a67c5a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Partículas de café */
.coffee-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float 15s infinite ease-in-out;
}

.particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { top: 70%; left: 80%; animation-delay: 3s; }
.particle:nth-child(3) { top: 40%; left: 20%; animation-delay: 5s; }
.particle:nth-child(4) { top: 80%; left: 40%; animation-delay: 7s; }
.particle:nth-child(5) { top: 20%; left: 70%; animation-delay: 10s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* ======= CONTAINER DO CADASTRO ======= */
.register-container {
  background: rgba(140, 100, 73, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 2.5rem;
  border-radius: 24px;
  width: 420px;
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 10;
}

/* ======= LOGO ANIMADO ======= */
.logo-container {
  text-align: center;
  margin-bottom: 2.5rem;
}

.coffee-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.logo-container h1 {
  font-size: 2.5rem;
  color: var(--text-light);
  margin: 0;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.logo-container p {
  color: var(--text-light);
  opacity: 0.8;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

/* ======= MENSAGEM DE ERRO ======= */
.error-banner {
  background: var(--error-bg);
  color: var(--error-text);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-left: 4px solid #ef4444;
}

/* ======= INPUTS MODERNOS (FLOATING LABEL) ======= */
.input-group {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  z-index: 2;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  z-index: 2;
}

/* Input estilizado */
.input-wrapper input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem; /* Espaço para ícone */
  border: 2px solid transparent;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--coffee-accent);
  box-shadow: 0 0 0 4px rgba(232, 93, 4, 0.2);
  background: white;
}

/* Floating Label */
.floating-label {
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
  background: transparent;
}

.input-wrapper input:focus + .floating-label,
.input-wrapper input:not(:placeholder-shown) + .floating-label {
  top: 0;
  transform: translateY(-50%) translateY(-10px);
  font-size: 0.75rem;
  color: var(--coffee-accent);
  font-weight: 600;
  background: var(--coffee-brown);
  padding: 0 0.25rem;
  border-radius: 4px;
}

/* ======= VALIDAÇÃO DE SENHA ======= */
.validation-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.validation-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  transition: all 0.3s ease;
}

.validation-list li.valid {
  color: var(--success-text);
  transform: translateX(5px);
}

.validation-list li.invalid {
  color: var(--error-text);
}

.validation-list li .icon {
  font-size: 1rem;
  width: 20px;
  display: inline-block;
}

/* ======= BOTÃO COM LOADING ======= */
.register-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--coffee-accent) 0%, var(--coffee-accent-hover) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(232, 93, 4, 0.3);
}

.register-button:active:not(:disabled) {
  transform: translateY(0);
}

.register-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Spinner de loading */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ======= LINKS EXTRAS ======= */
.extra-links {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.link {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.85rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.link:hover {
  opacity: 1;
  text-decoration: underline;
}

/* ======= TOAST DE SUCESSO ======= */
.success-toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: var(--success-bg);
  color: var(--success-text);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease;
  font-weight: 600;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* ======= ANIMAÇÕES DO VUE ======= */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* ======= RESPONSIVO ======= */
@media (max-width: 480px) {
  .register-container {
    width: 90%;
    padding: 2rem 1.5rem;
  }
  
  .logo-container h1 {
    font-size: 2rem;
  }
}
</style>
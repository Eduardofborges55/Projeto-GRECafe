<template>
  <div class="login-wrapper">
    <form @submit.prevent="handleLogin" class="login-container">
      <h1>GRECafe Login</h1>


      <fieldset>


        <div class="input-group">
          <label for="email">Seu E-mail:</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            placeholder="E-mail"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Sua Senha:</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            placeholder="Senha"
            required
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Entrando..." : "Entrar" }}
        </button>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

// Estado do formulário
const formData = ref({
  email: "",
  password: "",
})

const loading = ref(false)
const errorMessage = ref("")

// Função de login
async function handleLogin() {
  loading.value = true
  errorMessage.value = ""

  try {
    const response = await axios.post("http://localhost:8000/api/login", formData.value)

    // Guarda o token JWT
    localStorage.setItem("token", response.data.token)

    alert("Login realizado com sucesso!")
    window.location.href = "/dashboard"
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Falha no login. Verifique suas credenciais."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===== Layout Geral ===== */
.login-wrapper {
  background-color: #c89f7f;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== Container ===== */
.login-container {
  background-color: #8c6449;
  padding: 40px;
  border-radius: 20px;
  width: 350px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* ===== Logo ===== */
.login-container img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.login-container h1 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 5px;
}

.login-container p {
  font-size: 0.9rem;
  color: #f1f1f1;
  margin-bottom: 20px;
}

/* ===== Campos ===== */
.input-group {
  text-align: left;
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  color: #fff;
  font-weight: 500;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 1rem;
  transition: 0.2s;
}

.input-group input:focus {
  outline: none;
  border: 2px solid #e85d04;
}

/* ===== Botão ===== */
button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #e85d04;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
}

button:hover {
  background-color: #d94d00;
}

button:disabled {
  background-color: #a44b00;
  cursor: not-allowed;
}

/* ===== Erro ===== */
.error-message {
  color: #ffdede;
  font-size: 0.9rem;
  margin-top: 15px;
}
</style>

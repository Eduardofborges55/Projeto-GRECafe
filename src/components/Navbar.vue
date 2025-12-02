
<template>

<nav class="menu-container">
  
  <!-- ESQUERDA -->
  <div class="menu-left">
    <router-link to="/" class="menu-link">Home</router-link>

    <template v-if="isAdmin">
      <router-link to="/Admin" class="menu-link">Administração</router-link>
    </template>

    <template v-if="!isLoggedIn">
      <router-link to="/Cadastro" class="menu-link">Cadastro</router-link>
      <router-link to="/Login" class="menu-link">Login</router-link>
    </template>
  </div>

  <!-- DIREITA: SOMENTE O SAIR -->
  <template v-if="isLoggedIn">
    <button class="menu-link logout" @click="logout">Sair</button>
  </template>
</nav>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore();

// valores reativos vindos do próprio store
const isLoggedIn = computed(() => auth.isAuthenticated);
const isAdmin = computed(() => auth.isAdmin);

console.log("isLoggedIn:", isLoggedIn.value);
console.log("isAdmin:", auth.user?.is_Admin)
console.log("isAdmin:", isAdmin.value, auth.user, auth.isAdmin);
console.log("user:", auth.user);

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    auth.loadFromToken(); // isso irá atualizar o store automaticamente
  }
});

function logout() {
  auth.logout();
  window.location.href = '/Login';
}

</script>


<style>
.menu-container {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;

  background-color: #674736;
  border-radius: 0;

  width: 100%;
  box-sizing: border-box;

  /* Mágica para jogar o Sair para o canto direito */
  justify-content: space-between;
}


.menu-link {
  color: #dab49d;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.menu-link:hover {
  background-color: #6F4E37;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-link.router-link-active{
  background-color: #7B3F00;
  color: #9e806e;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;
  background-color: #674736;
  border-radius: 8px;
  margin: 1rem;
}

/* Mantém os links na esquerda */
.menu-left {
  display: flex;
  gap: 2rem;
}

/* Botão Sair no canto */
.logout {
  margin-left: auto;
}


</style>
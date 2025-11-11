<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- 🔝 Navbar principal -->
  <nav class="flex items-center justify-between px-10 py-4 bg-green-700 text-white shadow-md">
    <h1 class="text-2xl font-semibold tracking-wide">☕ GRECafé</h1>

    <div class="space-x-6 text-lg">
      <RouterLink class="hover:text-yellow-300 transition" to="/">Home</RouterLink>
      <RouterLink class="hover:text-yellow-300 transition" to="/Cadastro">Cadastro</RouterLink>
      <RouterLink class="hover:text-yellow-300 transition" to="/Login">Login</RouterLink>
      <RouterLink class="hover:text-yellow-300 transition" to="/Admin">Admin</RouterLink>
    </div>
  </nav>

  <!-- 🧭 Conteúdo dinâmico -->
  <main class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <RouterView />
    </div>
  </main>

  <!-- ⚙️ Rodapé -->
  <footer class="bg-green-700 text-white text-center py-3">
    <p class="text-sm">© 2025 GRECafé - Sistema de Gerenciamento de Compras de Café</p>
  </footer>
</template>

<style scoped>
/* Estilo global opcional (se quiser suavizar a transição entre páginas) */
main {
  transition: all 0.3s ease-in-out;
}
</style>

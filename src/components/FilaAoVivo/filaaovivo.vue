<template>
  <div class="bg-white p-4 rounded-2xl shadow">
    <h2 class="text-xl font-semibold mb-2">Fila de Compras</h2>

    <ul>
      <li
        v-for="(item, index) in fila"
        :key="item.id"
        :class="{ 'font-bold text-green-600': index === 0 }"
      >
        {{ index + 1 }}º - {{ item.nome }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const fila = ref([
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' },
  { id: 3, nome: 'Pedro' },
])

// axios.get('/api/fila') // ← para pegar a fila real do backend

onMounted(() => {
  console.log('Fila carregada!')
})
</script>
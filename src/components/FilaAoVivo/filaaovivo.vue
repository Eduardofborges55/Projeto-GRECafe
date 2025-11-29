<template>
  <div class="ajuste">
  <div class="bg-white p-6 rounded-2xl shadow-lg min-w-80">
    <!-- Título com ícone -->
    <h2 class="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
      ☕ Fila de pessoas
      <span class="text-sm font-normal text-slate-500">
        ({{ fila.length }} pessoas)
      </span>
    </h2>

    <!-- Lista melhorada -->
    <ul class="space-y-3">
<li
  v-for="(item, index) in fila"
  :key="item.id"
  @click="selecionarItem(item)"
  class="queue-item"
  :class="[
    index === 0 ? 'first-place' : '',
    index === 1 ? 'second-place' : '',
    index === 2 ? 'third-place' : '',
    'bg-slate-50 p-2 rounded-lg flex items-center justify-between text-sm transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow'
  ]"
>
  <!-- Posição -->
  <div class="flex items-center gap-1">
    <span class="trophy-icon text-lg">
      {{ index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🔢' }}
    </span>

    <span class="position-text font-bold text-base" :class="getPositionColor(index)">
      {{ index + 1 }}º
    </span>
  </div>

  <!-- Info -->
  <div class="flex-1 ml-2">
    <p class="client-name font-semibold text-slate-800 text-base">{{ item.name }}</p>
    <p class="client-details text-xs text-slate-500">
      ID: #{{ item.id.toString().padStart(3, '0') }}
    </p>
  </div>
</li>

    </ul>

    

    <!-- Mensagem quando vazio -->
    <div v-if="fila.length === 0" class="text-center py-8 text-slate-400">
      <p class="text-lg">🎉 Ninguém na fila!</p>
      <p class="text-sm">Todos foram atendidos</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const fila = ref([])
const carregando = ref(false)
const erro = ref(null)

// const listarFila = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/api/fila')
//     fila.value = response.data
//   } catch (error) {
//     console.error('Erro ao buscar fila:', error)
//   } finally {
//     carregando.value = false
//   }
// }

// listarFila()

// Função para retornar cor baseada na posição
const getPositionColor = (index) => {
  if (index === 0) return 'text-yellow-500'
  if (index === 1) return 'text-gray-400'
  if (index === 2) return 'text-orange-600'
  return 'text-slate-600'
}

// Ação ao clicar no item
const selecionarItem = (pessoa) => {
  console.log('Selecionado:', pessoa)
  // Você pode emitir um evento ou chamar uma API aqui

}


 async function carregarFila() {


  carregando.value = true
  erro.value = null

  try {
    const token = localStorage.getItem("token")

    const res = await axios.get("http://localhost:8000/api/fila/", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    fila.value = res.data // ✔ Axios usa res.data
  } 
  catch (e) {
    erro.value = "Falha ao carregar usuários."
    console.error("Erro ao carregar usuários:", e)
  }
  finally {
    carregando.value = false
  }
}
carregarFila()
</script>

<style scoped>
/* ===== ESTILOS CUSTOMIZADOS PARA CADA POSIÇÃO ===== */

/* 1º Lugar - Ouro */
.first-place {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
  border: 2px solid #f59e0b !important;
}

/* 2º Lugar - Prata */
.second-place {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%) !important;
  border: 2px solid #9ca3af !important;
}

/* 3º Lugar - Bronze */
.third-place {
  background: linear-gradient(135deg, #fed7aa 0%, #fb923c 100%) !important;
  border: 2px solid #ea580c !important;
}

/* Efeito shimmer para o 1º lugar */
.first-place::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 50%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.7s;
}

.first-place:hover::before {
  left: 100%;
}

/* Animação de pulse para chamar atenção */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.first-place {
  animation: pulse 2s infinite;
}

.ajuste {
  width: 100%;
  height: 50%;
}
</style>
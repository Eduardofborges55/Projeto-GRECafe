<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg min-w-80">
    <!-- Título com ícone -->
    <h2 class="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
      ☕ Fila de Compras
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
          // Classes dinâmicas baseadas na posição
          index === 0 ? 'first-place' : '',
          index === 1 ? 'second-place' : '',
          index === 2 ? 'third-place' : '',
          'bg-slate-50 p-4 rounded-xl flex items-center justify-between transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md'
        ]"
      >
        <!-- Posição com ícone de troféu -->
        <div class="flex items-center gap-3">
          <span class="trophy-icon text-2xl">
            {{ index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🔢' }}
          </span>
          <span class="position-text font-bold text-lg" :class="getPositionColor(index)">
            {{ index + 1 }}º
          </span>
        </div>

        <!-- Info do cliente -->
        <div class="flex-1 ml-4">
          <p class="client-name font-semibold text-slate-800">{{ item.nome }}</p>
          <p class="client-details text-sm text-slate-500">
            ID: #{{ item.id.toString().padStart(3, '0') }}
          </p>
        </div>

        <!-- Quantidade de café -->
        <div class="amount-badge">
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
            {{ item.quantidade }}kg
          </span>
        </div>
      </li>
    </ul>

    <!-- Mensagem quando vazio -->
    <div v-if="fila.length === 0" class="text-center py-8 text-slate-400">
      <p class="text-lg">🎉 Ninguém na fila!</p>
      <p class="text-sm">Todos foram atendidos</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dados mockados com quantidade
const fila = ref([
  { id: 1, nome: 'João', quantidade: 10 },
  { id: 2, nome: 'Maria', quantidade: 2 },
  { id: 3, nome: 'Pedro', quantidade: 30 },
])

// Função para retornar cor baseada na posição
const getPositionColor = (index) => {
  if (index === 0) return 'text-yellow-500'
  if (index === 1) return 'text-gray-400'
  if (index === 2) return 'text-orange-600'
  return 'text-slate-600'
}

// Ação ao clicar no item
const selecionarItem = (item) => {
  console.log('Selecionado:', item)
  // Você pode emitir um evento ou chamar uma API aqui
}
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
</style>
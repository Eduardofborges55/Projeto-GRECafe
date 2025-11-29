<template>
  <!-- BOTÃO PARA ABRIR MODAL -->
  <button class="btn-abrir" @click="modalAberto = true">
    Faça seu pedido
  </button>

  <!-- MODAL -->
  <div class="overlay" v-if="modalAberto">
    <div class="modal">

      <button class="fechar" @click="modalAberto = false">×</button>

      <h2 class="titulo">Novo Pedido</h2>

      <form @submit.prevent="finalizarPedido">
        <label>ID do Usuário</label>
        <input v-model="userId" type="text" placeholder="Digite seu id">

        <label>Quantidade de café (kg)</label>
        <input v-model="quantidade" type="number" placeholder="Ex: 5">

        <label>Data do Pedido</label>
        <input v-model="purchaseDate" type="datetime-local">

        <button type="submit" class="btn-confirmar">
          Concluir Pedido
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Controle do modal
const modalAberto = ref(false)

// Campos do formulário
const userId = ref('')
const quantidade = ref('')
const purchaseDate = ref('') // CORRIGIDO

async function finalizarPedido() {
  const token = localStorage.getItem('token')

  if (!token) {
    console.error("Token não encontrado")
    return
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/compra/registrar/",
      {
        user_id: userId.value,
        amount: quantidade.value,
        purchase_time: purchaseDate.value // CORRIGIDO
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log("Pedido finalizado:", response.data)

    modalAberto.value = false // fecha o modal

  } catch (error) {
    console.error("Erro ao finalizar pedido:", error)
  }
}
</script>


<style scoped>
/* Fundo do modal */
.overlay {
  position: relative;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Caixa do modal */
.modal {
  background: #fff;
  padding: 25px;
  width: 330px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  position: relative;
  animation: aparecer 0.2s ease-out;
}

/* Animação suave */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Botão X */
.fechar {
  position: absolute;
  right: 12px;
  top: 10px;
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #777;
}
.fechar:hover {
  color: #333;
}

/* Título */
.titulo {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

/* Inputs */
input {
  width: 100%;
  padding: 10px;
  margin: 6px 0 12px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border 0.2s;
}
input:focus {
  border-color: #008cff;
  outline: none;
}

/* Labels */
label {
  font-size: 14px;
  color: #444;
}

/* Botão principal */
.btn-confirmar {
  width: 100%;
  padding: 10px;
  background: #008cff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 10px;
  transition: background 0.2s;
}
.btn-confirmar:hover {
  background: #006fcc;
}

/* Botão abrir modal */
.btn-abrir {
  padding: 10px 20px;
  background: #008cff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-abrir:hover {
  background: #006fcc;
}
</style>

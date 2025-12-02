<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="main-title">☕ Gerenciamento de Compras de Café ☕</h1>

    <Toast
        v-if="toast.show"
        :message="toast.message"
        :type="toast.type"
    />

    <div class="grid grid-cols-2 gap-6 items-start"> 
      
      <div class="w-full teste" >
        
        <div>
          <FilaAovivo />
        </div class="ajuste">
        <historicoCompras />
      </div>
      
      
      
    </div>
    <pedindoCafe />
  </div>
</template>

<script setup>
import FilaAovivo from '@/components/FilaAoVivo/FilaAovivo.vue'
import historicoCompras from '@/components/HistoricoCompras/historicoCompras.vue'
import pedindoCafe from '@/components/pedindoCafe/pedindoCafe.vue'
import Toast from "../../components/ToastNotify/Toast.vue"
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'

// TOAST
const toast = ref({
    show: false,
    message: "",
    type: "info"
})

function showToast(msg, tipo="info") {
    toast.value = { show: true, message: msg, type: tipo }

    setTimeout(() => {
        toast.value.show = false
    }, 4000)
}

const jaMostrouToast = ref(false)  
let intervalo = null

async function verificarFila() {
    try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user')) // PEGAR USER LOGADO
        const meuId = user?.id

        if (!meuId) return

        const res = await axios.get("http://localhost:8000/api/fila/primeiro", {
            headers: { Authorization: `Bearer ${token}` }
        })

        const primeiro = res.data

        if (!primeiro) {
            jaMostrouToast.value = false
            return
        }

        const idPrimeiro = primeiro.user_id

        if (idPrimeiro === meuId && !jaMostrouToast.value) {
            showToast(`Você é o próximo da fila! ID: #${meuId}`, "success")
            jaMostrouToast.value = true
        }

        if (idPrimeiro !== meuId) {
            jaMostrouToast.value = false
        }

    } catch (err) {
        console.error(err)
    }
}

onMounted(() => {
    intervalo = setInterval(verificarFila, 3000) 
})


onUnmounted(() => {
    clearInterval(intervalo)
})


async function pegarPrimeiroDaFila() {
    try {
        const token = localStorage.getItem('token')

        const res = await axios.get("http://localhost:8000/api/fila/primeiro", {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.data) {
            showToast("Nenhum usuário na fila!", "error")
            return
        }

        showToast("Primeiro da fila: " + res.data.user_id + " ☕ Sua vez chegou!", "success")
        return res.data

    } catch (err) {
        showToast("Erro ao puxar primeiro da fila", "error")
        console.error(err)
    }
}
</script>


<style>
.main-title {
  text-align: center;
  font-size: 2.5rem;
  color: #674736;
  margin-bottom: 2rem;
  text-shadow: 2px 4px 6px #dab49d;
}

.teste {
  display: flex;
  flex-direction: row;
  gap: 200px
}




</style>
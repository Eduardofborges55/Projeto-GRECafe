<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="main-title">☕ Gerenciamento de Compras de Café ☕</h1>
    

        <button @click="pegarPrimeiroDaFila">Puxar Primeiro da Fila</button>

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
import { ref } from 'vue'

const toast = ref({
    show: false,
    message: "",
    type: "info"
})

function showToast(msg, tipo="info") {
    toast.value = { show: true, message: msg, type: tipo }
}

async function pegarPrimeiroDaFila() {
    try {
        const token = localStorage.getItem('token')

        const r = await axios.get("http://localhost:8000/api/fila/primeiro", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (!r.data) {
            showToast("Nenhum usuário na fila!", "error")
            return
        }

        showToast("Primeiro da fila: " + r.data.nome, "success")

        return r.data

    } catch (err) {
        showToast("Erro ao puxar primeiro da fila", "error")
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



/* A CLASSE .ajustar NÃO É MAIS NECESSÁRIA, POIS O LAYOUT É FEITO PELO TAILWIND */

</style>
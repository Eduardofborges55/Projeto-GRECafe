<template>
    <h1></h1>

    <div class="posicionamento-da-div">

        <div class="lista-admin">

            <p v-if="carregando" class="info">Carregando administradores...</p>

            <p v-if="erro" class="erro">{{ erro }}</p>

            <p v-if="!carregando && admins.length === 0" class="info">
                Nenhum administrador encontrado.
            </p>

            <ul v-if="admins.length > 0" class="lista">
                <li v-for="admin in admins" :key="admin.id" class="item-admin">
                    <span>{{ admin.name }} — <small>{{ admin.email }}</small></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const admins = ref([])
const carregando = ref(false)
const erro = ref(null)

async function carregarAdministradores() {
    carregando.value = true
    erro.value = null

   const token = localStorage.getItem('token') || ''

   try {
       const response = await axios.get('http://localhost:8000/api/admin/', {
           headers: {
               Authorization: `Bearer ${token}`
           }
       })
       console.log('response.data:', response.data)
       admins.value = response.data
   } catch (error) {
       console.error('Erro ao carregar administradores:', error)
       erro.value = 'Erro ao carregar administradores.'
   } finally {
       carregando.value = false
   }
}

onMounted(() => {
    carregarAdministradores()
})
</script>

<style scoped>  

.posicionamento-da-div {
   position: relative;
  left: 60%;
}

.lista-admin {
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background-color: #f9f9f9;
}

.lista {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.item-admin {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

.info {
    color: #555;
    text-align: center;
}

.erro {
    color: red;
    text-align: center;
}

</style>
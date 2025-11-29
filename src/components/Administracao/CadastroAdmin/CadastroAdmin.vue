<template>
  <h1></h1>

  <div class="posicionamento-do-modal">

      <p v-if="carregando" class="info"> Carregando usuários...</p>

  
        <p v-if="erro" class="erro">{{ erro }}</p>

        <p v-if="!carregando && usuarios.length === 0" class="info">
          Nenhum usuário comum encontrado.
        </p>

        

               <ul v-if="usuarios.length > 0" class="lista">
          <li v-for="user in usuarios" :key="user.id" class="item">
            <span>{{ user.name }} — <small>{{ user.email }}</small></span>

            <button class="promover" @click="promover(user.id)">
              Promover
            </button>
          </li>
        </ul>

        
      </div>
</template>


<script setup>
import axios from "axios"
import { ref, onMounted } from "vue"

const usuarios = ref([])
const carregando = ref(false)
const erro = ref(null)

async function carregarUsuarios() {
  carregando.value = true
  erro.value = null

  try {
    const token = localStorage.getItem("token")

    const res = await axios.get("http://localhost:8000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    usuarios.value = res.data // ✔ Axios usa res.data
  } 
  catch (e) {
    erro.value = "Falha ao carregar usuários."
    console.error("Erro ao carregar usuários:", e)
  }
  finally {
    carregando.value = false
  }
}

async function promover(id) {
  if (!confirm("Deseja promover este usuário?")) return

  try {
    const token = localStorage.getItem("token")

    await axios.put(
      `http://localhost:8000/api/admin/button/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    )

    alert("Usuário promovido com sucesso!")
    carregarUsuarios()
  } 
  catch (e) {
    console.error(e)
    alert("Erro ao promover.")
  }
}

onMounted(() => carregarUsuarios())
</script>


<style scoped>
.posicionamento-do-modal {
  position: relative;
  left: 10%;
  top: 20px;
}


.lista-usuarios {
      width: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background-color: #f9f9f9;
}

.lista {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.item-usuario {
  display: flex;
  justify-content: space-between;
  background: #f5f5f5;
  margin-top: 0.5rem;
  padding: 10px;
  border-radius: 5px;
}

.promover {
  background-color: #2b6cb0;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.promover:hover {
  background-color: #1e4f86;
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

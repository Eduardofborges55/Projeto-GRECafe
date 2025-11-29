<template>
    <div class="card history-card">
        <h2 class="card-title">📚 Histórico de Compras</h2>
        <ul class="history-list">
            <li class="history-item " v-for="compra in compras" :key="compra.id">
            <span class="id">#{{ compra.id.toString().padStart(3, '0')}}</span>
            <span class="date">{{ formatDate(compra.created_at) }}</span>
            <span class="quantity">{{ compra.amount }} kg</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { createPinia } from 'pinia';

const compras = ref([]);
const carregando = ref(false);
const erro = ref(null);

const formatDate = (dateString) => {
    const date  = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

async function carregarCompras() {
    carregando.value = true;
    erro.value = null;

    try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/compra/", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        compras.value = res.data;
    } catch (e) {
        erro.value = "Falha ao carregar compras.";
        console.error("Erro ao carregar compras:", e);
    } finally {
        carregando.value = false;
    }
}

carregarCompras();

</script>

<style scoped>
/* Dentro de historicoCompras.vue <style scoped> */
.card {
       background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        
        /* Largura fixada em 600px, e não 100% */
        width: 600px; /* Altere de max-width para width */
        max-width: 600px; 
        margin: 0 auto;
        margin-top: 2rem; 
        margin-bottom: 2rem;
        margin-left: 0;
        margin-right: 0;
}

    .card-title {
    font-size: 1.5rem;
    color: #674736;             
    margin-bottom: 1.5rem;          
    padding-bottom: 0.5rem;     
    border-bottom: 3px solid #674736; 
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.history-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.history-item {
    display: grid;              
    grid-template-columns: 80px 1fr auto; 
    gap: 1rem;                  
    padding: 1rem;              
    margin-bottom: 0.8rem;      
    background: #dab49d;        
    border-left: 5px solid #674736; 
    border-radius: 8px;         
    transition: all 0.3s ease;  
}

.history-item:hover {
    background: #7B3F00;        
    transform: translateX(5px); 
    box-shadow: 0 4px 8px rgba(#7B3F00, 0.2); 
}

.id {
    font-weight: bold;          
    color: #dab49d;            
    font-size: 1.1rem;
    background: #7B3F00;        
    padding: 0.3rem 0.8rem;     
    border-radius: 20px;        
    text-align: center;
}

.date {
    color: #000;             
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.quantity {
    background: #7B3F00;       
    color: #dab49d;              
    padding: 0.3rem 0.8rem;     
    border-radius: 20px;        
    font-weight: bold;
    font-size: 0.95rem;
}
</style>


<template>
    <div class="bg-white p-4 rounded-2x1 shadow">
        <h2 class="text-x1 font-semibold mb-2">Histórico de Compras</h2>
        <ul>
            <li v-for="compra in compras" :key="compra.id">
            {{ compra.user_id }} - {{ compra.created_at }} - qta:{{ compra.amount }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const compras = ref([
    { id: 1, user_id: 1, created_at: '2023-08-01', amount: 5 },
    { id: 2, user_id: 2, created_at: '2023-08-02', amount: 3 },
]);
</script>


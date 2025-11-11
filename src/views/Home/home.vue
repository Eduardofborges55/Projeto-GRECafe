<template>
  <div class ="min-h-screen bg-gray-50 p-8">
   <h1 class="text 3xl font-bold mb-6 text-center">☕ Gerenciamento de Compras de Café ☕</h1>
   <div class="grid grid-cols-3 gap-6">
    <div class="col-span-1">
        <FilaAovivo />
    </div>

            <div class="col-span-2 space-y-6">
                <HistoricoCompras />
        </div>
    </div>
</div>
</template>

<script setup>
import FilaAovivo from '../../components/FilaAoVivo/filaaovivo.vue';
import HistoricoCompras from '../../components/HistoricoCompras/historicoCompras.vue';
</script>
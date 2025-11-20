import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/home.vue'
import Cadastro from '@/views/Cadastro/cadastro.vue'
import Login from '@/views/Login/login.vue'
import Administracao from '@/views/Admin/administracao.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Cadastro', name: 'Cadastro', component: Cadastro },
  { path: '/Login', name: 'Login', component: Login },
  { path: '/Adiminstracao', name: 'Adiminstracao', component: Administracao },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
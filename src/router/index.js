import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home/home.vue'
import cadastro from '../views/Cadastro/cadastro.vue'
import login from '../views/Login/login.vue'
import admin from '../views/Admin/admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home', 
      name: 'home',
      component: () => import('../views/Home/home.vue'),
      component: home
    },
    {
      path: '/Cadastro',
      name: 'cadastro',
      component: () => import('../views/Cadastro/cadastro.vue'),
      component: cadastro
    },

    {
      path: '/Login',
      name: 'login',
      component: () => import('../views/Login/login.vue'),
      component: login
    },

    {
      path: '/Admin',
      name: 'admin',
      component: () => import('../views/Admin/admin.vue'),
      component: admin
    }
    

  ],
})

export default router

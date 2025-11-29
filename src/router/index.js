import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/home.vue'
import Cadastro from '@/views/Cadastro/cadastro.vue'
import Login from '@/views/Login/login.vue'
import Administracao from '@/views/Admin/administracao.vue'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  { path: '/', name: 'Home', component: Home },

  { path: '/Cadastro', name: 'Cadastro', component: Cadastro },

  { path: '/Login', name: 'Login', component: Login },

  { 
    path: '/Admin',
    name: 'Admin',
    component: Administracao,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// === GUARD AQUI ===
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Bloqueia rotas que precisam login
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/Login');
  }

  // Bloqueia rotas que precisam ser admin
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next('/'); // redireciona pra Home
  }

  next();
});

export default router

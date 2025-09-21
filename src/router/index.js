import { createRouter, createWebHistory } from 'vue-router'
import Actividad1 from '@/components/Actividad1.vue'
import Actividad2 from '@/components/Actividad2.vue'

const routes = [
  { path: '/', name: 'Actividad1', component: Actividad1 },
  { path: '/registro', name: 'Actividad2', component: Actividad2 },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

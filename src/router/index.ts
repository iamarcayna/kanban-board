import { createRouter, createWebHistory } from 'vue-router'
import KanbanPage from '../views/pages/KanbanPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'kanban',
      component: KanbanPage
    }
  ]
})

export default router

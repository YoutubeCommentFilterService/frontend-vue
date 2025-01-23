import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/videos', component: () => import('../views/VideosView.vue') },
    { path: '/login', component: () => import('../views/LoginView.vue') },
    { path: '/after-login', component: () => import('../views/AfterLoginView.vue') },
    { path: '/comments', component: () => import('../views/CommentsView.vue') },
    { path: '/my-page', component: () => import('../views/MyPageView.vue')},
    { path: '/inf-scroll', component: () => import('../views/InfScrollTestView.vue')},
  ],
})

export default router

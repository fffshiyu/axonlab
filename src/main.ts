import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoadingPage from './components/LoadingPage.vue'
import HomePage from './components/HomePage.vue'
import NewsPage from './components/NewsPage.vue'
import ProductPage from './components/ProductPage.vue'
import ProductSeriesPage from './components/ProductSeriesPage.vue'
import CooperationPage from './components/CooperationPage.vue'
import JoinUsPage from './components/JoinUsPage.vue'
import './style.css'

const routes = [
  { path: '/', component: LoadingPage },
  { path: '/home', component: HomePage },
  { path: '/news', component: NewsPage },
  { path: '/product', component: ProductPage },
  { path: '/product-series', component: ProductSeriesPage },
  { path: '/cooperation', component: CooperationPage },
  { path: '/join', component: JoinUsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

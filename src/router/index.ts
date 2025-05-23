import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import PokemonListView from '../views/PokemonListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: WelcomeView,
    },
    {
      path: '/pokemonList/:pokemonName?',
      name: 'PokemonList',
      component: PokemonListView,
    },
  ],
})

export default router

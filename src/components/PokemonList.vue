<script setup lang="ts">
import { onMounted, onUnmounted, defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import PokemonCard from './PokemonCard.vue'
import type { PokemonListItem } from '@/interfaces/pokemons'

const props = defineProps<{
  useInfiniteScroll?: boolean
  loading?: boolean
  hasMore?: boolean
  pokemons?: PokemonListItem[]
}>()

const emit = defineEmits<{
  (e: 'load-more'): void
}>()

const router = useRouter()

const pokemonList = ref<HTMLDivElement | undefined>(undefined)
onMounted(() => {
  if (props.useInfiniteScroll && pokemonList.value) {
    pokemonList.value.addEventListener('scroll', handleScroll)
  }
})

const handleScroll = () => {
  const el = pokemonList.value
  if (!el) return
  const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200
  if (nearBottom && !props.loading && props.hasMore) {
    emit('load-more')
  }
}

const handleCardClick = (pokemon: PokemonListItem) => {
  router.push({ name: 'PokemonList', params: { pokemonName: pokemon.name } })
}

onUnmounted(() => {
  if (props.useInfiniteScroll && pokemonList.value) {
    pokemonList.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="pokemon-list" ref="pokemonList">
    <ul>
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
        @card-click="handleCardClick"
      />
    </ul>
  </div>
</template>

<style scoped>
.pokemon-list {
  width: 100%;
  max-width: 570px;
  margin-inline: auto;
  flex-grow: 1;
  padding-inline: 35px;
  overflow-y: auto;
  & ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 10px;
    margin-block: 40px;
  }
}
</style>

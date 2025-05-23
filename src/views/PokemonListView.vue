<script lang="ts" setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonList } from '@/composables/usePokemonList'
import { useFavoritesStore } from '@/stores/favorites'
import { useLoaderStore } from '@/stores/loader'
import SearchInput from '@/components/SearchInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import DetailModal from '@/components/DetailModal.vue'
import PokemonList from '@/components/PokemonList.vue'

import type { PokemonDetailModal } from '@/interfaces/pokemons'

const favoritesStore = useFavoritesStore()

const loader = useLoaderStore()

const { pokemons, loading, hasMore, loadMore, loadModalDetail } = usePokemonList()

const route = useRoute()

const router = useRouter()

const showFavoriteList = ref(false)

const searchValue = ref('')

const selectedPokemon = ref<PokemonDetailModal | null>(null)

const detailModal = ref<InstanceType<typeof DetailModal> | null>(null)

const filteredFavorites = computed(() => {
  return favoritesStore.favorites.filter((p) =>
    p.name.toLowerCase().includes(searchValue.value.toLowerCase()),
  )
})

const filteredPokemons = computed(() => {
  return pokemons.value.filter((p) =>
    p.name.toLowerCase().includes(searchValue.value.toLowerCase()),
  )
})

const isListEmpty = computed(() => {
  return !loading.value && (filteredFavorites.value.length === 0 || pokemons.value.length === 0)
})

watch(showFavoriteList, () => {
  searchValue.value = ''
})

watch(loading, (state) => {
  if (state) {
    loader.showLoader()
  } else {
    loader.hideLoader()
  }
})

watch(
  () => route.params.pokemonName,
  async (name) => {
    if (typeof name === 'string' && name.length > 0) {
      try {
        loader.showLoader()
        selectedPokemon.value = await loadModalDetail(name)
        loader.hideLoader()
        nextTick(() => {
          detailModal.value?.open()
        })
      } catch {
        console.error('The Pokémon could not be loaded')
        selectedPokemon.value = null
        detailModal.value?.close()
      }
    } else {
      selectedPokemon.value = null
      detailModal.value?.close()
    }
  },
  { immediate: true },
)

const deleteRouteParams = () => {
  router.replace({ name: 'PokemonList' })
}

onMounted(() => {
  loadMore()
})
</script>

<template>
  <div class="list">
    <div class="search-bar">
      <SearchInput v-model="searchValue" />
    </div>
    <template v-if="!isListEmpty">
      <PokemonList v-if="showFavoriteList" :pokemons="filteredFavorites" />
      <PokemonList
        v-else
        :pokemons="filteredPokemons"
        :loading="loading"
        :hasMore="hasMore"
        useInfiniteScroll
        @load-more="loadMore"
      />
    </template>
    <div v-else class="empty-state">
      <h2>Uh-oh!</h2>
      <p>You look lost on your journey!</p>
      <BaseButton isLink to="/"> Go back Home </BaseButton>
    </div>
    <div class="bottom-buttons">
      <div class="content">
        <BaseButton
          @click="
            () => {
              showFavoriteList = false
            }
          "
          :variant="!showFavoriteList ? 'primary' : 'secondary'"
          tabindex="2"
        >
          <span class="material-symbols-rounded">list</span>
          All
        </BaseButton>
        <BaseButton
          @click="
            () => {
              showFavoriteList = true
            }
          "
          :variant="showFavoriteList ? 'primary' : 'secondary'"
          tabindex="3"
        >
          <span class="material-symbols-rounded">star</span>
          Favorites
        </BaseButton>
      </div>
    </div>
  </div>
  <DetailModal :details="selectedPokemon" ref="detailModal" @close-modal="deleteRouteParams" />
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  height: 100svh;
  padding-block-start: 30px;
  padding-bottom: 0;

  & .search-bar {
    max-width: 570px;
    width: 100%;
    margin-inline: auto;
    padding-inline: 35px;
  }

  & .bottom-buttons {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: var(--poke-color-base-white);
    box-shadow: 0px -5px 4px 0px #0000000d;

    & .content {
      display: flex;
      gap: 15px;
      width: 100%;
      max-width: 570px;
      justify-content: space-around;
    }

    & :global(.base-button) {
      flex-grow: 1;
      max-width: calc(50% - 7.5px);
    }
  }
  & .empty-state {
    max-width: 570px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    margin-top: 50px;
    height: 100%;
    & h2 {
      font-size: 36px;
      font-weight: 700;
      color: var(--poke-color-grey-darkest);
      margin-bottom: 10px;
    }
    & p {
      font-size: 20px;
      font-weight: 500;
      color: var(--poke-color-grey-dark);
      margin-bottom: 25px;
    }
  }
}
</style>

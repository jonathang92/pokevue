<script setup lang="ts">
import { ref, defineExpose, defineEmits, defineProps, computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { webShare, copyToClipboard } from '@/utils/sharingMethods'
import BaseButton from '@/components/BaseButton.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import type { PokemonDetailModal } from '@/interfaces/pokemons'

const props = defineProps<{
  details: PokemonDetailModal | null
}>()

const emit = defineEmits(['close-modal'])

const favoritesStore = useFavoritesStore()

const dialog = ref<HTMLDialogElement | null>(null)

const isFavorite = computed(() => favoritesStore.isFavorite(props.details?.name ?? ''))

const toggleFavorite = () => {
  if (props.details) {
    favoritesStore.toggleFavorite({
      name: props.details.name,
      url: '',
    })
  }
}

const share = async () => {
  const pokemonName = props.details?.name || 'Pokémon'
  const shareText = `Discover ${pokemonName} and more Pokémon!`
  const shareUrl = window.location.href

  try {
    await webShare({
      title: `Share this ${pokemonName} with your friends!`,
      text: shareText,
      url: shareUrl,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Web Share API is not supported')) {
      console.warn('Web Share API not available, falling back to clipboard copy.')
    } else if (error instanceof Error && error.name === 'AbortError') {
      return
    } else {
      console.error('An unexpected error occurred during Web Share:', error)
    }

    const copied = await copyToClipboard(shareUrl)

    if (copied) {
      alert('Link copied to clipboard!')
    } else {
      alert(
        `Your browser does not support the sharing feature. Please copy the link manually: ${shareUrl}`,
      )
    }
  }
}

const open = (): void => {
  dialog.value?.showModal()
}

const close = (): void => {
  dialog.value?.close()
  emit('close-modal')
}

// Expose the open and close methods to the PokemonListView parent component
defineExpose({ open, close })
</script>

<template>
  <dialog ref="dialog" @close="$emit('close-modal')">
    <div class="modal-content">
      <div class="modal-close">
        <button @click="close">
          <span class="material-symbols-rounded">cancel</span>
        </button>
      </div>
      <header>
        <div class="header-image">
          <img :src="details?.sprite" :alt="details?.name" loading="lazy" />
        </div>
      </header>
      <main class="modal-body">
        <div class="details">
          <p>
            Name: <span class="capitalize">{{ details?.name }}</span>
          </p>
          <p>
            Weight: <span>{{ details?.weight }} Kg</span>
          </p>
          <p>
            Height: <span>{{ details?.height }} m</span>
          </p>
          <p>
            Types: <span class="capitalize">{{ details?.types }}</span>
          </p>
        </div>
        <div class="action">
          <BaseButton @click="share"> Shared to my friends </BaseButton>
          <FavoriteButton :isFavorite="isFavorite" @toggle="toggleFavorite" @click.stop />
        </div>
      </main>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  top: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: none;
  max-width: 570px;
  width: 84%;
  box-sizing: border-box;
  padding: 0; /* el contenido interno puede tener su propio padding */
  border-radius: 5px;
  & header {
    background-image: url('/public/images/pokemon-background.svg');
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 20px; /* <- esto aplica padding arriba y abajo */
    box-sizing: border-box;
    & .header-image {
      display: flex;
      height: 180px;
      width: 180px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  & .modal-close {
    color: var(--poke-color-base-white);
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: fixed;
    z-index: 1;
    & button {
      background: unset;
      padding: unset;
      margin: unset;
      border: unset;
      color: white;
      width: 26px;
      height: 26px;
      & span {
        font-size: 26px;
      }
    }
  }
  & .modal-body {
    padding: 20px 30px;
    & .details p {
      font-weight: 700;
      font-size: 18px;
      color: var(--poke-color-grey-dark);
      line-height: 1.5;
      padding-block: 10px;
      border-bottom: 1px solid var(--poke-color-grey-medium-light);
      & span {
        font-weight: 400;
      }
    }
    & .details .capitalize {
      text-transform: capitalize;
    }
    & .action {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
}
</style>

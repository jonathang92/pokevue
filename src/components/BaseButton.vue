<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  isLink?: boolean
  to?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}>()

defineEmits(['click'])
</script>

<template>
  <component
    :is="isLink ? RouterLink : 'button'"
    :to="isLink ? to : undefined"
    :disabled="disabled"
    :class="['base-button', { inactive: variant === 'secondary' }]"
    @click="!isLink ? $emit('click') : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  background-color: var(--poke-color-red-bright);
  color: var(--poke-color-base-white);
  border-radius: 60px;
  padding: 11px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  border: none;

  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.base-button:active {
  background-color: var(--poke-color-red-dark);
  transform: scale(0.98);
}

.base-button:disabled,
.base-button.inactive,
.base-button.inactive:active {
  background-color: var(--poke-color-grey-medium);
}
.base-button:disabled {
  cursor: not-allowed;
  transform: none;
}
</style>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event): void => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="search">
    <span class="material-symbols-rounded">search</span>

    <input
      :value="modelValue"
      @input="handleInput"
      type="text"
      class="search-input"
      placeholder="Search"
      tabindex="1"
    />
  </div>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: var(--poke-color-base-white);
  border-radius: 5px;
  padding: 14px 15px;
  box-shadow: 0px 2px 10px 0px #0000000a;

  gap: 10px;
  & span {
    color: var(--poke-color-grey-medium);
    font-size: 18px;
  }
  & input {
    flex-grow: 1;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    line-height: 1.4;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: var(--poke-color-grey-darkest);
    &::placeholder {
      color: var(--poke-color-grey-medium);
    }
  }
}
</style>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <main class="welcome">
    <div class="welcome-image">
      <img src="/public/images/welcome-image.svg" alt="" loading="lazy" />
    </div>
    <div class="welcome-text">
      <h1>Welcome to Pokédex</h1>
      <h3>
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </h3>
    </div>
    <BaseButton isLink to="/pokemonList" class="get-started-btn" disabled> Get started </BaseButton>
  </main>
</template>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 25px;
  padding-block-start: 70px;
  & .welcome-text {
    text-align: center;
    margin-top: 60px;
    & h1 {
      font-size: 26px;
      font-weight: 700;
      line-height: normal;
    }
    & h3 {
      margin-top: 30px;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.5;
      color: var(--poke-color-grey-dark);
    }
  }
  & .get-started-btn {
    margin-top: 50px;
  }
}
</style>

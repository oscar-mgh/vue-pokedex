<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';

const favs = useFavoritesStore();
const pokemonStore = usePokemonStore();
const favList = ref([]);

onMounted(async () => {
  favList.value = await Promise.all(
    favs.favIds.map((id) => pokemonStore.fetchById(id))
  );
});
</script>

<template>
  <section>
    <header>
      <h1>⭐ Favorites</h1>
    </header>

    <Transition name="fade" mode="out-in">
      <p v-if="!favList.length">No favorites yet! 💔</p>
      <div v-else class="grid-cards">
        <TransitionGroup name="list" tag="div" class="grid-cards">
          <PokemonCard
            v-for="p in favList"
            :key="p.id"
            :id="p.id"
            :name="p.name"
            :sprite="p.sprites.other['official-artwork'].front_default"
            :shiny="p.sprites.other['official-artwork'].front_shiny"
            :types="p.types"
            :shinyMode="pokemonStore.shinyMode"
          />
        </TransitionGroup>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.2rem;
  padding: 1rem 0;
}

section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img-wrap {
  display: grid;
  place-items: center;
}
.img-wrap img {
  max-width: 200px;
  transition: transform 0.3s;
}
.img-wrap img:hover {
  transform: scale(1.1);
}
.types,
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}
.types li {
  background: var(--brand);
  color: #fff;
  border-radius: 8px;
  padding: 0.3rem 0.6rem;
}
</style>

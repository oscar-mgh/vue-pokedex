<script setup lang="ts">
import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import Pagination from '@/components/Pagination.vue';
import PokemonCard from '@/components/PokemonCard.vue';

const store = usePokemonStore();

onMounted(() => store.fetchPage(store.pageInfo.page));
</script>

<template>
  <section>
    <header class="flex-between">
      <h1>Pokédex</h1>
    </header>
    <section class="flex-between">
      <button @click="store.shinyMode = !store.shinyMode" class="btn">
        {{ store.shinyMode ? '✨ Normal' : '✨ Shiny' }}
      </button>
    </section>

    <Transition name="fade" mode="out-in">
      <div v-if="store.loading" class="pokeball-loader" />
      <div v-else class="grid">
        <TransitionGroup name="list" tag="div" class="grid-cards">
          <PokemonCard
            v-for="p in store.list"
            :key="p.id"
            :id="p.id"
            :name="p.name"
            :sprite="p.sprites.other['official-artwork'].front_default"
            :shiny="p.sprites.other['official-artwork'].front_shiny"
            :types="p.types"
            :shinyMode="store.shinyMode"
            @click="store.goToDetails"
          />
        </TransitionGroup>
      </div>
    </Transition>

    <Pagination
      :page="store.pageInfo.page"
      :totalPages="store.totalPages"
      @change="store.fetchPage"
    />
  </section>
</template>

<style scoped>
.grid {
  margin-top: 1rem;
}

.grid-cards {
  display: grid;
  margin: 1.2rem;
  grid-template-columns: repeat(9, 1fr);
  gap: 1rem;
}

@media (max-width: 1400px) {
  .grid-cards {
    grid-template-columns: repeat(8, 1fr);
  }
}
@media (max-width: 1200px) {
  .grid-cards {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 900px) {
  .grid-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 600px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
}

.btn {
  background: var(--brand);
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}
.btn:hover {
  opacity: 0.85;
  transform: translateY(-2px) scale(1.02);
}

.pokeball-loader {
  margin: 2rem auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 6px solid #000;
  border-top: 6px solid red;
  animation: spin 1s linear infinite;
}

.flex-between {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>

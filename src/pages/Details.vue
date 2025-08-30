<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';

const store = usePokemonStore();
const route = useRoute();
const router = useRouter();

const pokemon = ref<any>(null);
const id = Number(route.params.id);

onMounted(async () => {
  pokemon.value = await store.fetchById(id);
});

const imgSrc = computed(() => {
  if (!pokemon.value) return null;
  return store.shinyMode
    ? pokemon.value.sprites.other['official-artwork'].front_shiny
    : pokemon.value.sprites.other['official-artwork'].front_default;
});

function goBack() {
  router.push({ name: 'home' });
}
</script>

<template>
  <section v-if="pokemon" class="details">
    <button class="back-btn" @click="goBack">Go Back</button>

    <h1>
      #{{ pokemon.id.toString().padStart(4, '0') }}
      {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
    </h1>

    <div class="img-wrap">
      <img v-if="imgSrc" :src="imgSrc" :alt="pokemon.name" />
      <div v-else class="skeleton"></div>
    </div>

    <div class="types">
      <span v-for="t in pokemon.types" :key="t.type.name" class="badge">{{
        t.type.name
      }}</span>
    </div>

    <div class="stats">
      <h2>Stats</h2>
      <ul>
        <li v-for="s in pokemon.stats" :key="s.stat.name">
          <span class="stat-name">{{ s.stat.name.toUpperCase() }}:</span>
          <span class="stat-value">{{ s.base_stat }}</span>
        </li>
      </ul>
    </div>
  </section>

  <div v-else class="pokeball-loader"></div>
</template>

<style scoped>
.details {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  color: var(--text, #222);
}

.back-btn {
  background: var(--brand, #ff3e3e);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: transform 0.2s, opacity 0.2s;
}
.back-btn:hover {
  opacity: 0.85;
  transform: translateY(-2px) scale(1.03);
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.img-wrap {
  display: grid;
  place-items: center;
  min-height: 220px;
  margin-bottom: 1rem;
}

.img-wrap img {
  max-width: 250px;
  transition: transform 0.4s ease, filter 0.3s;
}
.img-wrap img:hover {
  transform: scale(1.1) rotate(-3deg);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
}

.types {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
}

.badge {
  background: var(--brand-dim);
  color: #fff;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  text-transform: capitalize;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}
.badge:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.25);
}

.stats {
  text-align: left;
  margin-top: 1.5rem;
  background: #f7f7f7;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.stats h2 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.stats ul {
  list-style: none;
  padding: 0;
}

.stats li {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}

.stat-name {
  font-weight: 600;
}

.stat-value {
  font-weight: 700;
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

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.details {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  color: var(--text, #222);
}

.back-btn {
  background: var(--brand, #ff3e3e);
  color: var(--text-on-brand, #fff);
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: transform 0.2s, opacity 0.2s;
}

.stats {
  text-align: left;
  margin-top: 1.5rem;
  background: var(--bg-card, #f7f7f7);
  padding: 1rem 1.2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.stats li {
  color: var(--text, #222);
}

.badge {
  background: var(--brand-dim);
  color: #fff;
}
</style>

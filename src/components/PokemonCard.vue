<script setup lang="ts">
import { computed } from 'vue';
import FavoriteButton from './FavoriteButton.vue';

interface Props {
  id: number;
  name: string;
  sprite?: string | null;
  shiny?: string | null;
  types: { slot: number; type: { name: string } }[];
  shinyMode?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const imgSrc = computed(() =>
  props.shinyMode && props.shiny ? props.shiny : props.sprite
);

function handleClick() {
  emit('click', props.id);
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <article class="card hoverable" @click="handleClick">
      <header>
        <strong>#{{ id.toString().padStart(4, '0') }}</strong>
        <FavoriteButton :id="id" @click.stop />
      </header>
      <div class="img-wrap">
        <img v-if="imgSrc" :src="imgSrc" :alt="name" />
        <div v-else class="skeleton"></div>
      </div>
      <h3>{{ name[0].toUpperCase() + name.slice(1) }}</h3>
      <TransitionGroup name="list" tag="div" class="type-list">
        <small v-for="t in types" :key="t.type.name" class="badge">{{
          t.type.name
        }}</small>
      </TransitionGroup>
    </article>
  </Transition>
</template>

<style scoped>
.card {
  background: var(--bg-card, #fff);
  border-radius: 20px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.img-wrap {
  display: grid;
  place-items: center;
  min-height: 120px;
  margin-bottom: 0.6rem;
}

.img-wrap img {
  max-width: 120px;
  transition: transform 0.4s ease;
}

.img-wrap img:hover {
  transform: scale(1.15) rotate(-3deg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.skeleton {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: #e0e0e0;
  animation: pulse 1.2s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  margin: 0.4rem 0;
  color: var(--text);
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.6rem;
}

.badge {
  background: var(--brand-dim);
  color: #fff;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  text-transform: capitalize;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}
.badge:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
</style>

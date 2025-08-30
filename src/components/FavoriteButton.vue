<script setup lang="ts">
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

interface Props {
  id: number;
}

const props = defineProps<Props>();
const favs = useFavoritesStore();

const isFav = computed(() => favs.favIds.includes(props.id));

function toggle() {
  favs.toggleFavorite(props.id);
}
</script>

<template>
  <button @click="toggle" class="fav-btn">
    <Transition name="scale-fade" mode="out-in">
      <span v-if="isFav" key="fav">❤️</span>
      <span v-else key="not">🤍</span>
    </Transition>
  </button>
</template>

<style scoped>
.fav-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  transition: transform 0.2s;
}
.fav-btn:hover {
  transform: scale(1.2);
}
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>

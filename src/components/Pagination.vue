<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  page: number;
  totalPages: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

const visiblePages = computed(() => {
  const maxVisible = 9;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(props.page - half, 1);
  let end = Math.min(start + maxVisible - 1, props.totalPages);
  start = Math.max(end - maxVisible + 1, 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});
</script>

<template>
  <nav class="pagination">
    <button
      :disabled="props.page === 1"
      @click="emit('change', props.page - 1)"
    >
      ⬅ Prev
    </button>

    <div class="pages">
      <button
        v-for="p in visiblePages"
        :key="p"
        @click="emit('change', p)"
        :class="{ active: p === props.page }"
      >
        {{ p }}
      </button>
    </div>

    <button
      :disabled="props.page === props.totalPages"
      @click="emit('change', props.page + 1)"
    >
      Next ➡
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pages {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
}

button {
  border: none;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  background: var(--brand);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  text-align: center;
}

button:hover:not(:disabled) {
  transform: scale(1.1);
  background: #d62828;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.active {
  background: var(--brand-dim);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.page-btn {
  background: var(--bg-page-btn);
  color: var(--text-page-btn);
  border: none;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.page-btn:hover {
  background: var(--bg-page-btn-hover);
  transform: translateY(-2px);
}

.page-btn.active {
  background: var(--brand);
  color: var(--text-on-brand, #fff);
}
</style>

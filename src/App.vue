<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
      <ThemeToggle />
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  background: var(--brand);
  color: white;
}

:root {
  --brand: #e63946;
  --bg: #fff;
  --text: #000;
}

.dark {
  --brand: #4361ee;
  --bg: #121212;
  --text: #f1f1f1;
}

.app {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}
</style>

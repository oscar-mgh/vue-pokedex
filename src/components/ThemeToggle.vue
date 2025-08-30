<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const dark = ref<boolean>(false);

if (localStorage.getItem('theme') === 'dark') {
  dark.value = true;
  document.documentElement.classList.add('dark');
}

watchEffect(() => {
  if (dark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});
</script>

<template>
  <button class="toggle" @click="dark = !dark">
    <Transition name="rotate-fade" mode="out-in">
      <span :key="dark ? '🌙' : '☀️'">{{ dark ? '🌙' : '☀️' }}</span>
    </Transition>
  </button>
</template>

<style scoped>
.toggle {
  background: var(--brand);
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotate-fade-enter-active,
.rotate-fade-leave-active {
  transition: all 0.4s ease;
}
.rotate-fade-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}
.rotate-fade-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}
</style>

import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

export const useThemeStore = defineStore('theme', () => {
	const isDark = ref(false);

	if (localStorage.getItem('pv-theme')) {
		isDark.value = localStorage.getItem('pv-theme') === 'dark';
	} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		isDark.value = true;
	}

	watchEffect(() => {
		document.documentElement.classList.toggle('dark', isDark.value);
		localStorage.setItem('pv-theme', isDark.value ? 'dark' : 'light');
	});

	function toggle() { isDark.value = !isDark.value; }

	return { isDark, toggle };
});
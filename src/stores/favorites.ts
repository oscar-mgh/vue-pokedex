import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
	const favIds = ref<number[]>(JSON.parse(localStorage.getItem('pv-favorites') || '[]'));

	function toggleFavorite(id: number) {
		const i = favIds.value.indexOf(id);
		if (i >= 0) favIds.value.splice(i, 1);
		else favIds.value.push(id);
	}

	watch(favIds, () => localStorage.setItem('pv-favorites', JSON.stringify(favIds.value)), { deep: true });

	return { favIds, toggleFavorite };
});
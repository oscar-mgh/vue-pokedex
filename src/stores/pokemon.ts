import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Pokemon, PokemonListResponse, PageInfo } from '@/types/pokemon';

const API = 'https://pokeapi.co/api/v2';

export const usePokemonStore = defineStore('pokemon', () => {
  const router = useRouter();

  const loading = ref(false);
  const error = ref<string | null>(null);
  const list = ref<Pokemon[]>([]);
  const pageInfo = ref<PageInfo>({ page: 1, pageSize: 18, total: 0 });
  const shinyMode = ref(false);

  const detailCache = new Map<number, Pokemon>();

  const api = axios.create({
    baseURL: API,
    timeout: 5000
  });

  async function fetchPage(page = 1) {
    loading.value = true;
    error.value = null;
    try {
      pageInfo.value.page = page;
      const offset = (page - 1) * pageInfo.value.pageSize;

      const res = await api.get<PokemonListResponse>(`/pokemon`, {
        params: { limit: pageInfo.value.pageSize, offset }
      });

      pageInfo.value.total = res.data.count;

      const items = await Promise.all(
        res.data.results.map(async (r) => {
          const id = Number(r.url.split('/').filter(Boolean).pop());
          if (detailCache.has(id)) return detailCache.get(id)!;

          const pokeRes = await api.get<Pokemon>(`/pokemon/${id}`);
          const poke = pokeRes.data;
          detailCache.set(id, poke);
          return poke;
        })
      );

      list.value = items;
    } catch (e: any) {
      error.value = e.message || 'Error fetching Pokémon';
    } finally {
      loading.value = false;
    }
  }

  async function fetchById(id: number) {
    if (detailCache.has(id)) return detailCache.get(id)!;

    try {
      const res = await api.get<Pokemon>(`/pokemon/${id}`);
      const poke = res.data;
      detailCache.set(id, poke);
      return poke;
    } catch (e: any) {
      throw new Error(e.message || 'Error fetching Pokémon by ID');
    }
  }

  function goToDetails(id: number) {
    router.push({ name: 'details', params: { id } });
  }

  const totalPages = computed(() =>
    Math.ceil(pageInfo.value.total / pageInfo.value.pageSize)
  );

  return { loading, error, list, pageInfo, shinyMode, fetchPage, fetchById, totalPages, goToDetails };
});

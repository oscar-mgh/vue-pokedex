import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
		{ path: '/pokemon/:id', name: 'details', component: () => import('@/pages/Details.vue'), props: true },
		{ path: '/favorites', name: 'favorites', component: () => import('@/pages/Favorites.vue') },
		{ path: '/:pathMatch(.*)*', redirect: '/' }
	]
});
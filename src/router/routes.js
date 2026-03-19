export const routes = [
    {
        path: '/',
        name: 'notes',
        component: () => import('@/pages/PageNotes.vue'),
    },
    {
        path: '/stats',
        name: 'stats',
        component: () => import('@/pages/PageStats.vue'),
    },
];

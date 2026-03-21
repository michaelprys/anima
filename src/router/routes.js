export const routes = [
    {
        path: '/',
        name: 'notes',
        component: () => import('@/pages/PageNotes.vue'),
    },
    {
        path: '/note/:id',
        name: 'note',
        component: () => import('@/pages/PageNote.vue'),
    },
    {
        path: '/terminal',
        name: 'terminal',
        component: () => import('@/pages/PageTerminal.vue'),
        meta: { noTransition: true },
    },
];

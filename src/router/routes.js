export const routes = [
    {
        path: '/',
        name: 'fragments',
        component: () => import('@/pages/PageFragment.vue'),
    },
    {
        path: '/fragment/:id',
        name: 'fragment',
        component: () => import('@/pages/PageFragment.vue'),
    },
    {
        path: '/terminal',
        name: 'terminal',
        component: () => import('@/pages/PageTerminal.vue'),
        meta: { hasTransition: false, hasNavbar: false },
    },
];

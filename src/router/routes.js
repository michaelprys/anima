export const routes = [
    {
        path: '/',
        name: 'fragments',
        component: () => import('@/pages/PageFragments.vue'),
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
    {
        path: '/auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        meta: { hasTransition: false, hasNavbar: false },
        redirect: { name: 'identify' },
        children: [
            {
                path: 'identify',
                name: 'identify',
                component: () => import('@/pages/PageIdentify.vue'),
                meta: { title: 'Identity_Check', hasTransition: false, hasNavbar: false },
            },
            // {
            //     path: 'initialize',
            //     name: 'initialize',
            //     component: () => import('@/pages/PageInitialize.vue'),
            //     meta: { title: 'Initialization', hasTransition: false, hasNavbar: false },
            // },
            // {
            //     path: 'recover',
            //     name: 'recover',
            //     component: () => import('@/pages/PageRecover.vue'),
            //     meta: { title: 'Access_Restoration', hasTransition: false, hasNavbar: false },
            // },
            // {
            //     path: 'reconfigure',
            //     name: 'reconfigure',
            //     component: () => import('@/pages/PageReconfigure.vue'),
            //     meta: { title: 'Credential_Update', hasTransition: false, hasNavbar: false },
            // },
        ],
    },
];

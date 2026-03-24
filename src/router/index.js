import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';
import { useStoreAuth } from '@/stores/auth.store';

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const storeAuth = useStoreAuth();

    if (to.query.verified === 'true') {
        await storeAuth.disconnect();

        return {
            name: 'identify',
            query: { ...to.query, verified: undefined },
            replace: true,
        };
    }

    if (!storeAuth.isAuthChecked) {
        await storeAuth.checkAuth();
    }

    if (to.name === 'reconfigure') {
        return true;
    }

    if (!storeAuth.isLoggedIn && to.meta.requiresAuth) {
        return { name: 'identify', query: { next: to.fullPath }, replace: true };
    }

    if (storeAuth.isLoggedIn && to.meta.guestOnly) {
        return { name: 'fragments', replace: true };
    }

    return true;
});

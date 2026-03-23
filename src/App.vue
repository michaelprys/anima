<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import { watch } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';
import { useRoute, useRouter } from 'vue-router';

const auth = useStoreAuth(),
    route = useRoute(),
    router = useRouter();

watch(
    () => auth.isLoggedIn,
    (isLoggedIn) => {
        if (!isLoggedIn && route.meta.requiresAuth) {
            router.push({ name: 'identify' });
        } else {
            if (route.name === 'identify') {
                const nextPath = route.query.next || { name: 'fragments' };

                router.push(nextPath);
            }
        }
    },
);
</script>

<template>
    <AppNavbar />

    <router-view v-slot="{ Component, route }">
        <component
            :is="Component"
            v-if="route.meta.hasTransition === false"
            :key="route.fullPath" />

        <Transition v-else name="fade" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
        </Transition>
    </router-view>
</template>

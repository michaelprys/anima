<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const transitionName = ref('fade');

router.beforeEach((to, from) => {
    if (!to.meta.hasTransition || !from.meta.hasTransition) {
        transitionName.value = '';
    } else {
        transitionName.value = 'fade';
    }
});
</script>

<template>
    <AppNavbar />

    <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

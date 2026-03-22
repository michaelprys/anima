<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue';
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

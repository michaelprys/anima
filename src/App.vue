<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import BaseToast from '@/components/base/BaseToast.vue';
import { useToast } from '@/composables/useToast.js';

const { toastState } = useToast();
</script>

<template>
    <AppNavbar />
    <BaseToast :active="toastState.active" :message="toastState.message" :type="toastState.type" />

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

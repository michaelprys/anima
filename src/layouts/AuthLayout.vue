<script setup>
import { useOnline } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { useEsc } from '@/composables/useEsc';

const online = useOnline();
const route = useRoute();

useEsc();
</script>

<template>
    <div
        class="bg-canvas selection:bg-blue-system/30 fixed inset-0 z-1000 flex items-center justify-center overflow-hidden px-6 text-left font-mono uppercase">
        <div
            class="from-blue-system/10 via-canvas/5 pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] to-transparent"></div>

        <Transition name="terminal-in" appear>
            <div
                class="group border-blue-system/30 bg-base-card/95 relative w-full max-w-130 border p-16 shadow-[0_0_7.5rem_rgba(2,6,23,1)] backdrop-blur-2xl md:p-22">
                <div
                    class="bg-blue-system shadow-glow-blue absolute -top-px -left-px h-0.5 w-16"></div>
                <div
                    class="bg-blue-system shadow-glow-blue absolute -top-px -left-px h-16 w-0.5"></div>

                <div class="bg-blue-system/20 absolute -right-px -bottom-px h-px w-16"></div>
                <div class="bg-blue-system/20 absolute -right-px -bottom-px h-16 w-px"></div>

                <header class="relative mb-20">
                    <div class="flex items-center gap-6">
                        <div class="relative flex h-3 w-3 items-center justify-center">
                            <div
                                class="bg-cyan-light absolute inset-0 h-full w-full animate-ping rounded-full opacity-20"></div>
                            <div
                                class="bg-blue-system shadow-glow-blue relative z-10 h-2.5 w-2.5 rounded-full"></div>
                        </div>
                        <span
                            class="text-[0.8125rem] font-bold tracking-[0.8em] text-white uppercase drop-shadow-[0_0_0.5rem_rgba(59,130,246,0.5)]">
                            {{ route.meta.title || 'System_Access' }}
                        </span>
                    </div>
                    <div
                        class="from-blue-system/50 via-blue-system/10 mt-8 h-px w-full bg-linear-to-r to-transparent"></div>
                </header>

                <div class="flex min-h-50 flex-col justify-center">
                    <RouterView v-slot="{ Component }">
                        <Transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </RouterView>
                </div>

                <div
                    class="mt-20 flex items-center justify-between px-2 text-[0.5625rem] tracking-[0.4em]">
                    <div class="flex items-center gap-4">
                        <span class="text-blue-system/30">Auth_Gateway</span>
                    </div>
                    <span
                        :class="online ? 'text-blue-system' : 'text-rose-danger'"
                        class="transition-colors duration-500">
                        Link: {{ online ? 'Active' : 'Offline' }}
                    </span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.terminal-in-enter-active {
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.terminal-in-enter-from {
    opacity: 0;
    transform: translateY(1.875rem) scale(0.99);
    filter: blur(0.9375rem);
}
</style>

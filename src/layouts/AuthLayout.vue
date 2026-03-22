<script setup>
import { useOnlineStatus } from '@/composables/useOnlineStatus';
import { useRoute } from 'vue-router';

const { online } = useOnlineStatus();
const route = useRoute();
</script>

<template>
    <div
        class="fixed inset-0 bg-[#020617] flex items-center justify-center px-6 overflow-hidden z-1000 font-mono selection:bg-blue-500/30 text-left uppercase">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-600/10 via-blue-950/5 to-transparent pointer-events-none"></div>

        <Transition name="terminal-in" appear>
            <div
                class="w-full max-w-130 border border-blue-500/30 bg-[#070e20]/95 p-16 md:p-22 relative group shadow-[0_0_120px_rgba(2,6,23,1)] backdrop-blur-2xl">
                <div
                    class="absolute -top-px -left-px w-16 h-0.5 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                <div
                    class="absolute -top-px -left-px w-0.5 h-16 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>

                <div class="absolute -bottom-px -right-px w-16 h-px bg-blue-400/20"></div>
                <div class="absolute -bottom-px -right-px w-px h-16 bg-blue-400/20"></div>

                <RouterLink
                    :to="{ name: 'fragments' }"
                    class="absolute top-8 right-10 text-[10px] uppercase tracking-[0.5em] font-bold text-blue-400/40 hover:text-blue-300 transition-all duration-500 focus:outline-none cursor-pointer">
                    [ Terminate ]
                </RouterLink>

                <header class="mb-20 relative">
                    <div class="flex items-center gap-6">
                        <div class="relative flex items-center justify-center w-3 h-3">
                            <div
                                class="w-full h-full bg-blue-400 animate-ping absolute inset-0 rounded-full opacity-20"></div>
                            <div
                                class="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] relative z-10"></div>
                        </div>
                        <span
                            class="text-[13px] font-bold uppercase tracking-[0.8em] text-blue-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                            {{ route.meta.title || 'System_Access' }}
                        </span>
                    </div>
                    <div
                        class="h-px w-full bg-linear-to-r from-blue-500/50 via-blue-400/10 to-transparent mt-8"></div>
                </header>

                <div class="min-h-50 flex flex-col justify-center">
                    <RouterView v-slot="{ Component }">
                        <Transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </RouterView>
                </div>

                <div
                    class="mt-20 flex items-center justify-between px-2 text-[9px] tracking-[0.4em]">
                    <div class="flex gap-4 items-center">
                        <span class="text-blue-400/30">Auth_Gateway</span>
                    </div>
                    <span
                        :class="online ? 'text-blue-400' : 'text-red-400'"
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
    transform: translateY(30px) scale(0.99);
    filter: blur(15px);
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.4s ease,
        transform 0.4s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(4px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-4px);
}
</style>

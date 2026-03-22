<script setup>
import { useOnlineStatus } from '@/composables/useOnlineStatus';
import { useRoute } from 'vue-router';

const { online } = useOnlineStatus();
const route = useRoute();
</script>

<template>
    <div
        class="fixed inset-0 bg-[#010307] flex items-center justify-center px-6 overflow-hidden z-1000 font-mono selection:bg-cyan-500/30 text-left uppercase">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>

        <Transition name="terminal-in" appear>
            <div
                class="w-full max-w-110 border border-cyan-500/20 bg-[#05080f]/95 p-12 md:p-16 relative group shadow-[0_0_100px_rgba(0,0,0,1)] backdrop-blur-xl">
                <div
                    class="absolute -top-px -left-px w-12 h-0.5 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                <div
                    class="absolute -top-px -left-px w-0.5 h-12 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                <div class="absolute -bottom-px -right-px w-12 h-px bg-white/5"></div>
                <div class="absolute -bottom-px -right-px w-px h-12 bg-white/5"></div>

                <RouterLink
                    :to="{ name: 'fragments' }"
                    class="absolute top-6 right-8 text-[9px] uppercase tracking-[0.4em] font-black text-rose-500/60 hover:text-rose-500 transition-all duration-300 focus:outline-none cursor-pointer">
                    [ Shutdown ]
                </RouterLink>

                <header class="mb-14 relative">
                    <div class="flex items-center gap-4">
                        <div class="relative flex items-center justify-center w-2 h-2">
                            <div
                                class="w-2 h-2 bg-cyan-500 animate-ping absolute inset-0 rounded-full opacity-30"></div>
                            <div
                                class="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#00ffff] relative z-10"></div>
                        </div>
                        <span
                            class="text-[12px] font-black uppercase tracking-[0.6em] text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                            {{ route.meta.title || 'System_Auth' }}
                        </span>
                    </div>
                    <div
                        class="h-px w-full bg-linear-to-r from-cyan-500/40 via-white/5 to-transparent mt-6"></div>
                </header>

                <RouterView v-slot="{ Component }">
                    <Transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>

                <div
                    class="mt-14 flex items-center justify-between px-2 text-[8px] tracking-[0.3em]">
                    <span class="text-white/20">Auth_Mode_V.4 // Core</span>
                    <span class="text-white/30 italic">
                        Status: {{ online ? 'Stable' : 'Lost' }}
                    </span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.terminal-in-enter-active {
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.terminal-in-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
    filter: blur(10px);
}
</style>

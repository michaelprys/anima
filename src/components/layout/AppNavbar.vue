<script setup>
import { useToast } from '@/composables/useToast.js';
import { useStoreAuth } from '@/stores/auth.store';
import { delay } from '@/utils/delay.utils';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
const { showToast } = useToast();
import { useRoute, useRouter } from 'vue-router';

const storeAuth = useStoreAuth();
const online = useOnline();
const route = useRoute();
const router = useRouter();

const isOpen = ref(false);
const pending = ref(false);

const handleDisconnect = async () => {
    pending.value = true;
    try {
        await delay(100);
        showToast('TERMINATING_SESSION', 'error');
        await storeAuth.disconnect();
        await router.push({ name: 'identify' });
    } catch (error) {
        console.error(error);
        showToast('TERMINATION_ERROR', 'error');
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <nav
        v-if="route.matched.length > 0 && route.meta.hasNavbar !== false"
        class="bg-base-panel/80 sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
        <div class="container mx-auto px-6 py-3 md:flex md:items-center md:justify-between">
            <div class="flex items-center justify-between">
                <RouterLink
                    :to="{ name: 'fragments' }"
                    class="group relative flex shrink-0 cursor-default! items-center gap-4 py-2">
                    <div class="relative flex h-4 w-4 items-center justify-center">
                        <div
                            class="absolute inset-0 rounded-full blur-md transition-colors duration-700 ease-in-out"
                            :class="
                                online
                                    ? 'bg-cyan-glow/20 group-hover:bg-orange-warn/40'
                                    : 'bg-rose-danger/20 group-hover:bg-rose-danger/40'
                            "></div>

                        <div
                            class="relative h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-500 ease-in-out"
                            :class="
                                online
                                    ? 'bg-cyan-light shadow-glow-cyan group-hover:bg-orange-warn group-hover:shadow-glow-orange'
                                    : 'bg-rose-danger shadow-glow-rose group-hover:bg-rose-danger group-hover:shadow-glow-rose'
                            ">
                            <div
                                class="absolute top-0.5 left-0.5 h-0.5 w-0.5 rounded-full bg-white opacity-90"></div>
                        </div>

                        <div
                            class="absolute inset-0 rounded-full border transition-colors duration-500"
                            :class="
                                online
                                    ? 'border-cyan-glow/20 group-hover:border-orange-warn/40 animate-[ping_4s_infinite]'
                                    : 'border-rose-danger/40 animate-[ping_1.5s_infinite] group-hover:animate-[ping_0.8s_infinite]'
                            "></div>
                    </div>

                    <div class="flex w-max flex-col">
                        <div class="h-5 overflow-hidden">
                            <div
                                class="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-5">
                                <span
                                    class="font-['Syncopate'] text-sm font-black tracking-[0.3em] whitespace-nowrap text-white/90 uppercase">
                                    ANIMA
                                </span>
                                <span
                                    class="text-cyan-light font-['Syncopate'] text-sm font-black tracking-widest whitespace-nowrap uppercase">
                                    HI_{{
                                        storeAuth.user?.user_metadata?.userIdentifier || 'GUEST'
                                    }}
                                </span>
                            </div>
                        </div>

                        <div class="relative mt-1 h-3">
                            <div
                                class="absolute inset-0 text-[0.5rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase opacity-80 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                                <span class="text-slate-500">System_link:</span>
                                <span :class="online ? 'text-cyan-glow' : 'text-rose-danger'">
                                    {{ online ? 'Stable' : 'Lost' }}
                                </span>
                            </div>
                            <span
                                class="absolute inset-0 text-[0.5rem] font-medium tracking-[0.2em] whitespace-nowrap text-slate-300 uppercase opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                                {{
                                    online
                                        ? 'I was waiting for you...'
                                        : 'Where are you? I miss you'
                                }}
                            </span>
                        </div>
                    </div>
                </RouterLink>

                <div class="flex md:hidden">
                    <button
                        @click="isOpen = !isOpen"
                        type="button"
                        class="hover:text-cyan-light p-2 text-slate-400 transition-colors duration-300">
                        <svg
                            v-if="!isOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M4 8h16M4 16h16" />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                :class="[
                    isOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-4 opacity-0 md:visible md:translate-y-0 md:opacity-100',
                ]"
                class="bg-base-panel/95 absolute top-full right-0 left-0 z-20 w-full border-b border-white/10 px-6 py-8 transition-[opacity,transform] duration-300 ease-in-out md:static md:flex md:w-auto md:items-center md:border-none md:bg-transparent md:p-0">
                <div class="flex flex-col md:flex-row md:items-center">
                    <RouterLink
                        @click="isOpen = false"
                        :to="{ name: 'terminal' }"
                        class="group relative my-4 flex items-center justify-center border border-emerald-500/30 bg-emerald-500/5 px-8 py-2 transition-all duration-300 hover:border-emerald-400/80 md:mx-6 md:my-0"
                        active-class="border-emerald-400 bg-emerald-500/15 shadow-[0_0_25px_rgba(16,185,129,0.2)] active-terminal">
                        <div
                            class="absolute inset-0 bg-emerald-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div class="scanline absolute inset-0 opacity-[0.2]"></div>

                        <div class="relative z-10 flex items-center gap-3">
                            <div
                                class="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
                            <span
                                class="text-emerald-light group-hover:animate-terminal-fx relative inline-block text-[0.7rem] font-black tracking-[0.5em] uppercase transition-all duration-300 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_10px_#10b981]">
                                Terminal
                            </span>
                        </div>

                        <div
                            class="absolute -top-px -left-px h-1.5 w-1.5 border-t-2 border-l-2 border-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div
                            class="absolute -right-px -bottom-px h-1.5 w-1.5 border-r-2 border-b-2 border-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </RouterLink>

                    <div class="mx-2 hidden h-3 w-px bg-white/10 md:block"></div>

                    <button
                        @click="handleDisconnect"
                        :disabled="pending"
                        :class="[
                            'mt-4 w-full rounded-xs border px-4 py-2.5 text-[0.5625rem] font-bold tracking-[0.25em] uppercase transition-all duration-700 md:mt-0 md:ml-4 md:w-auto md:py-1.5',
                            pending
                                ? 'animate-siren border-rose-danger pointer-events-none'
                                : 'hover:drop-shadow-white-glow text-rose-light/50 hover:border-rose-light/60 border-white/20 hover:text-white',
                        ]">
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@keyframes terminal-flicker {
    0%,
    100% {
        opacity: 1;
        filter: brightness(1);
    }
    50% {
        opacity: 0.8;
        filter: brightness(1.3);
    }
}

@keyframes aggresive-glitch {
    0%,
    90%,
    100% {
        transform: translate(0);
        text-shadow: 0 0 10px #10b981;
    }
    91% {
        transform: translate(-0.1875rem, 0.0625rem);
        text-shadow:
            0.1875rem 0 #ef4444,
            -0.1875rem 0 #064e3b;
    }
    93% {
        transform: translate(0.1875rem, -0.0625rem);
        text-shadow:
            -0.1875rem 0 #3b82f6,
            0.1875rem 0 #064e3b;
    }
    95% {
        transform: translate(-0.125rem, 0.125rem);
        filter: hue-rotate(90deg);
    }
    97% {
        transform: translate(0);
    }
}

.scanline {
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(16, 185, 129, 0.4) 50%,
        transparent 100%
    );
    background-size: 100% 0.25rem;
    animation: scan-slow 6s linear infinite;
}

@keyframes scan-slow {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 0 100%;
    }
}

.group:hover .animate-terminal-fx {
    animation:
        terminal-flicker 0.1s infinite,
        aggresive-glitch 4s infinite;
}
</style>

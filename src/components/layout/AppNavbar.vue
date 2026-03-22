<script setup>
import { ref } from 'vue';
import { useOnlineStatus } from '@/composables/useOnlineStatus.js';
import { useRoute } from 'vue-router';

const { online } = useOnlineStatus();
const route = useRoute();

const isOpen = ref(false);
</script>

<template>
    <nav
        v-if="route.matched.length > 0 && route.meta.hasNavbar !== false"
        class="sticky top-0 z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/10">
        <div class="container px-8 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div class="flex items-center justify-between">
                <RouterLink
                    :to="{ name: 'fragments' }"
                    class="flex items-center gap-5 group shrink-0 relative py-2">
                    <div class="relative flex items-center justify-center w-4 h-4">
                        <div
                            class="absolute inset-0 rounded-full blur-md transition-all duration-700 ease-in-out"
                            :class="
                                online
                                    ? 'bg-cyan-500/20 group-hover:bg-orange-500/40'
                                    : 'bg-rose-500/20 group-hover:bg-rose-600/40'
                            "></div>

                        <div
                            class="relative w-2 h-2 rounded-full transition-all duration-500 ease-in-out"
                            :class="
                                online
                                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] group-hover:bg-orange-400 group-hover:shadow-[0_0_12px_#fb923c]'
                                    : 'bg-rose-500 shadow-[0_0_8px_#f43f5e] group-hover:bg-rose-600 group-hover:shadow-[0_0_12px_#e11d48]'
                            ">
                            <div
                                class="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
                        </div>

                        <div
                            class="absolute inset-0 border rounded-full transition-all duration-500"
                            :class="
                                online
                                    ? 'border-cyan-500/20 group-hover:border-orange-500/40 animate-[ping_4s_infinite]'
                                    : 'border-rose-500/40 group-hover:border-rose-600 animate-[ping_1.5s_infinite] group-hover:animate-[ping_0.8s_infinite]'
                            "></div>
                    </div>

                    <div class="flex flex-col">
                        <div class="overflow-hidden h-5">
                            <div
                                class="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-5">
                                <span
                                    class="font-logo text-[15px] font-black tracking-[0.3em] uppercase text-white/90">
                                    ANIMA
                                </span>
                                <span
                                    class="font-logo text-[15px] font-black tracking-widest uppercase text-cyan-400">
                                    HELLO_USER
                                </span>
                            </div>
                        </div>

                        <div class="relative h-3 mt-1">
                            <div
                                class="absolute inset-0 text-[8px] font-medium tracking-[0.2em] uppercase opacity-80 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                                <span class="text-slate-500">System_link:</span>
                                <span :class="online ? 'text-cyan-500' : 'text-rose-500'">
                                    {{ online ? 'Stable' : 'Lost' }}
                                </span>
                            </div>
                            <span
                                class="absolute inset-0 text-[8px] font-medium tracking-[0.2em] text-slate-300 uppercase opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
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
                        class="text-slate-400 hover:text-cyan-400 transition-colors duration-300 p-1">
                        <svg
                            v-if="!isOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
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
                            class="w-5 h-5"
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
                        ? 'translate-x-0 opacity-100'
                        : 'opacity-0 -translate-x-full md:opacity-100 md:translate-x-0',
                ]"
                class="absolute inset-x-0 z-20 w-full px-8 py-6 bg-slate-900 border-b border-white/10 transition-[opacity,transform] duration-500 ease-in-out md:static md:flex md:items-center md:w-auto md:p-0 md:bg-transparent md:border-none md:transition-none">
                <div class="flex flex-col md:flex-row md:items-center">
                    <RouterLink
                        :to="{ name: 'fragments' }"
                        class="my-3 md:my-0 text-[10px] font-semibold tracking-[0.3em] text-slate-400 transition-all duration-500 hover:text-cyan-400 md:mx-6 uppercase"
                        active-class="text-cyan-400 shadow-[0_15px_20px_-10px_rgba(34,211,238,0.3)]">
                        Fragments
                    </RouterLink>

                    <RouterLink
                        :to="{ name: 'terminal' }"
                        class="my-3 md:my-0 text-[10px] font-bold tracking-[0.3em] text-emerald-500/80 drop-shadow-[0_0_5px_#10b981] transition-all duration-500 hover:text-emerald-400 hover:drop-shadow-[0_0_15px_#10b981] md:mx-6 uppercase flex items-center gap-1.5 group"
                        active-class="text-emerald-400 !drop-shadow-[0_0_20px_#10b981]">
                        <span
                            class="text-[8px] opacity-20 group-hover:opacity-60 transition-opacity font-mono">
                            [
                        </span>
                        Terminal
                        <span
                            class="text-[8px] opacity-20 group-hover:opacity-60 transition-opacity font-mono">
                            ]
                        </span>
                    </RouterLink>

                    <div class="h-3 w-px bg-white/10 mx-2 hidden md:block"></div>

                    <button
                        class="mt-6 md:mt-0 ml-0 md:ml-4 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-700 rounded-xs active:scale-95 shadow-lg shadow-cyan-500/10">
                        Identify
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

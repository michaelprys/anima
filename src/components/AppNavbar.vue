<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
    <nav class="sticky top-0 z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/10">
        <div class="container px-8 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div class="flex items-center justify-between">
                <RouterLink :to="{ name: 'notes' }" class="flex items-center gap-4 group shrink-0">
                    <img
                        class="w-auto h-5.5 opacity-80 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110"
                        src="../assets/images/logo.avif"
                        alt="Neemo" />

                    <span
                        class="font-logo text-[13px] font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent transition-all duration-1000 ease-in-out group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:tracking-[0.4em]">
                        Neemo
                    </span>
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
                        :to="{ name: 'notes' }"
                        class="my-3 md:my-0 text-[10px] font-semibold tracking-[0.2em] text-slate-400 transition-all duration-500 hover:text-cyan-400 md:mx-6 uppercase"
                        active-class="text-cyan-400 shadow-[0_15px_20px_-10px_rgba(34,211,238,0.3)]">
                        Notes
                    </RouterLink>

                    <RouterLink
                        :to="{ name: 'stats' }"
                        class="my-3 md:my-0 text-[10px] font-semibold tracking-[0.2em] text-slate-400 transition-all duration-500 hover:text-cyan-400 md:mx-6 uppercase"
                        active-class="text-cyan-400 shadow-[0_15px_20px_-10px_rgba(34,211,238,0.3)]">
                        Stats
                    </RouterLink>

                    <div class="h-3 w-[1px] bg-white/20 mx-2 hidden md:block"></div>

                    <button
                        class="mt-6 md:mt-0 ml-0 md:ml-4 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-700 rounded-[2px] active:scale-95 shadow-lg shadow-cyan-500/10">
                        Nitro
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

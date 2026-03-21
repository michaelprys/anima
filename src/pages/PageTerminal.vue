<script setup>
import { useOnlineStatus } from '@/composables/useOnlineStatus';

const { online } = useOnlineStatus();
</script>

<template>
    <div
        class="fixed inset-0 bg-slate-950/92 backdrop-blur-xl flex items-center justify-center z-1000 cursor-crosshair">
        <div
            class="mx-6 max-w-136 w-full bg-[#030712] border border-blue-500/30 p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative">
            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/40"></div>
            <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/40"></div>
            <div
                class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/40"></div>
            <div
                class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/40"></div>

            <header class="flex items-center justify-between mb-12">
                <div class="flex items-center">
                    <span
                        class="w-2 h-2 bg-cyan-500 mr-4 animate-blink shadow-[0_0_8px_#0ea5e9]"></span>
                    <span class="text-cyan-400 text-sm tracking-[0.4em] uppercase font-bold">
                        Anima_v.01
                    </span>
                </div>
                <router-link
                    to="/"
                    class="text-slate-500 hover:text-rose-500 transition-all text-[10px] uppercase tracking-[0.2em] group flex items-center">
                    <span class="group-hover:text-rose-500/40">[</span>
                    <span
                        class="mx-2 group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] font-medium text-rose-500">
                        Exit
                    </span>
                    <span class="group-hover:text-rose-500/40">]</span>
                </router-link>
            </header>

            <div class="space-y-10 text-slate-300 uppercase tracking-widest">
                <section class="space-y-4">
                    <p class="text-[10px] text-slate-500 tracking-[4px] font-bold">Memory</p>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="text-slate-600 font-medium">Fragments:</span>
                            <span class="text-slate-200 font-mono">24 Units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600 font-medium">Data_Size:</span>
                            <span class="text-slate-200 font-mono">1.42 KB</span>
                        </div>
                    </div>
                </section>

                <section class="space-y-4">
                    <p class="text-[10px] text-slate-500 tracking-[4px] font-bold">Sync</p>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="text-slate-600 font-medium">Link_Status:</span>
                            <span
                                class="font-bold italic shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                                :class="online ? 'text-emerald-500' : 'text-rose-500'">
                                {{ online ? 'Stable' : 'Lost' }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600 font-medium">Location:</span>
                            <span class="text-slate-200 font-mono italic text-right">
                                Sector
                                <br />
                                <span class="text-[9px] opacity-40">51.50° N, 0.12° W</span>
                            </span>
                        </div>
                    </div>
                </section>

                <section class="pt-2">
                    <div class="text-[10px] space-y-3">
                        <span class="text-slate-500 tracking-[3px] font-bold">Load</span>
                        <div
                            class="text-cyan-500/40 text-[10px] font-mono leading-none tracking-normal">
                            [||||||||||....................] 25%
                        </div>
                    </div>
                </section>

                <footer class="mt-14 pt-8 border-t border-white/10 flex flex-col space-y-3">
                    <div class="flex justify-between items-center text-[9px] text-slate-700">
                        <span class="font-bold tracking-[2px]">Privacy_Protocol:</span>
                        <span class="font-mono text-slate-400">RSA_4096</span>
                    </div>
                    <div
                        class="text-[8px] text-slate-800 text-center tracking-[6px] opacity-40 font-black">
                        Neural_Sync_Active
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

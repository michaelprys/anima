<script setup>
import { useOnlineStatus } from '@/composables/useOnlineStatus.js';
import { useGetLocation } from '@/composables/useGetLocation.js';
import { onMounted } from 'vue';

const { online } = useOnlineStatus();
const { coords, location, pending, getLocation } = useGetLocation();

const randPlaceholder = () => Math.random().toString(16).slice(2, 10).toUpperCase();

onMounted(async () => {
    await getLocation();
});
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

                        <div class="flex justify-between items-start">
                            <span class="text-slate-600 font-medium pt-0.5">Location:</span>

                            <div class="text-right min-h-15 flex flex-col">
                                <div
                                    v-if="pending"
                                    class="flex flex-col items-end space-y-1 opacity-80">
                                    <span
                                        class="text-cyan-400 text-[10px] font-black tracking-[2px] animate-[pulse_0.1s_infinite] uppercase">
                                        >> Scanning_Location_{{ Math.floor(Math.random() * 99) }}
                                    </span>

                                    <div class="flex flex-col items-end leading-none">
                                        <span
                                            class="text-[7px] text-cyan-900 font-mono break-all text-right w-32 truncate">
                                            0x{{ randPlaceholder() }} 0x{{ randPlaceholder() }}
                                        </span>

                                        <span
                                            class="text-[9px] text-emerald-500/50 font-mono italic">
                                            Targeting:
                                            <span class="inline-block min-w-11.25 text-right">
                                                {{ (Math.random() * 90).toFixed(4) }}°
                                            </span>
                                            /
                                            <span class="inline-block min-w-11.25 text-right">
                                                {{ (Math.random() * 180).toFixed(4) }}°
                                            </span>
                                        </span>
                                    </div>

                                    <div class="w-24 h-0.5 bg-slate-900 relative overflow-hidden">
                                        <div
                                            class="absolute inset-0 bg-cyan-500/50 animate-[shimmer_0.5s_infinite] shadow-[0_0_8px_#06b6d4]"></div>
                                    </div>

                                    <span
                                        class="text-[7px] text-slate-700 font-bold tracking-[3px]">
                                        RAW_DATA_STREAM_v.{{ Math.random().toFixed(2) }}
                                    </span>
                                </div>

                                <div
                                    v-else-if="location && location !== 'Not Detected'"
                                    class="flex flex-col items-end space-y-1">
                                    <span
                                        class="text-[7px] text-emerald-500/30 font-mono tracking-[4px] uppercase">
                                        [ Signal_Locked ]
                                    </span>
                                    <span
                                        class="text-slate-200 font-mono italic drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                        {{ location }}
                                    </span>
                                    <span
                                        v-if="coords"
                                        class="text-[0.5625rem] text-slate-500/60 font-mono uppercase">
                                        {{ coords.latitude?.toFixed(4) }}° N /
                                        {{ coords.longitude?.toFixed(4) }}° E
                                    </span>
                                </div>

                                <div v-else class="flex flex-col items-end space-y-1">
                                    <span
                                        class="text-[7px] text-rose-500/30 font-mono tracking-[4px] uppercase text-right">
                                        [ Signal_Timeout ]
                                    </span>
                                    <span
                                        class="text-rose-500/80 font-mono italic uppercase text-[10px] tracking-widest">
                                        Not detected
                                    </span>
                                    <span class="text-[7px] text-rose-900 font-mono uppercase">
                                        Error_Code: 0x404_NULL_POS
                                    </span>
                                </div>
                            </div>
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

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
        transform: skew(0deg);
    }
    50% {
        opacity: 0.8;
        transform: skew(1deg);
    }
}
</style>

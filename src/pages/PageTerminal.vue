<script setup>
import { useGetLocation } from '@/composables/useGetLocation';
import { useStoreFragments } from '@/stores/fragments.store';
import { computed, onMounted, ref } from 'vue';
import { useEsc } from '@/composables/useEsc';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const storeFragments = useStoreFragments();
const online = useOnline();
const { coords, location, pending, getLocation, watchPermissions } = useGetLocation();
const { dailyCognitiveLoad, totalFragmentsCharacters, fragments, isSyncing } =
    storeToRefs(storeFragments);

const sessionHash = ref('');
const randomizeNumbers = () => Math.random().toString(16).slice(2, 10).toUpperCase();

const cognitiveLoadPercent = computed(() => {
    const val = Number(dailyCognitiveLoad.value) || 0;
    const maxReference = 300;
    const percent = Math.round((val / maxReference) * 100);

    return Math.max(0, Math.min(percent, 100));
});

const barDisplay = computed(() => {
    const TOTAL_BARS = 30;
    const filled = Math.floor((cognitiveLoadPercent.value / 100) * TOTAL_BARS);

    return `[${'|'.repeat(filled)}${'.'.repeat(TOTAL_BARS - filled)}]`;
});

const barStatusClass = computed(() => {
    const val = cognitiveLoadPercent.value;
    if (val < 40) return 'text-cyan-light drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]';
    if (val < 80) return 'text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]';

    return 'text-rose-danger animate-pulse';
});

useEsc();

onMounted(async () => {
    sessionHash.value = randomizeNumbers();
    await storeFragments.loadFragments();
    getLocation();
    watchPermissions();
});
</script>

<template>
    <div
        class="bg-canvas/92 fixed inset-0 z-1000 flex cursor-crosshair items-center justify-center font-mono backdrop-blur-xl">
        <div
            class="border-blue-system/30 bg-base shadow-terminal-deep relative mx-6 w-full max-w-136 border p-10">
            <div
                class="border-blue-system/40 absolute top-0 left-0 h-2 w-2 border-t border-l"></div>
            <div
                class="border-blue-system/40 absolute top-0 right-0 h-2 w-2 border-t border-r"></div>
            <div
                class="border-blue-system/40 absolute bottom-0 left-0 h-2 w-2 border-b border-l"></div>
            <div
                class="border-blue-system/40 absolute right-0 bottom-0 h-2 w-2 border-r border-b"></div>

            <header class="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
                <div class="flex items-center">
                    <span class="animate-blink bg-cyan-glow shadow-glow-cyan mr-4 h-2 w-2"></span>
                    <span class="text-cyan-light text-sm font-bold tracking-[0.4em] uppercase">
                        Anima_v.01
                    </span>
                </div>
                <router-link
                    to="/"
                    class="group flex items-center text-[0.625rem] tracking-[0.2em] text-slate-500 uppercase transition-all">
                    <span class="group-hover:text-rose-danger/40">[</span>
                    <span
                        class="text-rose-danger group-hover:drop-shadow-rose-glow mx-2 font-medium transition-all">
                        Exit
                    </span>
                    <span class="group-hover:text-rose-danger/40">]</span>
                </router-link>
            </header>

            <div class="space-y-10 tracking-widest text-slate-300 uppercase">
                <section class="space-y-4">
                    <div class="flex items-end justify-between">
                        <p class="text-[0.625rem] font-bold tracking-[0.25rem] text-slate-500">
                            Memory
                        </p>
                        <span class="text-cyan-light/40 font-mono text-[9px] tracking-normal">
                            Hash: {{ sessionHash }}
                        </span>
                    </div>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="font-medium text-slate-700">Fragments:</span>
                            <span class="text-slate-200">{{ fragments.length }} Units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium text-slate-700">Data_Size:</span>
                            <span class="text-slate-200">{{ totalFragmentsCharacters }} KB</span>
                        </div>
                    </div>
                </section>

                <section class="space-y-4">
                    <p class="text-[0.625rem] font-bold tracking-[0.25rem] text-slate-500">Sync</p>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="font-medium text-slate-700">Link_Status:</span>
                            <span
                                class="font-bold italic"
                                :class="online ? 'text-emerald-sync' : 'text-rose-danger'">
                                {{ online ? 'Stable' : 'Lost' }}
                            </span>
                        </div>
                        <div class="flex items-start justify-between">
                            <span class="pt-0.5 font-medium text-slate-700">Location:</span>
                            <div class="flex min-h-15 flex-col text-right">
                                <div
                                    v-if="pending"
                                    class="flex flex-col items-end space-y-1 opacity-80">
                                    <span
                                        class="text-cyan-light animate-[pulse_0.1s_infinite] text-[0.625rem] font-black tracking-[0.125rem] uppercase">
                                        >> Scanning_Location
                                    </span>
                                </div>
                                <div
                                    v-else-if="location && location !== 'Not Detected'"
                                    class="flex flex-col items-end space-y-1">
                                    <span
                                        class="text-emerald-sync/30 text-[0.4375rem] tracking-[0.25rem] uppercase">
                                        [ Signal_Locked ]
                                    </span>
                                    <span
                                        class="text-slate-200 italic drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
                                        {{ location }}
                                    </span>
                                    <span
                                        v-if="coords.latitude"
                                        class="mt-1 font-mono text-[9px] tracking-tight text-slate-600">
                                        LAT: {{ coords.latitude.toFixed(4) }} / LON:
                                        {{ coords.longitude.toFixed(4) }}
                                    </span>
                                </div>
                                <div v-else class="text-rose-danger/80 text-[0.625rem] italic">
                                    Signal Timeout
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="pt-2">
                    <div class="space-y-3 text-xs">
                        <div class="flex items-center justify-between">
                            <span class="font-bold tracking-[0.1875rem] text-slate-500 uppercase">
                                Cognitive_Load
                            </span>
                            <span
                                v-if="isSyncing"
                                class="text-cyan-light animate-pulse text-[9px] font-black tracking-widest uppercase">
                                [ Syncing_Neural_Patterns... ]
                            </span>
                        </div>
                        <div
                            :class="barStatusClass"
                            class="mt-3 text-[11px] leading-none tracking-normal transition-colors duration-700">
                            {{ barDisplay }} {{ cognitiveLoadPercent }} %
                        </div>
                    </div>
                </section>

                <footer class="mt-14 flex flex-col space-y-3 border-t border-white/10 pt-8">
                    <div
                        class="flex items-center justify-between text-[0.5625rem] font-bold text-slate-800">
                        <span class="tracking-[0.125rem]">Privacy_Protocol:</span>
                        <span class="font-mono tracking-normal text-slate-400">AES_256_GCM</span>
                    </div>
                    <div
                        class="text-center text-[0.5rem] font-black tracking-[0.375rem] text-slate-900 uppercase opacity-20">
                        Neural_Sync_Active
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

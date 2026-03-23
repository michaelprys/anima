<script setup>
import { useEsc } from '@/composables/useEsc';
import { computed, onMounted } from 'vue';
import { useOnlineStatus } from '@/composables/useOnlineStatus';
import { useGetLocation } from '@/composables/useGetLocation';
import { useStoreFragments } from '@/stores/fragments.store';

const storeFragments = useStoreFragments(),
    { online } = useOnlineStatus(),
    { coords, location, pending, getLocation, watchPermissions } = useGetLocation();

const randomizeNumbers = () => Math.random().toString(16).slice(2, 10).toUpperCase();

const totalFragmentsCharacters = computed(() => {
    if (!storeFragments.fragments || storeFragments.fragments.length === 0) return '0.00';

    const totalCharacters = storeFragments.fragments.reduce((acc, fragment) => {
        return (
            acc +
            (fragment.id.length +
                fragment.title.length +
                fragment.thought.length +
                fragment.date.length)
        );
    }, 0);
    return (totalCharacters * 0.0009765625).toFixed(2);
});

useEsc();

onMounted(async () => {
    await getLocation();
    await watchPermissions();
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

            <header class="mb-12 flex items-center justify-between">
                <div class="flex items-center">
                    <span class="animate-blink bg-cyan-glow shadow-glow-cyan mr-4 h-2 w-2"></span>
                    <span class="text-cyan-light text-sm font-bold tracking-[0.4em] uppercase">
                        Anima_v.01
                    </span>
                </div>
                <router-link
                    to="/"
                    class="group hover:text-rose-danger flex cursor-default! items-center text-[0.625rem] tracking-[0.2em] text-slate-500 uppercase transition-all">
                    <span class="group-hover:text-rose-danger/40">[</span>
                    <span
                        class="text-rose-danger group-hover:drop-shadow-rose-glow mx-2 font-medium">
                        Exit
                    </span>
                    <span class="group-hover:text-rose-danger/40">]</span>
                </router-link>
            </header>

            <div class="space-y-10 tracking-widest text-slate-300 uppercase">
                <section class="space-y-4">
                    <p class="text-[0.625rem] font-bold tracking-[0.25rem] text-slate-500">Memory</p>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="font-medium text-slate-600">Fragments:</span>
                            <span class="text-slate-200">
                                {{ storeFragments.fragments.length }} Units
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium text-slate-600">Data_Size:</span>
                            <span class="text-slate-200">{{ totalFragmentsCharacters }} KB</span>
                        </div>
                    </div>
                </section>

                <section class="space-y-4">
                    <p class="text-[0.625rem] font-bold tracking-[0.25rem] text-slate-500">Sync</p>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="font-medium text-slate-600">Link_Status:</span>
                            <span
                                class="font-bold italic"
                                :class="online ? 'text-emerald-sync' : 'text-rose-danger'">
                                {{ online ? 'Stable' : 'Lost' }}
                            </span>
                        </div>

                        <div class="flex items-start justify-between">
                            <span class="pt-0.5 font-medium text-slate-600">Location:</span>
                            <div class="flex min-h-15 flex-col text-right">
                                <div
                                    v-if="pending"
                                    class="flex flex-col items-end space-y-1 opacity-80">
                                    <span
                                        class="text-cyan-light animate-[pulse_0.1s_infinite] text-[0.625rem] font-black tracking-[0.125rem] uppercase">
                                        >> Scanning_Location_{{ Math.floor(Math.random() * 99) }}
                                    </span>
                                    <div class="flex flex-col items-end leading-none">
                                        <span
                                            class="w-32 truncate text-right text-[0.4375rem] break-all text-cyan-900">
                                            0x{{ randomizeNumbers() }} 0x{{ randomizeNumbers() }}
                                        </span>
                                        <span class="text-emerald-sync/50 text-[0.5625rem] italic">
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
                                    <div class="bg-base-panel relative h-0.5 w-24 overflow-hidden">
                                        <div
                                            class="animate-shimmer bg-cyan-glow/50 shadow-glow-cyan absolute inset-0"></div>
                                    </div>
                                    <span
                                        class="text-[0.4375rem] font-bold tracking-[0.1875rem] text-slate-700">
                                        RAW_DATA_STREAM_v.{{ Math.random().toFixed(2) }}
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
                                        class="text-slate-200 italic drop-shadow-[0_0_0.3125rem_rgba(255,255,255,0.2)]">
                                        {{ location }}
                                    </span>
                                    <span
                                        v-if="coords"
                                        class="text-[0.5625rem] text-slate-500/60 uppercase">
                                        {{ coords.latitude?.toFixed(4) }}° N /
                                        {{ coords.longitude?.toFixed(4) }}° E
                                    </span>
                                </div>

                                <div v-else class="flex flex-col items-end space-y-1">
                                    <span
                                        class="text-rose-danger/30 text-right text-[0.4375rem] tracking-[0.25rem] uppercase">
                                        [ Signal_Timeout ]
                                    </span>
                                    <span
                                        class="text-rose-danger/80 text-[0.625rem] tracking-widest uppercase italic">
                                        Not Detected
                                    </span>
                                    <span class="text-[0.4375rem] text-rose-900 uppercase">
                                        Error_Code: 0x404_NULL_POS
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="pt-2">
                    <div class="space-y-3 text-[0.625rem]">
                        <span class="font-bold tracking-[0.1875rem] text-slate-500">Cognitive_Load</span>
                        <div
                            class="text-cyan-light text-[0.625rem] leading-none tracking-normal transition-colors duration-700">
                            [||||||||||....................] 20%
                        </div>
                    </div>
                </section>

                <footer class="mt-14 flex flex-col space-y-3 border-t border-white/10 pt-8">
                    <div class="flex items-center justify-between text-[0.5625rem] text-slate-700">
                        <span class="font-bold tracking-[0.125rem]">Privacy_Protocol:</span>
                        <span class="text-slate-400">AES_256_GCM</span>
                    </div>
                    <div
                        class="text-center text-[0.5rem] font-black tracking-[0.375rem] text-slate-800 opacity-40">
                        Neural_Sync_Active
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import { useStoreFragments } from '@/stores/fragments.store.js';
const storeFragments = useStoreFragments();
</script>

<template>
    <div
        v-if="storeFragments.activeModal === 'delete'"
        class="bg-canvas/90 fixed inset-0 z-1000 flex items-center justify-center p-4 backdrop-blur-sm">
        <div
            class="border-rose-danger/20 bg-base shadow-rose-danger/5 relative w-full max-w-sm border p-10 shadow-2xl">
            <div
                class="border-rose-danger/40 absolute top-0 left-0 h-2 w-2 border-t border-l"></div>
            <div
                class="border-rose-danger/40 absolute top-0 right-0 h-2 w-2 border-t border-r"></div>
            <div
                class="border-rose-danger/40 absolute bottom-0 left-0 h-2 w-2 border-b border-l"></div>
            <div
                class="border-rose-danger/40 absolute right-0 bottom-0 h-2 w-2 border-r border-b"></div>

            <header class="mb-8 flex items-center">
                <span class="animate-blink bg-rose-danger shadow-glow-rose mr-3 h-2 w-2"></span>
                <span
                    class="text-rose-danger/80 text-[0.625rem] font-bold tracking-[0.4em] uppercase">
                    System_Warning
                </span>
            </header>

            <div class="mb-10 text-center">
                <p class="mb-2 text-[0.6875rem] tracking-[0.2em] text-slate-500 uppercase italic">
                    DANGER_ZONE:
                </p>
                <p
                    class="text-sm leading-relaxed font-light tracking-[0.15em] text-slate-100 uppercase">
                    Erase this fragment?
                </p>
            </div>

            <div class="flex justify-center gap-12">
                <button
                    @click="storeFragments.closeModal"
                    class="cursor-default! text-[0.625rem] tracking-[0.3em] text-slate-500 uppercase transition-all hover:text-white">
                    [ Cancel ]
                </button>
                <button
                    @click="storeFragments.deleteFragment(storeFragments.selectedFragmentId)"
                    class="text-rose-danger hover:text-rose-danger/80 cursor-default! text-[0.625rem] font-black tracking-[0.3em] uppercase transition-all">
                    [ Terminate ]
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStoreFragments } from '@/stores/fragments.store.js';
import { useDebounceFn } from '@vueuse/core';
import { ref, watch } from 'vue';

const storeFragments = useStoreFragments();
const isFilterActive = ref(false);

const searchFragments = useDebounceFn(async () => {
    await storeFragments.loadFragments({
        skip: 0,
        limit: 9,
    });
}, 500);

watch(isFilterActive, (val) => {
    if (!val && storeFragments.searchText !== '') {
        storeFragments.searchText = '';
        searchFragments();
    }
});
</script>

<template>
    <div class="w-full">
        <div class="mb-2 flex items-center justify-between border-b border-white/5 px-1 pb-4">
            <button
                @click="isFilterActive = !isFilterActive"
                class="group/search border-cyan-glow/20 bg-cyan-glow/5 hover:border-cyan-glow/60 hover:bg-cyan-glow/10 relative flex items-center gap-3 overflow-hidden border px-4 py-2 transition-all duration-300 active:scale-95">
                <div
                    class="bg-cyan-glow/5 absolute inset-0 opacity-0 transition-opacity group-hover/search:opacity-100"></div>
                <div class="scanline absolute inset-0 opacity-[0.1]"></div>

                <span
                    class="group-hover/search:animate-glitch-cyan relative z-10 text-[0.625rem] font-black tracking-[0.3em] uppercase transition-all duration-300"
                    :class="
                        isFilterActive
                            ? 'text-cyan-glow drop-shadow-[0_0_8px_#22d3ee]'
                            : 'group-hover/search:text-cyan-light text-slate-400'
                    ">
                    {{ isFilterActive ? 'Close_Search' : 'Open_Search' }}
                </span>

                <span
                    class="relative h-1.5 w-1.5 rounded-full transition-all duration-500"
                    :class="
                        isFilterActive
                            ? 'bg-cyan-glow scale-125 animate-pulse shadow-[0_0_10px_#22d3ee]'
                            : 'group-hover/search:bg-cyan-glow/60 bg-slate-700'
                    "></span>

                <div
                    class="border-cyan-glow absolute -top-px -left-px h-1 w-1 border-t border-l opacity-0 transition-opacity group-hover/search:opacity-100"></div>
                <div
                    class="border-cyan-glow absolute -right-px -bottom-px h-1 w-1 border-r border-b opacity-0 transition-opacity group-hover/search:opacity-100"></div>
            </button>

            <div class="font-mono text-[0.5625rem] tracking-[0.2em] text-slate-700 uppercase">
                Total: [
                <span class="text-slate-400">{{ storeFragments.fragments.length }}</span>
                ]
            </div>
        </div>

        <Transition name="expand">
            <div v-if="isFilterActive" class="overflow-hidden">
                <div class="relative flex items-center py-2">
                    <input
                        v-model="storeFragments.searchText"
                        type="text"
                        autofocus
                        @input="searchFragments"
                        placeholder="INPUT_SEARCH_PARAMETERS..."
                        class="text-cyan-glow w-full bg-transparent py-3 text-xs tracking-[0.2em] uppercase outline-none placeholder:text-slate-800" />
                    <div
                        class="bg-cyan-glow absolute right-0 bottom-6 h-1 w-1 shadow-[0_0_8px_#22d3ee]"></div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
@keyframes glitch-cyan {
    0% {
        text-shadow:
            2px 0 #22d3ee,
            -2px 0 #0891b2;
        transform: translate(0, 0);
    }
    25% {
        transform: translate(-1px, 0.5px);
    }
    50% {
        text-shadow:
            -2px 0 #22d3ee,
            2px 0 #0891b2;
        transform: translate(1px, -0.5px);
    }
    75% {
        transform: translate(-0.5px, 0.5px);
    }
    100% {
        transform: translate(0, 0);
    }
}

.animate-glitch-cyan {
    animation: glitch-cyan 0.2s steps(2) infinite;
}

.scanline {
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(34, 211, 238, 0.1) 50%,
        transparent 100%
    );
    background-size: 100% 4px;
    animation: scan-vertical 10s linear infinite;
}

@keyframes scan-vertical {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 0 100%;
    }
}

.expand-enter-active,
.expand-leave-active {
    transition:
        max-height 0.4s cubic-bezier(0.2, 0, 0, 1),
        opacity 0.2s ease,
        transform 0.4s cubic-bezier(0.2, 0, 0, 1);
    max-height: 5rem;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-0.25rem);
}
</style>

<script setup>
import { ref } from 'vue';
import { useStoreFragments } from '@/stores/fragments.store.js';

const storeFragments = useStoreFragments();
const isFilterActive = ref(false);
</script>

<template>
    <div class="w-full">
        <div class="mb-2 flex items-center justify-between border-b border-white/5 px-1 pb-4">
            <button
                @click="isFilterActive = !isFilterActive"
                class="group flex items-center gap-3 transition-all">
                <span
                    class="group-hover:text-cyan-glow text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase transition-colors">
                    {{ isFilterActive ? 'Close_Search' : 'Open_Search' }}
                </span>
                <span
                    class="h-1 w-1 rounded-full transition-colors"
                    :class="
                        isFilterActive ? 'bg-cyan-glow animate-pulse' : 'bg-surface-card'
                    "></span>
            </button>

            <div class="font-mono text-[9px] tracking-[0.2em] text-slate-700 uppercase">
                Total: [ {{ storeFragments.fragments.length }} ]
            </div>
        </div>

        <Transition name="expand">
            <div v-if="isFilterActive" class="overflow-hidden">
                <div class="relative flex items-center py-2">
                    <input
                        type="text"
                        autofocus
                        placeholder="INPUT_SEARCH_PARAMETERS..."
                        class="text-cyan-glow w-full bg-transparent py-3 text-xs tracking-[0.2em] uppercase outline-none placeholder:text-slate-800" />
                    <div class="bg-cyan-glow absolute right-0 bottom-6 h-1 w-1"></div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition:
        max-height 0.4s cubic-bezier(0.2, 0, 0, 1),
        opacity 0.2s ease,
        transform 0.4s cubic-bezier(0.2, 0, 0, 1);
    max-height: 80px;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-4px);
}
</style>

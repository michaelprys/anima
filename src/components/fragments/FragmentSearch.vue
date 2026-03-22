<script setup>
import { ref } from 'vue';
import { useStoreFragments } from '@/stores/fragments.store.js';

const storeFragments = useStoreFragments();
const isFilterActive = ref(false);
</script>

<template>
    <div class="w-full">
        <div class="flex items-center justify-between px-1 border-b border-white/5 pb-4 mb-2">
            <button
                @click="isFilterActive = !isFilterActive"
                class="flex items-center gap-3 group transition-all">
                <span
                    class="text-[10px] font-black text-slate-500 group-hover:text-cyan-500 uppercase tracking-[0.3em] transition-colors">
                    {{ isFilterActive ? 'Close_Search' : 'Open_Search' }}
                </span>
                <span
                    class="w-1 h-1 rounded-full transition-colors"
                    :class="isFilterActive ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'"></span>
            </button>

            <div class="text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">
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
                        class="w-full bg-transparent py-3 text-xs uppercase tracking-[0.2em] text-cyan-400 outline-none placeholder:text-slate-800" />
                    <div class="absolute right-0 bottom-6 w-1 h-1 bg-cyan-500"></div>
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

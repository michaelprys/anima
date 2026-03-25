<script setup>
import { useStoreFragments } from '@/stores/fragments.store.js';

const storeFragments = useStoreFragments();

defineProps({
    fragment: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <li
        class="group bg-surface-card/30 hover:border-cyan-glow/30 hover:bg-surface-card/50 relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/10 p-8 transition-all duration-700">
        <div>
            <div class="mb-6 flex items-center justify-between">
                <div
                    class="bg-cyan-glow/40 h-px w-8 transition-all duration-700 group-hover:w-12"></div>
                <button
                    class="hover:text-rose-danger/70 -mr-1 cursor-default! p-1 text-slate-600 transition-colors"
                    @click="storeFragments.openModal(fragment.id, 'delete')">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <h3
                class="group-hover:text-cyan-light mb-4 line-clamp-1 text-sm font-bold tracking-widest break-all text-slate-100 uppercase transition-colors">
                {{ fragment.title.toUpperCase() }}
            </h3>

            <p
                class="line-clamp-2 text-sm leading-relaxed break-all text-slate-400 transition-all duration-700 group-hover:text-slate-200">
                {{ fragment.thought.toUpperCase() }}
            </p>
        </div>

        <div class="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <span class="text-[0.625rem] font-medium tracking-[0.2em] text-slate-500 uppercase">
                {{ fragment.date.toUpperCase() }}
            </span>

            <RouterLink
                :to="{ name: 'fragment', params: { id: fragment.id } }"
                class="text-[0.5625rem] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors hover:text-white">
                Open
            </RouterLink>
        </div>
    </li>
</template>

<script setup>
import { useStoreFragments } from '@/stores/fragments.store.js';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute(),
    router = useRouter(),
    storeFragments = useStoreFragments();

const fragment = ref({});
const attempted = ref(true);

const handleUpdate = () => {
    if (!fragment.value.title || !fragment.value.thought) {
        attempted.value = false;
        return;
    }

    const payload = {
        title: fragment.value.title,
        thought: fragment.value.thought,
    };

    storeFragments.updateFragment(fragment.value.id, payload);
    router.push({ name: 'fragments' });
};

onMounted(() => {
    const foundFragment = storeFragments.getFragmentById(route.params.id);
    if (foundFragment) {
        fragment.value = { ...foundFragment };
    } else {
        router.push({ name: 'fragments' });
    }
});
</script>

<template>
    <div
        v-if="fragment.id"
        class="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md">
        <div class="absolute inset-0 bg-slate-950/88" @click="router.back"></div>

        <form
            @submit.prevent="handleUpdate"
            @keyup.ctrl.enter="handleUpdate"
            class="relative w-full max-w-2xl bg-[#030712] border border-blue-500/30 p-12 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
            <div class="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/50"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/50"></div>
            <div
                class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/50"></div>
            <div
                class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/50"></div>

            <header class="flex items-center justify-between mb-14">
                <div class="flex items-center gap-5">
                    <div class="relative flex items-center justify-center w-4 h-4">
                        <div
                            :class="[
                                'absolute inset-0 rounded-full blur-md transition-colors duration-500',
                                attempted || (fragment.title && fragment.thought)
                                    ? 'bg-cyan-500/25 animate-pulse'
                                    : 'bg-rose-500/45 animate-[pulse_0.8s_infinite]',
                            ]"></div>
                        <div
                            :class="[
                                'absolute inset-0 border rounded-full animate-ping-slow transition-colors duration-500',
                                attempted || (fragment.title && fragment.thought)
                                    ? 'border-cyan-500/35'
                                    : 'border-rose-500/55',
                            ]"></div>
                        <div
                            :class="[
                                'relative w-1.5 h-1.5 rounded-full transition-all duration-500',
                                attempted || (fragment.title && fragment.thought)
                                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                                    : 'bg-rose-500 shadow-[0_0_12px_#f43f5e] scale-110',
                            ]"></div>
                    </div>
                    <span class="text-cyan-500/75 text-[10px] tracking-[0.5em] uppercase font-bold">
                        Anima_Inspect // Core
                    </span>
                </div>
                <span class="text-[8px] text-slate-600 tracking-[0.3em] uppercase italic">
                    System_link: Stable
                </span>
            </header>

            <div class="space-y-12">
                <div class="group">
                    <input
                        v-model="fragment.title"
                        maxlength="40"
                        spellcheck="false"
                        :placeholder="attempted || fragment.title ? 'TITLE' : 'REQUIRED _'"
                        @input="attempted = true"
                        :class="[
                            'w-full bg-transparent text-lg font-bold uppercase tracking-[0.2em] outline-none border-b border-white/10 pb-3 transition-all',
                            attempted || fragment.title
                                ? 'text-cyan-400 placeholder:text-slate-800 focus:border-cyan-500/40'
                                : 'text-rose-500 placeholder-rose-900 border-rose-500/40 animate-[pulse_1.5s_infinite]',
                        ]" />
                </div>

                <div class="group">
                    <textarea
                        v-model="fragment.thought"
                        maxlength="1000"
                        rows="8"
                        spellcheck="false"
                        :placeholder="
                            attempted || fragment.thought ? 'I\'M LISTENING' : 'REQUIRED _'
                        "
                        @input="attempted = true"
                        :class="[
                            'w-full bg-transparent text-sm font-bold uppercase tracking-[0.2em] outline-none border-b border-white/10 pb-3 transition-all resize-none',
                            attempted || fragment.thought
                                ? 'text-slate-300 focus:text-slate-100 placeholder:text-slate-800 focus:border-cyan-500/40'
                                : 'text-rose-500 placeholder-rose-900 border-rose-500/40 animate-[pulse_1.5s_infinite]',
                        ]"></textarea>
                </div>
            </div>

            <div class="flex justify-end items-center gap-10 mt-6 pt-8">
                <button
                    @click="router.back"
                    type="button"
                    class="text-[10px] tracking-[0.4em] text-slate-500 hover:text-rose-500 transition-colors">
                    ABORT
                </button>

                <button
                    type="submit"
                    class="group flex items-center text-[11px] font-black tracking-[0.4em] text-cyan-400 uppercase transition-all">
                    <span
                        class="opacity-0 group-hover:opacity-100 transition-all text-cyan-500 mr-2 -translate-x-1 group-hover:translate-x-0">
                        [
                    </span>
                    <span class="group-hover:drop-shadow-[0_0_8px_#22d3ee]">Update</span>
                    <span
                        class="opacity-0 group-hover:opacity-100 transition-all text-cyan-500 ml-2 translate-x-1 group-hover:translate-x-0">
                        ]
                    </span>
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.animate-ping-slow {
    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping-slow {
    75%,
    100% {
        transform: scale(2.5);
        opacity: 0;
    }
}
</style>

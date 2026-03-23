<script setup>
import { useEsc } from '@/composables/useEsc';
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

useEsc();

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
        <div class="absolute inset-0 bg-slate-950/88"></div>

        <form
            @submit.prevent="handleUpdate"
            @keydown.ctrl.enter="handleUpdate"
            class="relative w-full max-w-2xl border border-blue-500/30 p-12 shadow-[0_0_3.75rem_rgba(0,0,0,0.7)]">
            <div class="absolute top-0 left-0 h-3 w-3 border-t border-l border-blue-500/50"></div>
            <div class="absolute top-0 right-0 h-3 w-3 border-t border-r border-blue-500/50"></div>
            <div
                class="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-blue-500/50"></div>
            <div
                class="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-blue-500/50"></div>

            <header class="mb-14 flex items-center justify-between">
                <div class="flex items-center gap-5">
                    <div class="relative flex h-4 w-4 items-center justify-center">
                        <div
                            :class="[
                                'absolute inset-0 rounded-full blur-md transition-colors duration-500',
                                attempted || (fragment.title && fragment.thought)
                                    ? 'animate-pulse bg-cyan-500/25'
                                    : 'animate-[pulse_0.8s_infinite] bg-rose-500/45',
                            ]"></div>
                        <div
                            :class="[
                                'absolute inset-0 rounded-full border transition-colors duration-500',
                                attempted || (fragment.title && fragment.thought)
                                    ? 'animate-[ping_4s_infinite] border-cyan-500/35'
                                    : 'animate-[ping_1s_infinite] border-rose-500/55',
                            ]"></div>
                        <div
                            :class="[
                                'relative h-1.5 w-1.5 rounded-full transition-all duration-500',
                                attempted || (fragment.title && fragment.thought)
                                    ? 'bg-cyan-400 shadow-[0_0_0.5rem_#22d3ee]'
                                    : 'scale-110 bg-rose-500 shadow-[0_0_0.75rem_#f43f5e]',
                            ]"></div>
                    </div>
                    <span
                        class="text-[0.625rem] font-bold tracking-[0.5em] text-cyan-500/75 uppercase">
                        Anima_Inspect // Core
                    </span>
                </div>
                <span class="text-[0.5rem] tracking-[0.3em] text-slate-600 uppercase italic">
                    System_link: Stable
                </span>
            </header>

            <div class="space-y-12">
                <div class="group">
                    <input
                        v-model="fragment.title"
                        maxlength="40"
                        spellcheck="false"
                        :placeholder="attempted || fragment.title ? 'TITLE' : 'REQUIRED_TITLE _'"
                        @input="attempted = true"
                        :class="[
                            'w-full border-b border-white/10 bg-transparent pb-3 text-lg font-bold tracking-[0.2em] uppercase transition-all outline-none',
                            attempted || fragment.title
                                ? 'text-cyan-400 placeholder:text-slate-800 focus:border-cyan-500/40'
                                : 'animate-[pulse_1.5s_infinite] border-rose-500/40 text-rose-500 placeholder-rose-900',
                        ]" />
                </div>

                <div class="group">
                    <textarea
                        v-model="fragment.thought"
                        maxlength="1000"
                        rows="8"
                        spellcheck="false"
                        :placeholder="
                            attempted || fragment.thought ? 'INPUT_AWAITED' : 'REQUIRED_CONTENT _'
                        "
                        @input="attempted = true"
                        :class="[
                            'w-full resize-none border-b border-white/10 bg-transparent pb-3 text-sm font-bold tracking-[0.2em] uppercase transition-all outline-none',
                            attempted || fragment.thought
                                ? 'text-slate-300 placeholder:text-slate-800 focus:border-cyan-500/40 focus:text-slate-100'
                                : 'animate-[pulse_1.5s_infinite] border-rose-500/40 text-rose-500 placeholder-rose-900',
                        ]"></textarea>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-10 pt-8">
                <button
                    @click="router.back"
                    type="button"
                    class="cursor-default! text-[0.625rem] tracking-[0.4em] text-slate-500 transition-colors hover:text-rose-500">
                    ABORT
                </button>

                <button
                    type="submit"
                    class="group text-cyan-glow flex items-center text-[0.6875rem] font-black tracking-[0.4em] uppercase transition-all">
                    <span
                        class="text-cyan-glow mr-2 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        [
                    </span>
                    <span class="group-hover:drop-shadow-cyan-glow cursor-default!">Update</span>
                    <span
                        class="text-cyan-glow ml-2 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        ]
                    </span>
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>

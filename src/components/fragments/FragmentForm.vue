<script setup>
import { useStoreFragments } from '@/stores/fragments.store';
import { useToast } from '@/composables/useToast.js';
import { useTemplateRef, reactive, ref } from 'vue';

const storeFragments = useStoreFragments();
const { showToast } = useToast();

const newFragment = reactive({
    title: '',
    thought: '',
});

const attempted = ref(true);
const thoughtRef = useTemplateRef('thoughtRef');

const handleAddFragment = () => {
    if (!newFragment.title || !newFragment.thought) {
        attempted.value = false;

        return;
    }

    try {
        storeFragments.addFragment({ ...newFragment });
        // storeFragments.recognizeSentiment(`${newFragment.title}. ${newFragment.thought}`);

        Object.assign(newFragment, {
            title: '',
            thought: '',
        });

        thoughtRef.value.focus();
    } catch (error) {
        showToast(error || 'ERROR_CREATING_FRAGMENT_');
    }
};
</script>

<template>
    <div class="mx-auto mb-24 max-w-4xl">
        <div class="group relative">
            <div
                class="from-cyan-glow/15 to-blue-system/15 absolute -inset-1 bg-linear-to-r opacity-0 blur-2xl transition-opacity duration-1000 group-focus-within:opacity-100"></div>

            <form
                @submit.prevent="handleAddFragment"
                @keydown.ctrl.enter="handleAddFragment"
                @focusout="attempted = true"
                class="focus-within:border-cyan-glow/30 bg-base-panel/40 relative rounded-sm border border-white/10 p-6 backdrop-blur-3xl transition-all duration-500 md:p-8">
                <input
                    v-model="newFragment.title"
                    maxLength="40"
                    type="text"
                    :placeholder="attempted || newFragment.title ? '> TITLE' : 'REQUIRED_TITLE _'"
                    @input="attempted = true"
                    :class="[
                        'mb-2 w-full border-none bg-transparent font-mono text-lg font-black tracking-[0.5em] uppercase transition-all duration-500 focus:ring-0 focus:outline-none',
                        attempted || newFragment.title
                            ? 'text-cyan-glow placeholder-cyan-glow/20'
                            : 'text-rose-danger placeholder-rose-danger/40 animate-[pulse_1.5s_infinite]',
                    ]" />

                <div class="mb-6 h-px w-12 bg-white/5"></div>

                <textarea
                    v-model="newFragment.thought"
                    maxLength="1000"
                    ref="thoughtRef"
                    :placeholder="
                        attempted || newFragment.thought ? 'I_AM_LISTENING...' : 'REQUIRED_INPUT _'
                    "
                    rows="5"
                    @input="attempted = true"
                    :class="[
                        'mb-6 w-full resize-none border-none bg-transparent font-mono text-sm leading-relaxed tracking-[0.3em] uppercase transition-colors focus:ring-0 focus:outline-none',
                        attempted || newFragment.thought
                            ? 'text-slate-300 placeholder-slate-600'
                            : 'text-rose-danger placeholder-rose-danger/40 animate-[pulse_1.5s_infinite]',
                    ]"></textarea>

                <div
                    class="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                    <div class="flex flex-wrap gap-x-4 gap-y-2">
                        <span
                            class="text-[0.5625rem] font-bold tracking-[0.3em] whitespace-nowrap text-slate-400 uppercase">
                            Encrypted
                        </span>
                        <span
                            class="text-cyan-glow/60 animate-pulse text-[0.5625rem] font-bold tracking-[0.3em] whitespace-nowrap uppercase">
                            Buffer active
                        </span>
                    </div>

                    <button
                        type="submit"
                        class="border-cyan-glow/40 text-cyan-glow shadow-cyan-glow/5 hover:border-cyan-glow hover:bg-cyan-glow w-full cursor-default! rounded-xs border px-8 py-2 text-[0.625rem] font-black tracking-[0.3em] uppercase shadow-lg transition-all duration-500 hover:text-base active:scale-95 sm:w-auto">
                        Commit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

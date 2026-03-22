<script setup>
import { useTemplateRef, reactive, ref } from 'vue';
import { useStoreFragments } from '@/stores/fragments.store';

const storeFragments = useStoreFragments();

const newNote = reactive({
    title: '',
    thought: '',
});

const attempted = ref(true);
const thoughtRef = useTemplateRef('thoughtRef');

const handleAddNote = () => {
    if (!newNote.title || !newNote.thought) {
        attempted.value = false;

        return;
    }

    storeFragments.addFragment({ ...newNote });
    storeFragments.recognizeSentiment(`${newNote.title}. ${newNote.thought}`);

    Object.assign(newNote, {
        title: '',
        thought: '',
    });

    thoughtRef.value.focus();
};
</script>

<template>
    <div class="max-w-4xl mx-auto mb-24">
        <div class="relative group">
            <div
                class="absolute -inset-1 bg-linear-to-r from-cyan-500/15 to-blue-500/15 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000"></div>

            <form
                @submit.prevent="handleAddNote"
                @keyup.ctrl.enter="handleAddNote"
                class="relative bg-slate-900/40 backdrop-blur-3xl rounded-sm p-6 md:p-8 transition-all duration-500 border border-white/10 focus-within:border-cyan-500/30">
                <input
                    v-model="newNote.title"
                    maxLength="40"
                    type="text"
                    :placeholder="attempted || newNote.title ? '> TITLE' : 'REQUIRED _'"
                    @input="attempted = true"
                    :class="[
                        'w-full bg-transparent border-none font-mono text-lg font-black tracking-[0.5em] focus:outline-none focus:ring-0 mb-2 uppercase transition-all duration-500',
                        attempted || newNote.title
                            ? 'text-cyan-400 placeholder-cyan-900/50'
                            : 'text-rose-500 placeholder-rose-800 animate-[pulse_1.5s_infinite]',
                    ]" />

                <div class="h-px w-12 bg-white/5 mb-6"></div>

                <textarea
                    v-model="newNote.thought"
                    maxLength="1000"
                    ref="thoughtRef"
                    :placeholder="attempted || newNote.thought ? 'JUST TALK...' : 'REQUIRED _'"
                    rows="5"
                    @input="attempted = true"
                    :class="[
                        'w-full bg-transparent border-none font-mono text-sm tracking-[0.3em] focus:outline-none focus:ring-0 mb-6 uppercase transition-colors resize-none leading-relaxed',
                        attempted || newNote.thought
                            ? 'text-slate-300 placeholder-slate-600'
                            : 'text-rose-500 placeholder-rose-800  animate-[pulse_1.5s_infinite]',
                    ]"></textarea>

                <div
                    class="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pt-6 border-t border-white/10">
                    <div class="flex flex-wrap gap-x-4 gap-y-2">
                        <span
                            class="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
                            Encrypted
                        </span>
                        <span
                            class="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-400/60 animate-pulse whitespace-nowrap">
                            Buffer active
                        </span>
                    </div>

                    <button
                        type="submit"
                        class="w-full sm:w-auto px-8 py-2 text-[10px] font-black uppercase tracking-[0.3em] border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-500 rounded-xs active:scale-95 shadow-lg shadow-cyan-500/5">
                        Commit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

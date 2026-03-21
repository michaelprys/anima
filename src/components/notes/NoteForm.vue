<script setup>
import { useTemplateRef, reactive } from 'vue';
import { useStoreNotes } from '@/stores/notes.store.js';

const storeNotes = useStoreNotes();

const newNote = reactive({
    title: '',
    thought: '',
});

const thoughtRef = useTemplateRef('thoughtRef');

const handleAddNote = () => {
    if (!newNote.title && !newNote.thought) return;

    storeNotes.addNote(newNote);

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
                class="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000"></div>

            <div
                class="relative bg-slate-900/40 backdrop-blur-3xl rounded-sm p-6 md:p-8 transition-all duration-500 border border-white/10 focus-within:border-cyan-500/30">
                <input
                    v-model="newNote.title"
                    maxLength="40"
                    type="text"
                    placeholder="Title"
                    class="w-full bg-transparent border-none text-2xl font-light tracking-tight text-white placeholder-slate-500 focus:outline-none focus:ring-0 mb-4" />

                <textarea
                    v-model="newNote.thought"
                    maxLength="1000"
                    ref="thoughtRef"
                    placeholder="Vent your thoughts here..."
                    rows="5"
                    class="w-full bg-transparent border-none text-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-0 resize-none leading-relaxed mb-6"></textarea>
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
                        @click="handleAddNote"
                        :disabled="!newNote.title && !newNote.thought"
                        class="w-full sm:w-auto px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-500 rounded-[2px] active:scale-95 shadow-lg shadow-cyan-500/5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cyan-400 disabled:hover:border-cyan-500/40 disabled:active:scale-100">
                        Commit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

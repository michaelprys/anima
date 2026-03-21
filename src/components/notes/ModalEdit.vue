<script setup>
import { useStoreNotes } from '@/stores/notes.store.js';
import { useTemplateRef, watch, nextTick } from 'vue';

const storeNotes = useStoreNotes();
const editThoughtRef = useTemplateRef('editThoughtRef');

watch(
    () => storeNotes.activeModal,
    async (type) => {
        if (type === 'edit') {
            await nextTick();
            editThoughtRef.value?.focus();
        }
    },
);
</script>

<template>
    <Transition name="modal" mode="out-in">
        <div
            v-if="storeNotes.activeModal === 'edit'"
            class="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
                class="absolute inset-0 bg-slate-950/90 transition-opacity"
                @click="storeNotes.closeModal"></div>

            <div
                class="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[4px] p-12 shadow-2xl">
                <div class="h-[1px] w-12 bg-cyan-500/40 mb-10"></div>

                <div class="space-y-8">
                    <div class="group">
                        <label
                            class="block text-[10px] tracking-[0.3em] text-slate-500 uppercase mb-3 transition-colors group-focus-within:text-cyan-500/60">
                            Title
                        </label>
                        <input
                            v-model="storeNotes.selectedNote.title"
                            maxlength="40"
                            class="w-full bg-transparent text-slate-100 text-sm font-bold uppercase tracking-[0.2em] outline-none border-b border-white/5 pb-3 focus:border-cyan-500/30 transition-all" />
                    </div>

                    <div class="group">
                        <label
                            class="block text-[10px] tracking-[0.3em] text-slate-500 uppercase mb-3 transition-colors group-focus-within:text-cyan-500/60">
                            Thought
                        </label>
                        <textarea
                            v-model="storeNotes.selectedNote.thought"
                            maxlength="1000"
                            rows="6"
                            ref="editThoughtRef"
                            class="w-full bg-transparent text-slate-400 text-sm leading-relaxed outline-none resize-none focus:text-slate-200 transition-colors"></textarea>
                    </div>
                </div>

                <div
                    class="flex justify-end items-center gap-10 mt-16 pt-8 border-t border-white/5">
                    <button
                        class="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase hover:text-slate-300 transition-colors"
                        @click="storeNotes.closeModal">
                        Discard
                    </button>
                    <button
                        @click="storeNotes.updateNote"
                        class="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase hover:text-cyan-300 transition-all">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition:
        opacity 0.5s ease,
        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
}
</style>

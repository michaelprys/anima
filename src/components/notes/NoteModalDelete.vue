<script setup>
import { useStoreNotes } from '@/stores/notes.store.js';
const storeNotes = useStoreNotes();
</script>

<template>
    <Transition name="modal">
        <div
            v-if="storeNotes.activeModal === 'delete'"
            class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-950/60" @click="storeNotes.closeModal"></div>

            <div
                class="relative modal-content bg-[#0f172a] border border-white/5 rounded-md p-8 shadow-2xl min-w-64">
                <div class="flex flex-col items-center">
                    <div
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-slate-500 font-serif italic text-lg mb-5">
                        !
                    </div>

                    <div
                        class="text-slate-300 text-[0.85rem] font-light tracking-wider text-center mb-8">
                        Release this thought?
                    </div>

                    <div class="flex items-center gap-8">
                        <button
                            @click="storeNotes.closeModal"
                            class="text-[0.65rem] tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors uppercase outline-none">
                            Keep
                        </button>

                        <button
                            @click="storeNotes.deleteNote(storeNotes.selectedNote.id)"
                            class="text-[0.65rem] tracking-[0.2em] text-red-400/60 hover:text-red-400 transition-colors uppercase font-medium outline-none">
                            Release
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-active .backdrop-overlay,
.modal-leave-active .backdrop-overlay {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .backdrop-overlay,
.modal-leave-to .backdrop-overlay {
    backdrop-filter: blur(0);
}

.modal-enter-from .modal-content {
    transform: scale(0.9) translateY(15px);
    filter: blur(10px);
}

.modal-leave-to .modal-content {
    transform: scale(0.96) translateY(5px);
    filter: blur(4px);
}

button:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
}
</style>

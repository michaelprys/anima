<script setup>
import { useStoreNotes } from '@/stores/notes.store.js';
const storeNotes = useStoreNotes();
</script>

<template>
    <div
        v-if="storeNotes.activeModal === 'delete'"
        class="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-1000 p-4 backdrop-blur-sm">
        <div
            class="relative bg-[#030712] border border-rose-500/20 p-10 max-w-sm w-full shadow-2xl shadow-rose-500/5">
            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-rose-500/40"></div>
            <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-rose-500/40"></div>
            <div
                class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-rose-500/40"></div>
            <div
                class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-rose-500/40"></div>

            <header class="flex items-center mb-8">
                <span
                    class="w-2 h-2 bg-rose-600 mr-3 shadow-[0_0_10px_#e11d48] animate-blink"></span>
                <span class="text-rose-500/80 text-[10px] tracking-[0.4em] uppercase font-bold">
                    System_Warning
                </span>
            </header>

            <div class="text-center mb-10">
                <p class="text-slate-500 text-[11px] tracking-[0.2em] uppercase mb-2 italic">
                    DANGER_ZONE:
                </p>
                <p
                    class="text-slate-100 text-sm tracking-[0.15em] uppercase font-light leading-relaxed">
                    Erase this memory?
                </p>
            </div>

            <div class="flex justify-center gap-12">
                <button
                    @click="storeNotes.closeModal"
                    class="text-[10px] tracking-[0.3em] text-slate-500 hover:text-white transition-all uppercase">
                    [ Cancel ]
                </button>
                <button
                    @click="storeNotes.deleteNote(storeNotes.selectedNoteId)"
                    class="text-[10px] tracking-[0.3em] text-rose-500 hover:text-rose-400 transition-all uppercase font-black">
                    [ Terminate ]
                </button>
            </div>
        </div>
    </div>
</template>

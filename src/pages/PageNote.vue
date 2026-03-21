<script setup>
import { useStoreNotes } from '@/stores/notes.store.js';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute(),
    router = useRouter(),
    storeNotes = useStoreNotes();

const note = ref({});

const handleUpdate = () => {
    const payload = {
        title: note.value.title,
        thought: note.value.thought,
    };

    storeNotes.updateNote(note.value.id, payload);
    router.push({ name: 'notes' });
};

onMounted(() => {
    const foundNote = storeNotes.getNoteById(route.params.id);
    if (foundNote) {
        note.value = { ...foundNote };
    } else {
        router.push({ name: 'notes' });
    }
});
</script>

<template>
    <div
        v-if="note.id"
        class="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md">
        <div class="absolute inset-0 bg-slate-950/90" @click="router.back"></div>

        <div
            class="relative w-full max-w-2xl bg-[#030712] border border-blue-500/20 p-12 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
            <div class="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/40"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/40"></div>
            <div
                class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/40"></div>
            <div
                class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/40"></div>

            <header class="flex items-center justify-between mb-14">
                <div class="flex items-center gap-5">
                    <div class="relative flex items-center justify-center w-4 h-4">
                        <div
                            class="absolute inset-0 bg-cyan-500/10 rounded-full blur-md animate-pulse"></div>
                        <div
                            class="absolute inset-0 border border-cyan-500/20 rounded-full animate-ping-slow"></div>
                        <div
                            class="relative w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>
                    </div>
                    <span class="text-cyan-500/60 text-[10px] tracking-[0.5em] uppercase font-bold">
                        Anima_Edit // Core
                    </span>
                </div>
                <span class="text-[8px] text-slate-700 tracking-[0.3em] uppercase italic">
                    System_link: Stable
                </span>
            </header>

            <div class="space-y-12">
                <div class="group">
                    <input
                        v-model="note.title"
                        maxlength="40"
                        spellcheck="false"
                        class="w-full bg-transparent text-slate-100 text-lg font-bold uppercase tracking-[0.2em] outline-none border-b border-white/5 pb-3 focus:border-cyan-500/30 transition-all placeholder:text-slate-900"
                        placeholder="Title" />
                </div>

                <div class="group">
                    <textarea
                        v-model="note.thought"
                        maxlength="1000"
                        rows="8"
                        spellcheck="false"
                        class="w-full bg-transparent text-slate-400 text-sm leading-relaxed outline-none resize-none focus:text-slate-200 transition-colors scrollbar-hide"
                        placeholder="I'm listening..."></textarea>
                </div>
            </div>

            <div class="flex justify-end items-center gap-10 mt-16 pt-8 border-t border-white/5">
                <button
                    @click="router.back"
                    class="text-[10px] tracking-[0.4em] text-slate-600 uppercase hover:text-rose-500 transition-colors">
                    Abort
                </button>

                <button
                    @click="handleUpdate"
                    class="group flex items-center text-[11px] font-black tracking-[0.4em] text-cyan-400 uppercase transition-all">
                    <span
                        class="opacity-0 group-hover:opacity-100 transition-all text-cyan-500 mr-2 -translate-x-1 group-hover:translate-x-0">
                        [
                    </span>
                    <span class="group-hover:drop-shadow-[0_0_8px_#22d3ee]">Commit_Changes</span>
                    <span
                        class="opacity-0 group-hover:opacity-100 transition-all text-cyan-500 ml-2 translate-x-1 group-hover:translate-x-0">
                        ]
                    </span>
                </button>
            </div>
        </div>
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

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

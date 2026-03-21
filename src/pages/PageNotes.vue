<script setup>
import NoteCard from '@/components/notes/NoteCard.vue';
import NoteForm from '@/components/notes/NoteForm.vue';
import NoteModalDelete from '@/components/notes/NoteModalDelete.vue';
import { useStoreNotes } from '@/stores/notes.store.js';

const storeNotes = useStoreNotes();
</script>

<template>
    <section class="min-h-screen max-w-7xl mx-auto px-6 py-10 md:px-12">
        <NoteForm :notes="storeNotes.notes" />

        <TransitionGroup
            name="jump"
            tag="ul"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NoteCard v-for="note in storeNotes.notes" :key="note.id" :note="note" />
        </TransitionGroup>

        <Transition name="fade" appear>
            <div
                v-if="storeNotes.notes.length === 0"
                class="flex flex-col items-center justify-center mt-32 opacity-40">
                <div class="w-12 h-px bg-slate-700 mb-8"></div>
                <p
                    class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] text-center leading-loose">
                    Buffer is empty
                    <br />
                    <span class="font-light opacity-60">System awaiting new data input...</span>
                </p>
                <div class="w-1 h-1 rounded-full bg-slate-800 mt-8"></div>
            </div>
        </Transition>

        <Teleport to="body">
            <NoteModalDelete />
        </Teleport>
    </section>
</template>

<style scoped>
.jump-enter-active,
.jump-leave-active {
    transition: all 0.4s ease;
}

.jump-enter-from,
.jump-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.jump-move {
    transition: transform 0.4s ease;
}
</style>

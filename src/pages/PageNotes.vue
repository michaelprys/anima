<script setup>
import CardNote from '@/components/notes/CardNote.vue';
import FormNote from '@/components/notes/FormNote.vue';
import ModalDelete from '@/components/notes/ModalDelete.vue';
import ModalEdit from '@/components/notes/ModalEdit.vue';
import { useStoreNotes } from '@/stores/notes.store.js';

const storeNotes = useStoreNotes();
</script>

<template>
    <section class="min-h-screen max-w-7xl mx-auto px-6 py-10 md:px-12">
        <FormNote :notes="storeNotes.notes" />

        <TransitionGroup
            name="jiggle"
            tag="ul"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardNote v-for="note in storeNotes.notes" :key="note.id" :note="note" />
        </TransitionGroup>

        <Transition name="fade" appear>
            <div
                v-if="storeNotes.notes.length === 0"
                class="flex flex-col items-center justify-center mt-32 opacity-40">
                <div class="w-12 h-[1px] bg-slate-700 mb-8"></div>
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
            <ModalDelete />
        </Teleport>

        <Teleport to="body">
            <ModalEdit />
        </Teleport>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.94) translateY(10px);
    filter: blur(8px);
}

.fade-enter-active .absolute {
    transition: opacity 0.6s ease;
}

.jiggle-enter-active,
.jiggle-leave-active {
    transition: all 0.4s ease;
}

.jiggle-enter-from,
.jiggle-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.jiggle-move {
    transition: transform 0.4s ease;
}
</style>

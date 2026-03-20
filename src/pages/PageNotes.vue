<script setup>
import CardNote from '@/components/notes/CardNote.vue';
import FormNote from '@/components/notes/FormNote.vue';
import { ref } from 'vue';

const notes = ref([]);

const commitNote = (note) => {
    notes.value.unshift(note);
};

const deleteNote = (noteId) => {
    notes.value = notes.value.filter((note) => note.id !== noteId);
};
</script>

<template>
    <section class="min-h-screen max-w-7xl mx-auto px-6 py-10 md:px-12">
        <FormNote :notes="notes" @commit="commitNote" />

        <TransitionGroup
            name="jelly"
            tag="ul"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardNote v-for="note in notes" :key="note.id" :note="note" @delete="deleteNote" />
        </TransitionGroup>

        <Transition name="fade">
            <div
                v-if="notes.length === 0"
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
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.jelly-enter-active,
.jelly-move {
    transition: all 0.45s cubic-bezier(0.3, 1.3, 0.3, 1);
}
.jelly-leave-active {
    transition: all 0.3s ease-in;
    position: absolute;
}
.jelly-enter-from {
    opacity: 0;
    transform: scale(0.97) translateY(-0.1rem);
}
.jelly-leave-to {
    opacity: 0;
    transform: scale(0.97);
}
</style>

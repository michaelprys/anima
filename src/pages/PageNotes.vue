<script setup>
import CardNote from '@/components/notes/CardNote.vue';
import FormNote from '@/components/notes/FormNote.vue';
import { ref } from 'vue';

const notes = ref([
    {
        id: 1,
        title: 'Sleep Log',
        thought: 'Went to bed at 11 PM, woke up at 7 AM. Slept well.',
        date: 'Oct 24',
    },
]);

const commitNote = (note) => {
    notes.value.unshift(note);
};
</script>

<template>
    <section class="min-h-screen max-w-7xl mx-auto px-6 py-10 md:px-12">
        <FormNote :notes="notes" @commit="commitNote" />

        <TransitionGroup
            name="jelly"
            tag="ul"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardNote v-for="note in notes" :key="note.id" :note="note" />
        </TransitionGroup>
    </section>
</template>

<style scoped>
.jelly-enter-active,
.jelly-move {
    transition: all 0.45s cubic-bezier(0.3, 1.3, 0.3, 1);
}
.jelly-leave-active {
    transition: all 0.3s ease-in;
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

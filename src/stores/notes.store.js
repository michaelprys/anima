import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreNotes = defineStore('storeNotes', () => {
    const notes = ref([]);

    const commitNote = (payload) => {
        const dateSettings = { month: 'short', day: 'numeric' },
            date = new Intl.DateTimeFormat(navigator.language, dateSettings).format(new Date());

        const note = {
            id: crypto.randomUUID(),
            title: payload.title,
            thought: payload.thought,
            date,
        };

        notes.value.unshift(note);
    };

    const deleteNote = (noteId) => {
        notes.value = notes.value.filter((note) => note.id !== noteId);
    };

    return {
        notes,
        commitNote,
        deleteNote,
    };
});

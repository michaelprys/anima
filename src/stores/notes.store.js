import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreNotes = defineStore('storeNotes', () => {
    const notes = ref([]);
    const activeModal = ref(false);
    const selectedNote = ref(null);

    const openModal = (note, type) => {
        selectedNote.value = { ...note };
        activeModal.value = type;
    };

    const closeModal = () => {
        selectedNote.value = null;
        activeModal.value = false;
    };

    const addNote = (payload) => {
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
        closeModal();
    };

    const updateNote = () => {
        if (!selectedNote.value) return;

        notes.value = notes.value.map((note) => {
            if (note.id === selectedNote.value.id) {
                return {
                    id: selectedNote.value.id,
                    title: selectedNote.value.title,
                    thought: selectedNote.value.thought,
                };
            }
            return note;
        });

        closeModal();
    };

    return {
        notes,
        activeModal,
        selectedNote,
        openModal,
        closeModal,
        addNote,
        deleteNote,
        updateNote,
    };
});

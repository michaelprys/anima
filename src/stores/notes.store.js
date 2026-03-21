import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreNotes = defineStore(
    'storeNotes',
    () => {
        const notes = ref([]);
        const activeModal = ref(false);
        const selectedNoteId = ref(null);

        const openModal = (noteId, type) => {
            selectedNoteId.value = noteId;
            activeModal.value = type;
        };

        const closeModal = () => {
            selectedNoteId.value = null;
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

        const updateNote = (id, payload) => {
            const index = notes.value.findIndex((note) => note.id === id);

            if (index !== -1) {
                notes.value[index] = {
                    ...notes.value[index],
                    ...payload,
                };
            }
        };

        const getNoteById = (id) => {
            return notes.value.find((note) => note.id === id);
        };

        return {
            notes,
            activeModal,
            selectedNoteId,
            openModal,
            closeModal,
            addNote,
            deleteNote,
            updateNote,
            getNoteById,
        };
    },
    {
        persist: true,
    },
);

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreFragments = defineStore(
    'storeFragments',
    () => {
        const fragments = ref([]);
        const activeModal = ref(false);
        const selectedNoteId = ref(null);
        const sentiment = ref([]);

        const openModal = (noteId, type) => {
            selectedNoteId.value = noteId;
            activeModal.value = type;
        };

        const closeModal = () => {
            selectedNoteId.value = null;
            activeModal.value = false;
        };

        const addFragment = (payload) => {
            const dateSettings = { month: 'short', day: 'numeric' },
                date = new Intl.DateTimeFormat(navigator.language, dateSettings).format(new Date());

            const fragment = {
                id: crypto.randomUUID(),
                title: payload.title,
                thought: payload.thought,
                date,
            };

            fragments.value.unshift(fragment);
        };

        const deleteFragment = (noteId) => {
            fragments.value = fragments.value.filter((fragment) => fragment.id !== noteId);

            closeModal();
        };

        const updateFragment = (id, payload) => {
            const index = fragments.value.findIndex((fragment) => fragment.id === id);

            if (index !== -1) {
                fragments.value[index] = {
                    ...fragments.value[index],
                    ...payload,
                };
            }
        };

        const getFragmentById = (id) => {
            return fragments.value.find((fragment) => fragment.id === id);
        };

        const recognizeSentiment = async (data) => {
            try {
                const response = await fetch(
                    'https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-xlm-roberta-base-sentiment',
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify({ inputs: data }),
                    },
                );

                if (!response.ok) throw new Error(response.statusText);

                sentiment.value = await response.json();

                console.log(sentiment.value);
            } catch (error) {
                console.error(error.message);
            }
        };

        return {
            fragments,
            activeModal,
            selectedNoteId,
            sentiment,
            openModal,
            closeModal,
            addFragment,
            deleteFragment,
            updateFragment,
            getFragmentById,
            recognizeSentiment,
        };
    },
    {
        persist: true,
    },
);

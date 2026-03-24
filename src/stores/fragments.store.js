import { supabase } from '@/api/supabase.js';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';

export const useStoreFragments = defineStore('storeFragments', () => {
    const fragments = ref([]);
    const activeModal = ref(false);
    const selectedFragmentId = ref(null);
    const sentiment = ref([]);

    const openModal = (fragmentId, type) => {
        selectedFragmentId.value = fragmentId;
        activeModal.value = type;
    };

    const closeModal = () => {
        selectedFragmentId.value = null;
        activeModal.value = false;
    };

    const addFragment = async (payload) => {
        const storeAuth = useStoreAuth();
        await storeAuth.checkAuth();

        const fragment = {
            identity_id: storeAuth.currentUser.id,
            title: payload.title.toUpperCase(),
            thought: payload.thought.toUpperCase(),
        };

        const { data, error } = await supabase.from('fragments').insert(fragment).single();

        if (error) throw error;

        fragments.value.unshift({
            title: data.title,
            thought: data.thought,
        });
    };

    const deleteFragment = (fragmentId) => {
        fragments.value = fragments.value.filter((fragment) => fragment.id !== fragmentId);

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
        } catch (error) {
            console.error(error.message);
        }
    };

    return {
        fragments,
        activeModal,
        selectedFragmentId,
        sentiment,
        openModal,
        closeModal,
        addFragment,
        deleteFragment,
        updateFragment,
        getFragmentById,
        recognizeSentiment,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreFragments, import.meta.hot));
}

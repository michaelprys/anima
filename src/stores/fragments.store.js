import { supabase } from '@/api/supabase.js';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';

export const useStoreFragments = defineStore('storeFragments', () => {
    const fragments = ref([]);
    const activeModal = ref(false);
    const selectedFragmentId = ref(null);
    const sentiment = ref([]);
    const storeAuth = useStoreAuth();
    const searchText = ref('');
    const hasMoreFragments = ref(false);

    const openModal = (fragmentId, type) => {
        selectedFragmentId.value = fragmentId;
        activeModal.value = type;
    };

    const closeModal = () => {
        selectedFragmentId.value = null;
        activeModal.value = false;
    };

    const transformFragment = (raw) => {
        const dateSettings = { month: 'short', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat(navigator.language, dateSettings).format(
            new Date(raw.created_at),
        );

        return {
            id: raw.id,
            title: raw.title,
            thought: raw.thought,
            date: formattedDate,
        };
    };

    const addFragment = async (payload) => {
        await storeAuth.checkAuth();

        const { data, error } = await supabase
            .from('fragments')
            .insert({
                identity_id: storeAuth.currentUser.id,
                title: payload.title.toUpperCase(),
                thought: payload.thought.toUpperCase(),
            })
            .select('id, title, thought, created_at')
            .single();

        if (error) throw error;

        fragments.value.unshift(transformFragment(data));
    };

    const loadFragments = async (payload = {}) => {
        await storeAuth.checkAuth();

        const { skip = 0, limit = 9 } = payload;

        const word = searchText.value.trim().split(' ');

        let query = supabase
            .from('fragments')
            .select('*')
            .order('created_at', { descending: true })
            .eq('identity_id', storeAuth.currentUser.id)
            .range(skip, skip + limit - 1);

        if (searchText.value) {
            query = query.ilike('title', `%${word}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (data.length < limit) {
            hasMoreFragments.value = false;
        }

        const transformed = data.map(transformFragment);

        if (skip === 0) {
            hasMoreFragments.value = true;
            fragments.value = transformed;
        } else {
            fragments.value.push(...transformed);
        }
    };

    const loadMoreFragments = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        await loadFragments({
            searchText: searchText.value,
            limit: 3,
            skip: fragments.value.length,
        });
    };

    const deleteFragment = async (fragmentId) => {
        await storeAuth.checkAuth();

        const { error } = await supabase
            .from('fragments')
            .delete()
            .eq('id', fragmentId)
            .eq('identity_id', storeAuth.currentUser.id);

        console.log(selectedFragmentId.value);
        if (error) throw error;

        fragments.value = fragments.value.filter((fragment) => fragment.id !== fragmentId);

        closeModal();
    };

    const updateFragment = async (payload) => {
        await storeAuth.checkAuth();

        const { fragmentId, title, thought } = payload;

        const { error } = await supabase
            .from('fragments')
            .update({ title, thought })
            .eq('identity_id', storeAuth.currentUser.id)
            .eq('id', fragmentId);

        if (error) throw error;

        fragments.value = fragments.value.map((fragment) => {
            if (fragment.id === fragmentId) {
                return {
                    ...fragment,
                    title: title.toUpperCase(),
                    thought: thought.toUpperCase(),
                };
            }

            return fragment;
        });
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
        searchText,
        hasMoreFragments,
        openModal,
        closeModal,
        addFragment,
        loadFragments,
        loadMoreFragments,
        deleteFragment,
        updateFragment,
        getFragmentById,
        recognizeSentiment,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreFragments, import.meta.hot));
}

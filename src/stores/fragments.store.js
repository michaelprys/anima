import { useStoreSentiment } from '@/stores/sentiment.store.js';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStoreAuth } from '@/stores/auth.store';
import { supabase } from '@/api/supabase.js';
import { computed, ref } from 'vue';

export const useStoreFragments = defineStore('storeFragments', () => {
    const fragments = ref([]);
    const isLoading = ref(true);
    const activeModal = ref(false);
    const selectedFragmentId = ref(null);
    const searchText = ref('');
    const hasMoreFragments = ref(false);
    const storeSentiment = useStoreSentiment();
    const storeAuth = useStoreAuth();

    const openModal = (id, type) => {
        selectedFragmentId.value = id;
        activeModal.value = type;
    };
    const closeModal = () => {
        selectedFragmentId.value = null;
        activeModal.value = false;
    };

    const transformFragment = (raw) => ({
        id: raw.id,
        title: raw.title,
        thought: raw.thought,
        date: new Intl.DateTimeFormat(navigator.language, {
            month: 'short',
            day: 'numeric',
        }).format(new Date(raw.created_at)),
        created_at: raw.created_at,
        cognitive_impact: Number(raw.cognitive_impact || 0),
    });

    const totalFragmentsCharacters = computed(() => {
        if (!fragments.value.length) return '0.00';
        const total = fragments.value.reduce(
            (acc, f) => acc + (f.title?.length || 0) + (f.thought?.length || 0),
            0,
        );

        return (total * 0.0009765625).toFixed(2);
    });

    const dailyCognitiveLoad = computed(() => {
        const today = new Date().toLocaleDateString('en-CA');

        return fragments.value.reduce((acc, f) => {
            const fDate = new Date(f.created_at).toLocaleDateString('en-CA');

            return fDate === today ? acc + Number(f.cognitive_impact || 0) : acc;
        }, 0);
    });

    const addFragment = async (payload) => {
        await storeAuth.checkAuth();
        const sentiment = await storeSentiment.recognizeSentiment(
            `${payload.title}. ${payload.thought}`,
        );
        const impact =
            Number(storeSentiment.calculateImpact(sentiment, payload.thought, payload.title)) || 0;

        const { data, error } = await supabase
            .from('fragments')
            .insert({
                identity_id: storeAuth.currentUser.id,
                title: payload.title.toUpperCase(),
                thought: payload.thought.toUpperCase(),
                cognitive_impact: impact,
            })
            .select('*')
            .single();

        if (error) throw error;
        fragments.value.unshift(transformFragment(data));
    };

    const loadFragments = async (payload = {}) => {
        isLoading.value = true;
        const minDelay = new Promise((resolve) => setTimeout(resolve, 400));
        try {
            await storeAuth.checkAuth();
            const { skip = 0, limit = 50 } = payload;
            let query = supabase
                .from('fragments')
                .select('*')
                .order('created_at', { descending: true })
                .eq('identity_id', storeAuth.currentUser.id)
                .range(skip, skip + limit - 1);

            if (searchText.value) {
                const search = `%${searchText.value.trim()}%`;
                query = query.or(`title.ilike.${search},thought.ilike.${search}`);
            }

            const [response] = await Promise.all([query, minDelay]);
            const { data, error } = response;
            if (error) throw error;
            const transformed = data.map(transformFragment);
            if (skip === 0) fragments.value = transformed;
            else fragments.value.push(...transformed);
            hasMoreFragments.value = data.length === limit;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteFragment = async (id) => {
        await storeAuth.checkAuth();
        const { error } = await supabase.from('fragments').delete().eq('id', id);
        if (error) throw error;
        fragments.value = fragments.value.filter((f) => f.id !== id);
        closeModal();
    };

    const updateFragment = async ({ fragmentId, title, thought }) => {
        await storeAuth.checkAuth();
        const { data, error } = await supabase
            .from('fragments')
            .update({ title, thought })
            .eq('id', fragmentId)
            .select('*')
            .single();
        if (error) throw error;
        fragments.value = fragments.value.map((f) =>
            f.id === fragmentId ? transformFragment(data) : f,
        );
    };

    return {
        fragments,
        isLoading,
        activeModal,
        selectedFragmentId,
        searchText,
        hasMoreFragments,
        dailyCognitiveLoad,
        totalFragmentsCharacters,
        openModal,
        closeModal,
        addFragment,
        loadFragments,
        deleteFragment,
        updateFragment,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStoreFragments, import.meta.hot));

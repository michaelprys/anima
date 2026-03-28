import { useStoreSentiment } from '@/stores/sentiment.store.js';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStoreAuth } from '@/stores/auth.store';
import { supabase } from '@/api/supabase.js';
import { computed, ref } from 'vue';

export const useStoreFragments = defineStore('storeFragments', () => {
    const fragments = ref([]);
    const isLoading = ref(true);
    const isSyncing = ref(false);
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
        syncing: raw.syncing || false,
    });

    const getFragmentById = (id) => fragments.value.find((f) => f.id === id);

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
        const clientSideId = crypto.randomUUID();
        const optimisticNote = transformFragment({
            id: clientSideId,
            title: payload.title.toUpperCase(),
            thought: payload.thought.toUpperCase(),
            created_at: new Date().toISOString(),
            cognitive_impact: 0,
            syncing: true,
        });

        fragments.value.unshift(optimisticNote);
        isSyncing.value = true;

        try {
            const { data, error } = await supabase
                .from('fragments')
                .insert({
                    id: clientSideId,
                    identity_id: storeAuth.currentUser.id,
                    title: payload.title.toUpperCase(),
                    thought: payload.thought.toUpperCase(),
                    cognitive_impact: 0,
                })
                .select('*')
                .single();

            if (error) throw error;

            const idx = fragments.value.findIndex((f) => f.id === clientSideId);
            if (idx !== -1) {
                Object.assign(fragments.value[idx], transformFragment(data));
                fragments.value[idx].syncing = false;
            }

            processImpactInBackground(clientSideId, payload);
        } catch (e) {
            fragments.value = fragments.value.filter((f) => f.id !== clientSideId);
            isSyncing.value = false;
            throw e;
        }
    };

    const processImpactInBackground = async (dbId, payload) => {
        try {
            const sentiment = await storeSentiment.recognizeSentiment(
                `${payload.title}. ${payload.thought}`,
            );
            const impact =
                Number(storeSentiment.calculateImpact(sentiment, payload.thought, payload.title)) ||
                0;

            await supabase.from('fragments').update({ cognitive_impact: impact }).eq('id', dbId);

            const note = fragments.value.find((f) => f.id === dbId);
            if (note) note.cognitive_impact = impact;
        } finally {
            isSyncing.value = false;
        }
    };

    const loadFragments = async (payload = {}) => {
        isLoading.value = true;
        try {
            await storeAuth.checkAuth();
            const { skip = 0, limit = 50 } = payload;
            let query = supabase
                .from('fragments')
                .select('*')
                .order('created_at', { descending: true })
                .eq('identity_id', storeAuth.currentUser.id)
                .range(skip, skip + limit - 1);

            const { data, error } = await query;
            if (error) throw error;
            const transformed = data.map(transformFragment);
            if (skip === 0) fragments.value = transformed;
            else fragments.value.push(...transformed);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteFragment = async (id) => {
        await storeAuth.checkAuth();
        await supabase.from('fragments').delete().eq('id', id);
        fragments.value = fragments.value.filter((f) => f.id !== id);
        closeModal();
    };

    const updateFragment = async ({ fragmentId, title, thought }) => {
        await storeAuth.checkAuth();

        const note = fragments.value.find((f) => f.id === fragmentId);
        if (note) {
            Object.assign(note, {
                title: title.toUpperCase(),
                thought: thought.toUpperCase(),
                cognitive_impact: 0,
            });
        }

        isSyncing.value = true;

        supabase
            .from('fragments')
            .update({
                title: title.toUpperCase(),
                thought: thought.toUpperCase(),
                cognitive_impact: 0,
            })
            .eq('id', fragmentId)
            .select('*')
            .single();

        processImpactInBackground(fragmentId, { title, thought });
    };

    return {
        fragments,
        isLoading,
        isSyncing,
        activeModal,
        selectedFragmentId,
        searchText,
        hasMoreFragments,
        dailyCognitiveLoad,
        totalFragmentsCharacters,
        getFragmentById,
        openModal,
        closeModal,
        addFragment,
        loadFragments,
        deleteFragment,
        updateFragment,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStoreFragments, import.meta.hot));

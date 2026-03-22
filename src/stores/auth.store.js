import { defineStore, acceptHMRUpdate } from 'pinia';
import { supabase } from '@/api/supabase';
import { computed, ref } from 'vue';

export const useStoreAuth = defineStore('storeAuth', () => {
    const user = ref(null),
        isAuthenticated = computed(() => !!user.value),
        redirectTo = import.meta.env.VITE_APP_URL;

    (async () => {
        try {
            const { data: authState } = await supabase.auth.getUser();
            user.value = authState.user ?? null;
        } catch (error) {
            console.error(error);
            user.value = null;
        }
    })();

    supabase.auth.onAuthStateChange((_, session) => {
        user.value = session?.user ?? null;
    });

    const identify = async (payload) => {
        const { email, password } = payload;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return data;
    };

    const initialize = async (payload) => {
        const { userIdentifier, email, passKey } = payload;

        const { data, error } = await supabase.auth.signUp({
            email,
            password: passKey,
            options: {
                data: { userIdentifier },
                emailRedirectTo: `${redirectTo}/auth/identify`,
            },
        });

        if (error) throw error;

        return data;
    };

    return {
        isAuthenticated,
        identify,
        initialize,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}

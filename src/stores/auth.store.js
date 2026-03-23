import { defineStore, acceptHMRUpdate } from 'pinia';
import { supabase } from '@/api/supabase';
import { computed, ref } from 'vue';

export const useStoreAuth = defineStore('storeAuth', () => {
    const user = ref(null),
        userName = ref(null),
        isAuthenticated = computed(() => Boolean(user.value)),
        redirectTo = import.meta.env.VITE_APP_URL;

    (async () => {
        try {
            const { data: authState } = await supabase.auth.getUser();
            user.value = authState.user ?? null;
            userName.value = authState.user?.user_metadata?.userIdentifier ?? null;
        } catch (error) {
            console.error(error);
            user.value = null;
        }
    })();

    supabase.auth.onAuthStateChange((_, session) => {
        if (window.location.search.includes('verified=true')) {
            user.value = null;

            return;
        }

        user.value = session?.user ?? null;
    });

    const identify = async (payload) => {
        const { email, passKey } = payload;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: passKey,
        });

        if (error) throw error;

        return data;
    };

    const disconnect = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
    };

    const initialize = async (payload) => {
        const { userIdentifier, email, passKey } = payload;

        const { data, error } = await supabase.auth.signUp({
            email,
            password: passKey,
            options: {
                data: { userIdentifier },
                emailRedirectTo: `${redirectTo}/auth/identify?verified=true`,
            },
        });

        if (error) throw error;

        return data;
    };

    const recover = async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${redirectTo}/auth/reconfigure`,
        });

        if (error) throw error;

        return data;
    };

    const reconfigure = async (passKey) => {
        const { data, error } = await supabase.auth.updateUser({
            password: passKey,
        });

        if (error) throw error;

        return data;
    };

    return {
        userName,
        isAuthenticated,
        identify,
        disconnect,
        initialize,
        recover,
        reconfigure,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}

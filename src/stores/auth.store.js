import { delay } from '@/utils/delay.utils';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { supabase } from '@/api/supabase';
import { computed, ref } from 'vue';

export const useStoreAuth = defineStore('storeAuth', () => {
    const redirectTo = import.meta.env.VITE_APP_URL;
    const currentUser = ref(null);
    const isAuthChecked = ref(false);
    const isLoggedIn = computed(() => Boolean(currentUser.value));
    const UX_DELAY = 1000;
    const isPendingUX = ref(false);

    const syncUser = (userData) => {
        currentUser.value = userData;
        isAuthChecked.value = true;
    };

    const checkAuth = async () => {
        if (isAuthChecked.value) return;

        try {
            const { data } = await supabase.auth.getUser();
            syncUser(data.user ?? null);
        } catch (error) {
            syncUser(null);
        }
    };

    supabase.auth.onAuthStateChange(async (_, session) => {
        if (isPendingUX.value) return;

        syncUser(session?.user ?? null);
    });

    const identify = async (payload) => {
        isPendingUX.value = true;

        try {
            const { email, passKey } = payload;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password: passKey,
            });

            if (error) throw error;

            await delay(UX_DELAY);
            syncUser(data.user);
        } finally {
            isPendingUX.value = false;
        }
    };

    const disconnect = async () => {
        isPendingUX.value = true;

        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            await delay(UX_DELAY);

            syncUser(null);
        } finally {
            isPendingUX.value = false;
        }
    };

    const initialize = async (payload) => {
        isPendingUX.value = true;

        try {
            const { userIdentifier, email, passKey } = payload;

            const { error } = await supabase.auth.signUp({
                email,
                password: passKey,
                options: {
                    data: { userIdentifier },
                    emailRedirectTo: `${redirectTo}/auth/identify?verified=true`,
                },
            });

            if (error) throw error;

            await delay(UX_DELAY);
        } finally {
            isPendingUX.value = false;
        }
    };

    const recover = async (email) => {
        isPendingUX.value = true;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${redirectTo}/auth/reconfigure`,
            });

            if (error) throw error;

            await delay(UX_DELAY);
        } finally {
            isPendingUX.value = false;
        }
    };

    const reconfigure = async (passKey) => {
        isPendingUX.value = true;

        try {
            const { error } = await supabase.auth.updateUser({
                password: passKey,
            });

            if (error) throw error;

            await delay(UX_DELAY);
        } finally {
            isPendingUX.value = false;
        }
    };

    return {
        currentUser,
        isLoggedIn,
        syncUser,
        checkAuth,
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

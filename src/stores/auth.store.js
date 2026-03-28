import { defineStore, acceptHMRUpdate } from 'pinia';
import { delay } from '@/utils/delay.utils';
import { supabase } from '@/api/supabase';
import { computed, ref } from 'vue';

export const useStoreAuth = defineStore('storeAuth', () => {
    const redirectTo = import.meta.env.VITE_APP_URL;
    const currentIdentity = ref(null);
    const isAuthChecked = ref(false);
    const isLoggedIn = computed(() => Boolean(currentIdentity.value));
    const UX_DELAY = 1000;
    const isPendingUX = ref(false);

    const syncUser = (userData) => {
        currentIdentity.value = userData;
        isAuthChecked.value = true;
    };

    const checkAuth = async () => {
        if (isAuthChecked.value || isPendingUX.value) return;

        try {
            const { data } = await supabase.auth.getUser();
            syncUser(data.user ?? null);
        } catch {
            syncUser(null);
        }
    };

    supabase.auth.onAuthStateChange(async (_, session) => {
        if (isPendingUX.value) return;

        syncUser(session?.user ?? null);
    });

    const identifyAsGuest = async () => {
        isPendingUX.value = true;

        try {
            const { data, error } = await supabase.auth.signInAnonymously();

            if (error) throw error;

            await delay(UX_DELAY);
            syncUser(data.user);
        } finally {
            isPendingUX.value = false;
        }
    };

    const identify = async (payload) => {
        isPendingUX.value = true;

        try {
            const { email, passKey } = payload;
            const formattedEmail = email.toLowerCase().trim();

            const { data, error } = await supabase.auth.signInWithPassword({
                email: formattedEmail,
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

            const formattedEmail = email.toLowerCase().trim();
            const formattedUserId = userIdentifier.toUpperCase().trim();

            const { error } = await supabase.auth.signUp({
                email: formattedEmail,
                password: passKey,
                options: {
                    data: {
                        userIdentifier: formattedUserId,
                    },
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
            const formattedEmail = email.toLowerCase().trim();
            const { error } = await supabase.auth.resetPasswordForEmail(formattedEmail, {
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
        currentIdentity,
        isLoggedIn,
        isAuthChecked,
        syncUser,
        checkAuth,
        identify,
        identifyAsGuest,
        disconnect,
        initialize,
        recover,
        reconfigure,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}

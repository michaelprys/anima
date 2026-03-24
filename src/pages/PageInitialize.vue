<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import BasePasswordVisibility from '@/components/base/BasePasswordVisibility.vue';
import { useToast } from '@/composables/useToast.js';
import { delay } from '@/utils/delay.utils.js';
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';

const { showToast } = useToast();
const storeAuth = useStoreAuth();
const router = useRouter();

const identity = ref({
    userIdentifier: '',
    email: '',
    passKey: '',
    confirmPassKey: '',
});

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const attempted = ref(true);
const pending = ref(false);

const isPasswordMatch = computed(() => {
    return (
        identity.value.passKey === identity.value.confirmPassKey && identity.value.passKey !== ''
    );
});

const handleInitialize = async () => {
    const { userIdentifier, email, passKey, confirmPassKey } = identity.value;

    const isFilled = userIdentifier && email && passKey && confirmPassKey;

    if (!isFilled || !isPasswordMatch.value) {
        attempted.value = false;
        return;
    }
    pending.value = true;

    try {
        await storeAuth.initialize({
            userIdentifier,
            email,
            passKey,
        });

        showToast('IDENTITY_INITIALIZED', 'success');

        await router.push({ name: 'identify' });
    } catch (error) {
        showToast(formatSystemError(error), 'error');
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleInitialize" class="space-y-10 text-left uppercase">
        <div class="space-y-4">
            <div class="group/input relative">
                <input
                    v-model="identity.userIdentifier"
                    type="text"
                    spellcheck="false"
                    @input="attempted = true"
                    :placeholder="
                        !attempted && !identity.userIdentifier ? 'REQUIRED_ID _' : 'USER_IDENTIFIER'
                    "
                    :class="[
                        'auth-input w-full border-b bg-transparent py-3 text-[0.8125rem] tracking-[0.4em] uppercase transition-all duration-700 outline-none',
                        !attempted && !identity.userIdentifier
                            ? 'border-rose-danger/40 text-rose-danger placeholder:text-rose-danger/40'
                            : 'border-blue-system/20 text-blue-pale placeholder:text-blue-light/30 focus:border-blue-light focus:placeholder:text-blue-light/30',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && !identity.userIdentifier
                            ? 'bg-rose-danger shadow-glow-rose'
                            : 'bg-blue-light shadow-glow-blue',
                    ]"></div>
            </div>

            <div class="group/input relative">
                <input
                    v-model="identity.email"
                    type="email"
                    spellcheck="false"
                    @input="attempted = true"
                    :placeholder="
                        !attempted && !identity.email ? 'REQUIRED_EMAIL _' : 'EMAIL_ADDRESS'
                    "
                    :class="[
                        'auth-input w-full border-b bg-transparent py-3 text-[0.8125rem] tracking-[0.4em] uppercase transition-all duration-700 outline-none',
                        !attempted && !identity.email
                            ? 'border-rose-danger/40 text-rose-danger placeholder:text-rose-danger/40'
                            : 'border-blue-system/20 text-blue-pale placeholder:text-blue-light/30 focus:border-blue-light focus:placeholder:text-blue-light/30',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && !identity.email
                            ? 'bg-rose-danger shadow-glow-rose'
                            : 'bg-blue-light shadow-glow-blue',
                    ]"></div>
            </div>

            <div class="group/input relative">
                <input
                    v-model="identity.passKey"
                    @input="attempted = true"
                    :type="passwordVisible ? 'text' : 'password'"
                    :placeholder="
                        !attempted && !identity.passKey ? 'REQUIRED_KEY _' : 'SECURITY_KEY'
                    "
                    :class="[
                        'auth-input w-full border-b bg-transparent py-3 text-[0.8125rem] tracking-[0.4em] transition-all duration-700 outline-none',
                        !attempted && !identity.passKey
                            ? 'border-rose-danger/40 text-rose-danger placeholder:text-rose-danger/40'
                            : 'border-blue-system/20 text-blue-pale placeholder:text-blue-light/30 focus:border-blue-light focus:placeholder:text-blue-light/30',
                    ]" />
                <BasePasswordVisibility v-model="passwordVisible" />

                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && !identity.passKey
                            ? 'bg-rose-danger shadow-glow-rose'
                            : 'bg-blue-light shadow-glow-blue',
                    ]"></div>
            </div>

            <div class="group/input relative">
                <input
                    v-model="identity.confirmPassKey"
                    :type="confirmPasswordVisible ? 'text' : 'password'"
                    :placeholder="
                        !attempted && (!identity.confirmPassKey || !isPasswordMatch)
                            ? 'ERROR: MISMATCH _'
                            : 'CONFIRM_KEY'
                    "
                    :class="[
                        'auth-input w-full border-b bg-transparent py-3 text-[0.8125rem] tracking-[0.4em] transition-all duration-700 outline-none',
                        !attempted && (!identity.confirmPassKey || !isPasswordMatch)
                            ? 'border-rose-danger/40 text-rose-danger placeholder:text-rose-danger/40'
                            : 'border-blue-system/20 text-blue-pale placeholder:text-blue-light/30 focus:border-blue-light focus:placeholder:text-blue-light/30',
                    ]" />

                <BasePasswordVisibility v-model="confirmPasswordVisible" />

                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && (!identity.confirmPassKey || !isPasswordMatch)
                            ? 'bg-rose-danger shadow-glow-rose'
                            : 'bg-blue-light shadow-glow-blue',
                    ]"></div>
            </div>
        </div>

        <div class="space-y-8 pt-2">
            <ButtonAction
                action="INITIALIZE"
                skeleton="PROCESS"
                :pending="pending"
                bg-color="border-teal-init/20 bg-teal-init/5 hover:bg-teal-init/10 hover:border-teal-init/50"
                text-color="text-teal-init/60 group-hover/btn:text-teal-init" />

            <div class="grid grid-cols-2 gap-6">
                <RouterLink
                    :to="{ name: 'recover' }"
                    class="border-blue-system/10 bg-base-card/20 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-3 text-[0.5625rem] font-bold tracking-[0.2em] transition-all duration-500">
                    RECOVER_KEY
                </RouterLink>

                <RouterLink
                    :to="{ name: 'identify' }"
                    class="border-blue-system/10 bg-base-card/20 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-3 text-[0.5625rem] font-bold tracking-[0.2em] transition-all duration-500">
                    BACK TO IDENTIFY
                </RouterLink>
            </div>
        </div>
    </form>
</template>

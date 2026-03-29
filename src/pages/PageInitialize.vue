<script setup>
import BasePasswordVisibility from '@/components/base/BasePasswordVisibility.vue';
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import BaseAuthInput from '@/components/base/BaseAuthInput.vue';
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { useToast } from '@/composables/useToast.js';
import { useStoreAuth } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

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
    attempted.value = false;

    const { userIdentifier, email, passKey, confirmPassKey } = identity.value;
    const isFilled = userIdentifier && email && passKey && confirmPassKey;

    if (!isFilled || !isPasswordMatch.value) return;

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
        <div class="space-y-8">
            <BaseAuthInput
                v-model="identity.userIdentifier"
                placeholder="USER_IDENTIFIER"
                error="REQUIRED_ID"
                :show-error="!attempted && !identity.userIdentifier"
                @input="attempted = true" />

            <BaseAuthInput
                v-model="identity.email"
                type="email"
                placeholder="EMAIL_ADDRESS"
                error="REQUIRED_EMAIL"
                :show-error="!attempted && !identity.email"
                @input="attempted = true" />

            <BaseAuthInput
                v-model="identity.passKey"
                :type="passwordVisible ? 'text' : 'password'"
                placeholder="SECURITY_KEY"
                error="REQUIRED_KEY"
                :show-error="!attempted && !identity.passKey"
                @input="attempted = true">
                <BasePasswordVisibility v-model="passwordVisible" />
            </BaseAuthInput>

            <BaseAuthInput
                v-model="identity.confirmPassKey"
                :type="confirmPasswordVisible ? 'text' : 'password'"
                placeholder="CONFIRM_KEY"
                :error="!identity.confirmPassKey ? 'CONFIRM_KEY' : 'KEY_MISMATCH'"
                :show-error="!attempted && (!identity.confirmPassKey || !isPasswordMatch)"
                @input="attempted = true">
                <BasePasswordVisibility v-model="confirmPasswordVisible" />
            </BaseAuthInput>
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

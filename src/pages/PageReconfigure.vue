<script setup>
import BasePasswordVisibility from '@/components/base/BasePasswordVisibility.vue';
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import BaseAuthInput from '@/components/base/BaseAuthInput.vue';
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { useToast } from '@/composables/useToast.js';
import { useStoreAuth } from '@/stores/auth.store';
import { supabase } from '@/api/supabase.js';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const storeAuth = useStoreAuth();

const identity = ref({
    passKey: '',
    confirmPassKey: '',
});

const { showToast } = useToast();
const router = useRouter();

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const attempted = ref(true);
const pending = ref(false);

const isMatch = computed(() => {
    return (
        identity.value.passKey === identity.value.confirmPassKey && identity.value.passKey !== ''
    );
});

const handleReconfigure = async () => {
    attempted.value = false;

    if (!identity.value.passKey || !identity.value.confirmPassKey || !isMatch.value) {
        return;
    }

    pending.value = true;

    try {
        await storeAuth.reconfigure(identity.value.passKey);
        showToast('IDENTITY_RECONFIGURED', 'success');
        await supabase.auth.signOut();
        await router.push({ name: 'identify' });
    } catch (error) {
        showToast(formatSystemError(error), 'error');
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleReconfigure" class="space-y-16 text-left uppercase">
        <div class="space-y-12">
            <BaseAuthInput
                v-model="identity.passKey"
                :type="passwordVisible ? 'text' : 'password'"
                placeholder="NEW_SECURITY_KEY"
                error="REQUIRED_KEY"
                :show-error="!attempted && !identity.passKey"
                @input="attempted = true">
                <BasePasswordVisibility v-model="passwordVisible" />
            </BaseAuthInput>

            <BaseAuthInput
                v-model="identity.confirmPassKey"
                :type="confirmPasswordVisible ? 'text' : 'password'"
                placeholder="CONFIRM_NEW_KEY"
                :error="!identity.confirmPassKey ? 'CONFIRMATION_REQUIRED' : 'KEY_MISMATCH'"
                :show-error="!attempted && (!identity.confirmPassKey || !isMatch)"
                @input="attempted = true">
                <BasePasswordVisibility v-model="confirmPasswordVisible" />
            </BaseAuthInput>
        </div>

        <div class="space-y-10">
            <ButtonAction
                action="RECONFIGURE"
                skeleton="UPDATING"
                :pending="pending"
                bg-color="border-orange-warn/15 bg-orange-warn/[0.03] hover:bg-orange-warn/10 hover:border-orange-warn/40"
                text-color="text-orange-warn/60 group-hover/btn:text-white" />

            <RouterLink
                :to="{ name: 'identify' }"
                class="border-blue-system/10 bg-base-card/20 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-4 text-[0.625rem] font-bold tracking-[0.3em] transition-all duration-500">
                BACK TO IDENTIFY
            </RouterLink>
        </div>
    </form>
</template>

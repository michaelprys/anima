<script setup>
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import BaseAuthInput from '@/components/base/BaseAuthInput.vue';
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { useToast } from '@/composables/useToast.js';
import { useStoreAuth } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const storeAuth = useStoreAuth(),
    email = ref(''),
    attempted = ref(true),
    pending = ref(false);

const { showToast } = useToast();
const router = useRouter();

const handleRecover = async () => {
    attempted.value = false;

    if (!email.value) return;

    pending.value = true;

    try {
        await storeAuth.recover(email.value);
        showToast('LINK_DISPATCHED', 'success');
        await router.push({ name: 'identify' });
    } catch (error) {
        showToast(formatSystemError(error), 'error');
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleRecover" class="space-y-16 text-left uppercase">
        <BaseAuthInput
            v-model="email"
            type="email"
            placeholder="REGISTERED_EMAIL"
            error="REQUIRED_EMAIL"
            :show-error="!attempted && !email"
            @input="attempted = true" />

        <div class="space-y-10">
            <ButtonAction
                action="RECOVER"
                skeleton="SENDING"
                :pending="pending"
                bg-color="border-rose-danger/15 bg-rose-danger/[0.03] hover:bg-rose-danger/10 hover:border-rose-light/40"
                text-color="text-rose-light/60 group-hover/btn:text-white" />

            <RouterLink
                :to="{ name: 'identify' }"
                class="border-blue-system/10 bg-base-card/20 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-4 text-[0.625rem] font-bold tracking-[0.3em] transition-all duration-500">
                BACK TO IDENTIFY
            </RouterLink>
        </div>
    </form>
</template>

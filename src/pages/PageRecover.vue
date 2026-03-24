<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { useToast } from '@/composables/useToast.js';
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const storeAuth = useStoreAuth(),
    email = ref(''),
    attempted = ref(true),
    pending = ref(false);

const { showToast } = useToast();
const router = useRouter();

const handleRecover = async () => {
    if (!email.value) {
        attempted.value = false;

        return;
    }
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
        <div class="group/input relative">
            <input
                v-model="email"
                type="email"
                spellcheck="false"
                @input="attempted = true"
                :placeholder="!attempted && !email ? 'REQUIRED_EMAIL _' : 'REGISTERED_EMAIL'"
                :class="[
                    'auth-input focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[0.875rem] tracking-[0.5em] uppercase transition-all duration-700 outline-none',
                    !attempted && !email
                        ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                        : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !email
                        ? 'bg-rose-danger shadow-glow-rose'
                        : 'bg-blue-light shadow-glow-blue',
                ]"></div>
        </div>

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

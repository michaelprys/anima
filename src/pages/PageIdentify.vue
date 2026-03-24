<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import BasePasswordVisibility from '@/components/base/BasePasswordVisibility.vue';
import { useToast } from '@/composables/useToast.js';
import { useStoreAuth } from '@/stores/auth.store';
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const storeAuth = useStoreAuth();
const { showToast } = useToast();
const route = useRoute();
const router = useRouter();
const passwordVisible = ref(false);

const identity = ref({
    email: '',
    passKey: '',
});

const attempted = ref(true);
const pending = ref(false);

const handleIdentify = async () => {
    if (!identity.value.email || !identity.value.passKey) {
        attempted.value = false;
        return;
    }
    pending.value = true;

    try {
        await storeAuth.identify(identity.value);

        showToast('ACCESS_GRANTED', 'success');

        const nextPath = route.query.next || { name: 'fragments' };
        await router.push(nextPath);
    } catch (error) {
        console.error(error.message);
        showToast(formatSystemError(error), 'error');
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleIdentify" class="space-y-14 text-left uppercase">
        <div class="group/input relative">
            <input
                v-model="identity.email"
                type="text"
                spellcheck="false"
                @input="attempted = true"
                :placeholder="!attempted && !identity.email ? 'REQUIRED_EMAIL _' : 'EMAIL_ADDRESS'"
                :class="[
                    'auth-input focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[0.875rem] tracking-[0.5em] uppercase transition-all duration-700 outline-none',
                    !attempted && !identity.email
                        ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                        : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.email
                        ? 'bg-rose-danger'
                        : 'bg-blue-light shadow-glow-blue',
                ]"></div>
        </div>

        <div class="group/input relative">
            <input
                id="password"
                v-model="identity.passKey"
                @input="attempted = true"
                :type="passwordVisible ? 'text' : 'password'"
                :placeholder="!attempted && !identity.passKey ? 'REQUIRED_KEY _' : 'SECURITY_KEY'"
                :class="[
                    'auth-input focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 pr-17 text-[0.875rem] tracking-[0.5em] transition-all duration-700 outline-none',
                    !attempted && !identity.passKey
                        ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                        : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                ]" />
            <BasePasswordVisibility v-model="passwordVisible" />

            <div
                class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.passKey
                        ? 'bg-rose-danger'
                        : 'bg-blue-light shadow-glow-blue',
                ]"></div>
        </div>

        <div class="space-y-12">
            <ButtonAction
                action="IDENTIFY"
                skeleton="PROCESS"
                :pending="pending"
                bg-color="border-blue-system/30 bg-blue-system/5 hover:bg-blue-system/10 hover:border-blue-light"
                text-color="text-blue-light group-hover/btn:text-white" />

            <div class="grid grid-cols-2 gap-6">
                <RouterLink
                    :to="{ name: 'recover' }"
                    class="border-blue-system/10 bg-blue-system/5 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-4 text-[0.625rem] font-bold tracking-[0.3em] transition-all duration-500">
                    RECOVER_KEY
                </RouterLink>

                <RouterLink
                    :to="{ name: 'initialize' }"
                    class="border-blue-system/10 bg-blue-system/5 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-4 text-[0.625rem] font-bold tracking-[0.3em] transition-all duration-500">
                    INITIALIZE
                </RouterLink>
            </div>
        </div>
    </form>
</template>

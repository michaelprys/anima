<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { useStoreAuth } from '@/stores/auth.store';
import { delay } from '@/utils/delay.utils';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter(),
    route = useRoute();

const storeAuth = useStoreAuth();

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

        if (storeAuth.isAuthenticated) {
            await delay(1000);
            await router.push({ name: 'fragments' });
        }
    } catch (error) {
        console.error(error.message);
    } finally {
        pending.value = false;
    }
};

onMounted(async () => {
    if (route.query.verified === 'true') {
        await storeAuth.disconnect();
    }
});
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
                    'focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[0.875rem] tracking-[0.5em] uppercase transition-all duration-700 outline-none',
                    !attempted && !identity.email
                        ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                        : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-[0.125rem] w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.email
                        ? 'bg-rose-danger'
                        : 'bg-blue-light shadow-glow-blue',
                ]"></div>
        </div>

        <div class="group/input relative">
            <input
                v-model="identity.passKey"
                type="password"
                @input="attempted = true"
                :placeholder="!attempted && !identity.passKey ? 'REQUIRED_KEY _' : 'SECURITY_KEY'"
                :class="[
                    'focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[0.875rem] tracking-[0.5em] transition-all duration-700 outline-none',
                    !attempted && !identity.passKey
                        ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                        : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-[0.125rem] w-0 transition-all duration-700 group-focus-within/input:w-full"
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

<style scoped>
input:focus {
    text-shadow: 0 0 0.625rem
        v-bind('!attempted ? "rgba(244, 63, 94, 0.3)" : "rgba(59, 130, 246, 0.3)"');
}
</style>

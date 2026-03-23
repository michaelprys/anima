<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { ref, computed } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';

const storeAuth = useStoreAuth();

const identity = ref({
    passKey: '',
    confirmPassKey: '',
});

const attempted = ref(true);
const pending = ref(false);

const isMatch = computed(() => {
    return (
        identity.value.passKey === identity.value.confirmPassKey && identity.value.passKey !== ''
    );
});

const handleReconfigure = async () => {
    if (!identity.value.passKey || !isMatch.value) {
        attempted.value = false;

        return;
    }
    pending.value = true;

    try {
        await storeAuth.reconfigure(identity.value.passKey);
    } catch (error) {
        console.error(error);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleReconfigure" class="space-y-16 text-left uppercase">
        <div class="space-y-8">
            <div class="group/input relative">
                <input
                    v-model="identity.passKey"
                    type="password"
                    @input="attempted = true"
                    :placeholder="
                        !attempted && !identity.passKey ? 'REQUIRED_KEY _' : 'NEW_SECURITY_KEY'
                    "
                    :class="[
                        'auth-input focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[0.875rem] tracking-[0.5em] transition-all duration-700 outline-none',
                        !attempted && !identity.passKey
                            ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                            : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                    ]" />
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
                    type="password"
                    @input="attempted = true"
                    :placeholder="
                        !attempted && (!identity.confirmPassKey || !isMatch)
                            ? 'ERROR: MISMATCH _'
                            : 'CONFIRM_NEW_KEY'
                    "
                    :class="[
                        'auth-input focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[0.875rem] tracking-[0.5em] transition-all duration-700 outline-none',
                        !attempted && (!identity.confirmPassKey || !isMatch)
                            ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                            : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && (!identity.confirmPassKey || !isMatch)
                            ? 'bg-rose-danger shadow-glow-rose'
                            : 'bg-blue-light shadow-glow-blue',
                    ]"></div>
            </div>
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

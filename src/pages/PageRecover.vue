<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';

const storeAuth = useStoreAuth();

const identity = ref({
    email: '',
});

const attempted = ref(true);
const pending = ref(false);

const handleRecover = async () => {
    if (!identity.value.email) {
        attempted.value = false;
        return;
    }
};
</script>

<template>
    <form @submit.prevent="handleRecover" class="space-y-16 text-left uppercase">
        <div class="group/input relative">
            <input
                v-model="identity.email"
                type="email"
                spellcheck="false"
                @input="attempted = true"
                :placeholder="
                    !attempted && !identity.email ? 'REQUIRED_EMAIL _' : 'REGISTERED_EMAIL'
                "
                :class="[
                    'focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-5 text-[14px] tracking-[0.5em] uppercase transition-all duration-700 outline-none',
                    !attempted && !identity.email
                        ? 'border-rose-danger/40 text-rose-danger placeholder-rose-danger/40'
                        : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.email
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
                class="border-blue-system/10 bg-base-card/20 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-4 text-[10px] font-bold tracking-[0.3em] transition-all duration-500">
                BACK TO IDENTIFY
            </RouterLink>
        </div>
    </form>
</template>

<style scoped>
input:focus {
    text-shadow: 0 0 10px
        v-bind('!attempted ? "var(--color-rose-danger)" : "var(--color-blue-light)"');
}
</style>

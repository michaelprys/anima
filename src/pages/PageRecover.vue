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
                    !attempted && !identity.email ? 'ERROR: REQUIRED _' : 'REGISTERED_EMAIL'
                "
                :class="[
                    'w-full bg-transparent border-b py-5 text-[14px] uppercase tracking-[0.5em] outline-none transition-all duration-700 focus:placeholder:text-blue-300/30',
                    !attempted && !identity.email
                        ? 'text-rose-500 border-rose-500/40 placeholder-rose-500/40'
                        : 'text-blue-100 border-blue-500/20 placeholder-blue-400/30 focus:border-blue-400',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.email
                        ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                        : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                ]"></div>
        </div>

        <div class="space-y-10">
            <ButtonAction
                action="RECOVER"
                skeleton="SENDING..."
                :pending="pending"
                bgColor="border-rose-400/15 bg-rose-400/[0.03] hover:bg-rose-400/10 hover:border-rose-300/40"
                textColor="text-rose-300/60 group-hover/btn:text-rose-100" />

            <RouterLink
                :to="{ name: 'identify' }"
                class="flex items-center justify-center py-4 border border-blue-500/10 bg-blue-950/20 text-[10px] font-bold tracking-[0.3em] text-blue-400/40 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-500">
                BACK TO IDENTIFY
            </RouterLink>
        </div>
    </form>
</template>

<style scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

input:focus {
    text-shadow: 0 0 10px
        v-bind('!attempted ? "rgba(244, 63, 94, 0.3)" : "rgba(59, 130, 246, 0.3)"');
}
</style>

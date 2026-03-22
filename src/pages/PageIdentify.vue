<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { ref } from 'vue';

const identity = ref({
    userId: '',
    passKey: '',
});

const attempted = ref(true);
const pending = ref(false);

const handleIdentify = () => {
    if (!identity.value.userId || !identity.value.passKey) {
        attempted.value = false;
        return;
    }
};
</script>

<template>
    <form @submit.prevent="handleIdentify" class="space-y-14 text-left uppercase">
        <div class="group/input relative">
            <input
                v-model="identity.userId"
                type="text"
                spellcheck="false"
                @input="attempted = true"
                :placeholder="!attempted && !identity.userId ? 'REQUIRED _' : 'USER_IDENTIFIER'"
                :class="[
                    'w-full bg-transparent border-b py-5 text-[14px] uppercase tracking-[0.5em] outline-none transition-all duration-700 focus:placeholder:text-blue-300/30',
                    !attempted && !identity.userId
                        ? 'text-rose-500 border-rose-500/40 placeholder-rose-500/40'
                        : 'text-blue-100 border-blue-500/20 placeholder-blue-400/30 focus:border-blue-400',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.userId
                        ? 'bg-rose-500'
                        : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                ]"></div>
        </div>

        <div class="group/input relative">
            <input
                v-model="identity.passKey"
                type="password"
                @input="attempted = true"
                :placeholder="!attempted && !identity.passKey ? 'REQUIRED _' : 'SECURITY_KEY'"
                :class="[
                    'w-full bg-transparent border-b py-5 text-[14px] tracking-[0.5em] outline-none transition-all duration-700 focus:placeholder:text-blue-300/30',
                    !attempted && !identity.passKey
                        ? 'text-rose-500 border-rose-500/40 placeholder-rose-500/40'
                        : 'text-blue-100 border-blue-500/20 placeholder-blue-400/30 focus:border-blue-400',
                ]" />
            <div
                class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                :class="[
                    !attempted && !identity.passKey
                        ? 'bg-rose-500'
                        : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                ]"></div>
        </div>

        <div class="space-y-12">
            <ButtonAction
                action="IDENTIFY"
                skeleton="PROCESSING..."
                :pending="pending"
                bgColor="border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400"
                textColor="text-blue-400 group-hover/btn:text-blue-100" />

            <div class="grid grid-cols-2 gap-6">
                <RouterLink
                    :to="{ name: 'recover' }"
                    class="flex items-center justify-center py-4 border border-blue-500/10 bg-blue-950/20 text-[10px] font-bold tracking-[0.3em] text-blue-400/40 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-500">
                    RECOVER_KEY
                </RouterLink>

                <RouterLink
                    :to="{ name: 'initialize' }"
                    class="flex items-center justify-center py-4 border border-blue-500/10 bg-blue-950/20 text-[10px] font-bold tracking-[0.3em] text-blue-400/40 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-500">
                    INITIALIZE
                </RouterLink>
            </div>
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

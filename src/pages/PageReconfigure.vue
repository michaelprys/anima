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
                        !attempted && !identity.passKey ? 'ERROR: REQUIRED _' : 'NEW_SECURITY_KEY'
                    "
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
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
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
                        'w-full bg-transparent border-b py-5 text-[14px] tracking-[0.5em] outline-none transition-all duration-700 focus:placeholder:text-blue-300/30',
                        !attempted && (!identity.confirmPassKey || !isMatch)
                            ? 'text-rose-500 border-rose-500/40 placeholder-rose-500/40'
                            : 'text-blue-100 border-blue-500/20 placeholder-blue-400/30 focus:border-blue-400',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && (!identity.confirmPassKey || !isMatch)
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                    ]"></div>
            </div>
        </div>

        <div class="space-y-10">
            <ButtonAction
                action="RECONFIGURE"
                skeleton="UPDATING..."
                :pending="pending"
                bgColor="border-orange-400/15 bg-orange-400/[0.03] hover:bg-orange-400/10 hover:border-orange-300/40"
                textColor="text-orange-300/60 group-hover/btn:text-orange-100" />

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

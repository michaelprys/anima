<script setup>
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { ref, computed } from 'vue';
import { useStoreAuth } from '@/stores/auth.store';

const storeAuth = useStoreAuth();

const identity = ref({
    userIdentifier: '',
    email: '',
    passKey: '',
    confirmPassKey: '',
});

const attempted = ref(true);
const pending = ref(false);

const isPasswordMatch = computed(() => {
    return identity.value.passKey === identity.value.confirmPassKey;
});

const handleInitialize = async () => {
    const { userIdentifier, email, passKey, confirmPassKey } = identity.value;
    const isFilled = userIdentifier && email && passKey && confirmPassKey;

    if (!isFilled || !isPasswordMatch.value) {
        attempted.value = false;
        return;
    }

    pending.value = true;

    try {
        await storeAuth.initialize({
            userIdentifier,
            email,
            passKey,
        });
    } catch (error) {
        console.error(error);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleInitialize" class="space-y-10 text-left uppercase">
        <div class="space-y-4">
            <div class="group/input relative">
                <input
                    v-model="identity.userIdentifier"
                    type="text"
                    spellcheck="false"
                    @input="attempted = true"
                    placeholder="USER_IDENTIFIER"
                    :class="[
                        'w-full bg-transparent border-b py-3 text-[13px] uppercase tracking-[0.4em] outline-none transition-all duration-700 placeholder:text-blue-400/30 focus:placeholder:text-blue-300/30',
                        !attempted && !identity.userIdentifier
                            ? 'text-rose-500 border-rose-500/40 focus:border-rose-500'
                            : 'text-blue-100 border-blue-500/20 focus:border-blue-400',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && !identity.userIdentifier
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                    ]"></div>
            </div>

            <div class="group/input relative">
                <input
                    v-model="identity.email"
                    type="email"
                    spellcheck="false"
                    @input="attempted = true"
                    placeholder="EMAIL_ADDRESS"
                    :class="[
                        'w-full bg-transparent border-b py-3 text-[13px] uppercase tracking-[0.4em] outline-none transition-all duration-700 placeholder:text-blue-400/30 focus:placeholder:text-blue-300/30',
                        !attempted && !identity.email
                            ? 'text-rose-500 border-rose-500/40 focus:border-rose-500'
                            : 'text-blue-100 border-blue-500/20 focus:border-blue-400',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && !identity.email
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                    ]"></div>
            </div>

            <div class="group/input relative">
                <input
                    v-model="identity.passKey"
                    type="password"
                    @input="attempted = true"
                    placeholder="SECURITY_KEY"
                    :class="[
                        'w-full bg-transparent border-b py-3 text-[13px] tracking-[0.4em] outline-none transition-all duration-700 placeholder:text-blue-400/30 focus:placeholder:text-blue-300/30',
                        !attempted && !identity.passKey
                            ? 'text-rose-500 border-rose-500/40 focus:border-rose-500'
                            : 'text-blue-100 border-blue-500/20 focus:border-blue-400',
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
                    placeholder="CONFIRM_KEY"
                    :class="[
                        'w-full bg-transparent border-b py-3 text-[13px] tracking-[0.4em] outline-none transition-all duration-700 placeholder:text-blue-400/30 focus:placeholder:text-blue-300/30',
                        !attempted && (!identity.confirmPassKey || !isPasswordMatch)
                            ? 'text-rose-500 border-rose-500/40 focus:border-rose-500'
                            : 'text-blue-100 border-blue-500/20 focus:border-blue-400',
                    ]" />
                <div
                    class="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-focus-within/input:w-full"
                    :class="[
                        !attempted && (!identity.confirmPassKey || !isPasswordMatch)
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
                    ]"></div>
            </div>
        </div>

        <div class="space-y-8 pt-2">
            <ButtonAction
                action="INITIALIZE"
                skeleton="PROCESSING..."
                :pending="pending"
                bgColor="border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 hover:border-teal-400/50"
                textColor="text-teal-300/60 group-hover/btn:text-teal-100" />

            <div class="grid grid-cols-2 gap-6">
                <RouterLink
                    :to="{ name: 'recover' }"
                    class="flex items-center justify-center py-3 border border-blue-500/10 bg-blue-950/20 text-[9px] font-bold tracking-[0.2em] text-blue-400/40 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-500">
                    RECOVER_KEY
                </RouterLink>

                <RouterLink
                    :to="{ name: 'identify' }"
                    class="flex items-center justify-center py-3 border border-blue-500/10 bg-blue-950/20 text-[9px] font-bold tracking-[0.2em] text-blue-400/40 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-500">
                    BACK TO IDENTIFY
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

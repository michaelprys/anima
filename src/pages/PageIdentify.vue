<script setup>
import BasePasswordVisibility from '@/components/base/BasePasswordVisibility.vue';
import { formatSystemError } from '@/utils/formatSystemError.utils.js';
import BaseAuthInput from '@/components/base/BaseAuthInput.vue';
import { useValidation } from '@/composables/useValidation.js';
import ButtonAction from '@/components/auth/ButtonAction.vue';
import { useToast } from '@/composables/useToast.js';
import { useStoreAuth } from '@/stores/auth.store';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

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
const pendingGuest = ref(false);
const nextPath = route.query.next || { name: 'fragments' };
const { validationError, validate } = useValidation();

const handleIdentify = async () => {
    attempted.value = false;
    if (!identity.value.email || !identity.value.passKey) return;

    const isValid = validate({ email: identity.value.email, passKey: identity.value.passKey });
    if (!isValid) return;

    pending.value = true;
    try {
        await storeAuth.identify(identity.value);
        showToast('ACCESS_GRANTED', 'success');
        await router.push(nextPath);
    } catch (error) {
        showToast(formatSystemError(error), 'error');
    } finally {
        pending.value = false;
    }
};

const handleGuestEntry = async () => {
    if (pendingGuest.value) return;
    pendingGuest.value = true;
    try {
        await storeAuth.identifyAsGuest();
        showToast('TEMPORARY_ACCESS_GRANTED', 'success');
        await router.push(nextPath);
    } catch (error) {
        showToast(error || 'PROTOCOL_BYPASS_FAILED', 'error');
    } finally {
        pendingGuest.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleIdentify" class="space-y-10 text-left uppercase">
        <BaseAuthInput
            v-model="identity.email"
            placeholder="EMAIL_ADDRESS"
            :error="!identity.email ? 'REQUIRED_EMAIL' : validationError"
            :show-error="!attempted && (!identity.email || (validationError && !pending))"
            @input="attempted = true" />

        <BaseAuthInput
            v-model="identity.passKey"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="SECURITY_KEY"
            error="REQUIRED_KEY"
            :show-error="!attempted && !identity.passKey"
            @input="attempted = true">
            <BasePasswordVisibility v-model="passwordVisible" />
        </BaseAuthInput>

        <button
            type="button"
            @click="handleGuestEntry"
            :disabled="pendingGuest"
            class="group/guest relative flex w-full items-center justify-between overflow-hidden border border-emerald-500/20 bg-emerald-500/5 px-6 py-4 transition-all duration-500 hover:border-emerald-400/50 hover:bg-emerald-500/10 active:scale-[0.99]">
            <div v-if="pendingGuest" class="absolute inset-0 z-0">
                <div
                    class="animate-fast-shimmer absolute inset-y-0 w-1/2 skew-x-[-25deg] bg-linear-to-r from-transparent via-emerald-400/25 to-transparent blur-xl"></div>
                <div class="absolute inset-0 bg-emerald-500/10"></div>
            </div>
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]"></div>
            <div class="relative flex h-10 w-10 items-center justify-center">
                <div
                    class="absolute inset-0 animate-pulse rounded-full border border-emerald-500/20"></div>
                <div
                    class="relative flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/30 bg-black/40">
                    <div
                        class="animate-eye-move relative flex h-3 w-3 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-950/40">
                        <div
                            class="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)]"></div>
                        <div
                            class="absolute -top-0.5 -right-0.5 h-1 w-1 rounded-full bg-white/20 blur-[1px]"></div>
                    </div>
                </div>
            </div>
            <span
                class="relative z-10 text-[0.7rem] font-black tracking-[0.8em] text-emerald-400/80 transition-colors group-hover:text-emerald-300">
                GUEST_ENTRY
            </span>
            <div class="flex gap-1.5">
                <div
                    v-for="i in 3"
                    :key="i"
                    :class="[
                        'h-1 w-1 rounded-full transition-all duration-300',
                        pendingGuest
                            ? 'animate-ping bg-emerald-400'
                            : 'bg-emerald-500/20 group-hover:bg-emerald-400',
                    ]"
                    :style="pendingGuest ? { animationDelay: `${(i - 1) * 0.1}s` } : {}"></div>
            </div>
            <div
                class="absolute top-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-700 group-hover:w-full"></div>
            <div
                class="absolute right-0 bottom-0 h-px w-0 bg-emerald-400 transition-all duration-700 group-hover:w-full"></div>
            <div
                v-if="pendingGuest"
                class="animate-fill-bar-fast absolute bottom-0 left-0 h-0.5 w-full origin-left bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_rgba(52,211,153,1)]"></div>
        </button>

        <div class="space-y-8">
            <ButtonAction
                action="IDENTIFY"
                skeleton="PROCESS"
                :pending="pending"
                bg-color="border-blue-system/30 bg-blue-system/5 hover:bg-blue-system/10 hover:border-blue-light"
                text-color="text-blue-light group-hover/btn:text-white" />
            <div class="grid grid-cols-2 gap-4">
                <RouterLink
                    :to="{ name: 'recover' }"
                    class="border-blue-system/10 bg-blue-system/5 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-3 text-[0.625rem] font-bold tracking-[0.3em] uppercase transition-all duration-500">
                    Recover_Key
                </RouterLink>
                <RouterLink
                    :to="{ name: 'initialize' }"
                    class="border-blue-system/10 bg-blue-system/5 text-blue-system/40 hover:border-blue-system/30 hover:bg-blue-system/5 hover:text-blue-light flex items-center justify-center border py-3 text-[0.625rem] font-bold tracking-[0.3em] uppercase transition-all duration-500">
                    Initialize
                </RouterLink>
            </div>
        </div>
    </form>
</template>

<style scoped>
@keyframes eye-move {
    0%,
    100% {
        transform: translate(0, 0);
    }
    20% {
        transform: translate(-2px, 1px);
    }
    40% {
        transform: translate(2px, -1px);
    }
    60% {
        transform: translate(-1px, -2px);
    }
    80% {
        transform: translate(1px, 2px);
    }
}
@keyframes fast-shimmer {
    0% {
        transform: translateX(-150%) skewX(-25deg);
    }
    100% {
        transform: translateX(250%) skewX(-25deg);
    }
}
@keyframes fill-bar-fast {
    0% {
        transform: scaleX(0);
        opacity: 0.5;
    }
    100% {
        transform: scaleX(1);
        opacity: 1;
    }
}
.animate-eye-move {
    animation: eye-move 4s ease-in-out infinite;
}
.animate-fast-shimmer {
    animation: fast-shimmer 0.8s linear infinite;
}
.animate-fill-bar-fast {
    animation: fill-bar-fast 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>

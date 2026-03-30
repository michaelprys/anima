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
            class="group/guest relative flex w-full items-center justify-between overflow-hidden border border-emerald-500/20 bg-emerald-950/40 px-6 py-3.5 transition-all duration-700 hover:border-emerald-400/60 active:scale-[0.98]">
            <div class="absolute inset-0 z-0">
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover/guest:opacity-100"></div>
                <div class="grid-bg absolute inset-0 opacity-[0.03]"></div>
                <div class="scanline absolute inset-0 opacity-10"></div>
            </div>

            <div class="relative flex flex-1 items-center gap-6">
                <div class="relative flex h-12 w-12 shrink-0 items-center justify-center">
                    <div
                        class="absolute inset-0 rounded-full border border-emerald-500/10 bg-emerald-500/5 transition-colors group-hover/guest:bg-emerald-500/10"></div>
                    <div
                        class="animate-spin-slow absolute inset-[-4px] rounded-full border border-dashed border-emerald-500/20"></div>

                    <div
                        class="relative flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/40 bg-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover/guest:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                        <div
                            class="animate-portal-eye relative flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)] transition-transform duration-300 group-hover/guest:scale-125 group-hover/guest:!animate-none">
                            <div
                                class="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"></div>
                        </div>
                        <div
                            class="absolute inset-0 scale-75 animate-ping rounded-full border border-emerald-400/40"
                            :class="
                                pendingGuest
                                    ? 'animate-ping-intense'
                                    : 'group-hover/guest:animate-ping-fast'
                            "></div>
                    </div>
                </div>

                <div class="flex flex-col items-start gap-1 overflow-hidden">
                    <span
                        class="group-hover/guest:animate-glitch relative block text-[0.75rem] font-black tracking-[0.6em] text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all group-hover/guest:text-emerald-200">
                        GUEST_ENTRY
                    </span>

                    <div class="relative h-3 w-full overflow-hidden">
                        <span
                            class="absolute inset-0 text-[0.4rem] tracking-[0.3em] text-emerald-500/40 transition-transform duration-300 group-hover/guest:-translate-y-full">
                            APERTURE_LINK_v2.0
                        </span>
                        <span
                            class="group-hover/guest:animate-glitch absolute inset-0 translate-y-full text-[0.45rem] font-bold tracking-[0.4em] text-emerald-300 transition-transform duration-300 group-hover/guest:translate-y-0">
                            GUEST_DETECTED_
                        </span>
                    </div>
                </div>
            </div>

            <div class="relative ml-4 flex shrink-0 flex-col items-end gap-1.5">
                <div class="flex gap-1.5">
                    <div
                        v-for="i in 4"
                        :key="i"
                        :class="[
                            'h-3 w-1.5 transition-all duration-300',
                            pendingGuest
                                ? 'animate-step-fill bg-emerald-400 shadow-[0_0_10px_#10b981]'
                                : 'bg-emerald-500/10 group-hover/guest:h-4 group-hover/guest:bg-emerald-400/30',
                        ]"
                        :style="pendingGuest ? { animationDelay: `${(i - 1) * 0.15}s` } : {}"></div>
                </div>
                <div
                    class="h-1 w-10 overflow-hidden rounded-full border border-emerald-500/10 bg-emerald-950/60">
                    <div
                        class="h-full bg-emerald-500/40 transition-all duration-1000"
                        :class="
                            pendingGuest
                                ? 'w-full animate-pulse bg-emerald-400'
                                : 'w-1/3 group-hover/guest:w-full group-hover/guest:bg-emerald-400/60'
                        "></div>
                </div>
            </div>

            <div
                class="absolute top-0 left-0 h-1 w-4 border-t-2 border-l-2 border-emerald-400/50"></div>
            <div
                class="absolute top-0 right-0 h-1 w-4 border-t-2 border-r-2 border-emerald-400/50"></div>
            <div
                class="absolute bottom-0 left-0 h-1 w-4 border-b-2 border-l-2 border-emerald-400/50"></div>
            <div
                class="absolute right-0 bottom-0 h-1 w-4 border-r-2 border-b-2 border-emerald-400/50"></div>

            <div
                class="absolute top-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-1000 group-hover/guest:w-full"></div>
            <div
                class="absolute right-0 bottom-0 h-px w-0 bg-emerald-400 transition-all duration-1000 group-hover/guest:w-full"></div>

            <div v-if="pendingGuest" class="absolute bottom-0 left-0 h-1 w-full bg-emerald-950/50">
                <div
                    class="animate-loader-run h-full w-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)]"></div>
            </div>
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
@keyframes portal-eye {
    0%,
    100% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(-2px, 1.5px);
    }
    50% {
        transform: translate(2px, -1px);
    }
    75% {
        transform: translate(-1.5px, -2px);
    }
}

@keyframes glitch {
    0% {
        transform: translate(0);
        text-shadow:
            -2px 0 #10b981,
            2px 0 #34d399;
    }
    25% {
        transform: translate(-2px, 1.5px);
    }
    50% {
        transform: translate(2px, -1px);
    }
    75% {
        transform: translate(-1.5px, 2px);
        text-shadow:
            2px 0 #10b981,
            -2px 0 #34d399;
    }
    100% {
        transform: translate(0);
    }
}

@keyframes step-fill {
    0%,
    20% {
        opacity: 0.1;
        filter: brightness(0.5);
    }
    40%,
    100% {
        opacity: 1;
        filter: brightness(1.5);
    }
}

@keyframes ping-fast {
    0% {
        transform: scale(0.7);
        opacity: 1;
    }
    100% {
        transform: scale(1.4);
        opacity: 0;
    }
}

@keyframes ping-intense {
    0% {
        transform: scale(0.6);
        opacity: 1;
    }
    100% {
        transform: scale(2.5);
        opacity: 0;
    }
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes loader-run {
    0% {
        transform: scaleX(0);
        transform-origin: left;
    }
    50% {
        transform: scaleX(1);
        transform-origin: left;
    }
    51% {
        transform: scaleX(1);
        transform-origin: right;
    }
    100% {
        transform: scaleX(0);
        transform-origin: right;
    }
}

.grid-bg {
    background-image:
        linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px);
    background-size: 10px 10px;
}

.scanline {
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(16, 185, 129, 0.1) 50%,
        transparent 100%
    );
    background-size: 100% 8px;
    animation: scan 4s linear infinite;
}

@keyframes scan {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 0 100%;
    }
}

.animate-portal-eye {
    animation: portal-eye 4s ease-in-out infinite;
}
.animate-glitch {
    animation: glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}
.animate-ping-fast {
    animation: ping-fast 0.4s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.animate-ping-intense {
    animation: ping-intense 0.15s ease-out infinite;
}
.animate-spin-slow {
    animation: spin-slow 8s linear infinite;
}
.animate-loader-run {
    animation: loader-run 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
.animate-step-fill {
    animation: step-fill 0.6s steps(2) infinite;
}
</style>

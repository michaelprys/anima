<script setup>
defineProps({
    active: Boolean,
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'success',
    },
});
</script>

<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="active" class="toast-container pointer-events-none fixed z-9999">
                <div
                    class="border-blue-system/30 bg-base-card/90 relative flex w-full border px-5 py-4 shadow-[0_0_2rem_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <div
                        class="border-blue-light/50 absolute top-0 left-0 h-1 w-1 border-t border-l"></div>
                    <div
                        class="border-blue-light/50 absolute right-0 bottom-0 h-1 w-1 border-r border-b"></div>

                    <div class="flex w-full items-start gap-4">
                        <div class="relative mt-1 h-8 w-0.5 shrink-0 overflow-hidden">
                            <div
                                :class="type === 'success' ? 'bg-cyan-glow' : 'bg-rose-danger'"
                                class="h-full w-full shadow-[0_0_0.625rem_currentColor]"></div>
                            <div
                                class="absolute top-0 left-0 h-2 w-full animate-[scan_2s_linear_infinite] bg-white/80"></div>
                        </div>

                        <div class="flex min-w-0 flex-col">
                            <span
                                class="text-blue-light/40 mb-1 text-[0.5625rem] leading-none font-black tracking-[0.3em] uppercase">
                                {{ type === 'success' ? 'System_Response' : 'System_Alert' }}
                            </span>

                            <span
                                :class="type === 'success' ? 'text-blue-pale' : 'text-rose-danger'"
                                class="font-mono text-[0.625rem] leading-relaxed font-bold tracking-[0.15em] wrap-break-word uppercase">
                                {{ message || '---' }}
                            </span>
                        </div>
                    </div>

                    <div
                        class="bg-blue-system/10 absolute bottom-0 left-0 h-px w-full overflow-hidden">
                        <div
                            :class="type === 'success' ? 'bg-cyan-glow/40' : 'bg-rose-danger/40'"
                            class="animate-toast-progress h-full w-full origin-left"></div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.toast-container {
    top: 2rem;
    left: 50%;
    translate: -50% 0;
    width: min(calc(100% - 2.5rem), 22rem);
}

@media (width >= 48rem) {
    .toast-container {
        top: 8rem;
        right: 2.5rem;
        left: auto;
        translate: 0 0;
        width: 22rem;
    }
}

@keyframes scan {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(500%);
    }
}

@keyframes toast-progress {
    from {
        transform: scaleX(1);
    }
    to {
        transform: scaleX(0);
    }
}

.animate-toast-progress {
    animation: toast-progress 3s linear forwards;
}

.toast-enter-active {
    transition:
        opacity 0.4s cubic-bezier(0.05, 0.7, 0.1, 1),
        transform 0.4s cubic-bezier(0.05, 0.7, 0.1, 1),
        filter 0.4s ease;
}

.toast-leave-active {
    transition:
        opacity 0.3s cubic-bezier(0.3, 0, 0.8, 0.15),
        transform 0.3s cubic-bezier(0.3, 0, 0.8, 0.15),
        filter 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    filter: blur(0.625rem);
    transform: translateY(-1.25rem) skewX(-10deg);
}

.toast-leave-to {
    opacity: 0;
    filter: blur(0.3125rem);
    transform: translateY(-0.625rem) scale(0.95);
}

@media (width >= 48rem) {
    .toast-enter-from {
        transform: translateX(2rem) skewX(-10deg);
    }
    .toast-leave-to {
        transform: translateX(1rem) scale(0.9);
    }
}
</style>

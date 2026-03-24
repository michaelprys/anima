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
            <div
                v-if="active"
                class="pointer-events-none fixed top-32 right-10 z-9999 flex justify-end">
                <div
                    class="border-blue-system/30 bg-base-card/90 relative flex w-fit max-w-[18rem] border px-5 py-4 shadow-[0_0_2rem_rgba(0,0,0,0.5)] backdrop-blur-xl md:max-w-88">
                    <div
                        class="border-blue-light/50 absolute top-0 left-0 h-1 w-1 border-t border-l"></div>
                    <div
                        class="border-blue-light/50 absolute right-0 bottom-0 h-1 w-1 border-r border-b"></div>

                    <div class="flex items-start gap-4">
                        <div class="relative mt-1 h-8 w-0.5 shrink-0 overflow-hidden">
                            <div
                                :class="type === 'success' ? 'bg-cyan-glow' : 'bg-rose-danger'"
                                class="h-full w-full shadow-[0_0_10px_currentColor]"></div>
                            <div
                                class="absolute top-0 left-0 h-2 w-full animate-[scan_2s_linear_infinite] bg-white/80"></div>
                        </div>

                        <div class="flex flex-col">
                            <span
                                class="text-blue-light/40 mb-1.5 text-[9px] leading-none font-black tracking-[0.3em] uppercase">
                                {{ type === 'success' ? 'System_Response' : 'System_Alert' }}
                            </span>

                            <span
                                :class="type === 'success' ? 'text-blue-pale' : 'text-rose-danger'"
                                class="font-mono text-[10px] leading-relaxed font-bold tracking-[0.15em] break-all whitespace-normal uppercase">
                                {{ message || '---' }}
                            </span>
                        </div>
                    </div>

                    <div class="bg-blue-system/10 absolute bottom-0 left-0 h-px w-full">
                        <div
                            :class="type === 'success' ? 'bg-cyan-glow/30' : 'bg-rose-danger/30'"
                            class="animate-toast-progress h-full w-full origin-left"></div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
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
    transition: all 0.4s cubic-bezier(0.05, 0.7, 0.1, 1);
}
.toast-leave-active {
    transition: all 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);
}
.toast-enter-from {
    opacity: 0;
    transform: translateX(30px) skewX(-10deg);
    filter: blur(10px);
}
.toast-leave-to {
    opacity: 0;
    transform: translateX(10px) scaleX(0.9);
    filter: blur(5px);
}
</style>

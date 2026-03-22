<script setup>
defineProps({
    message: {
        type: String,
        default: 'Ignore',
    },
    active: Boolean,
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
                class="border-blue-system/30 bg-base-card/90 fixed top-10 right-10 z-50 flex items-center gap-4 border p-4 shadow-[0_0_1.875rem_rgba(59,130,246,0.1)] backdrop-blur-xl">
                <div
                    :class="type === 'success' ? 'bg-blue-system' : 'bg-rose-danger'"
                    class="h-10 w-0.5 shadow-[0_0_0.625rem_currentColor]"></div>

                <div class="flex flex-col pr-8">
                    <span class="text-blue-system/50 text-[0.5rem] tracking-[0.3em] uppercase">
                        System_Notification
                    </span>
                    <span
                        :class="type === 'success' ? 'text-blue-system' : 'text-rose-danger'"
                        class="font-mono text-[0.6875rem] font-bold tracking-[0.4em] uppercase">
                        {{ message }}
                    </span>
                </div>

                <div
                    class="border-blue-system/40 absolute top-0 right-0 h-2 w-2 border-t border-r"></div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
    opacity: 0;
    transform: translateX(1.875rem) scaleX(0);
    filter: blur(0.625rem);
}
.toast-leave-to {
    opacity: 0;
    transform: translateY(-1.25rem);
    filter: blur(0.3125rem);
}
</style>

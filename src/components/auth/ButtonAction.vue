<script setup>
defineProps({
    action: {
        type: String,
        required: true,
    },
    skeleton: {
        type: String,
        default: 'LOADING...',
    },
    pending: {
        type: Boolean,
        default: false,
    },
    bgColor: {
        type: String,
        default: '',
    },
    textColor: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <button
        type="submit"
        :disabled="pending"
        :class="[
            'w-full py-6 border transition-all duration-700 active:scale-[0.99] group/btn overflow-hidden relative cursor-pointer outline-none font-bold tracking-[1em]',
            bgColor,
        ]">
        <span
            :class="[
                'relative z-10 text-[12px]  transition-colors drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]',
                textColor,
            ]">
            {{ pending ? skeleton : action }}
        </span>
        <span
            class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_3s_infinite]"></span>
    </button>
</template>

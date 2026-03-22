<script setup>
defineProps({
    action: {
        type: String,
        required: true,
    },
    skeleton: {
        type: String,
        default: 'LOADING',
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
            'group/btn relative w-full overflow-hidden border py-6 font-bold tracking-[1em] transition-all duration-700 outline-none active:scale-[0.99]',
            bgColor,
        ]">
        <span
            :class="[
                'relative z-10 text-xs drop-shadow-[0_0_0.625rem_rgba(59,130,246,0.5)] transition-colors',
                textColor,
            ]">
            <div v-if="pending" class="flex items-baseline justify-center">
                <span>{{ skeleton }}</span>
                <div class="ml-1 flex *:animate-[pulse_0.2s_infinite]">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </div>

            <div v-else>{{ action }}</div>
        </span>
        <span
            class="via-blue-system/10 absolute inset-0 h-full w-full -translate-x-full bg-linear-to-r from-transparent to-transparent group-hover/btn:animate-[shimmer_3s_infinite]"></span>
    </button>
</template>

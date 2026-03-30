<script setup>
defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    showError: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['update:modelValue', 'input']);
</script>

<template>
    <div class="group/input relative w-full">
        <div
            v-if="showError && error"
            class="text-rose-danger absolute -top-5 left-0 animate-pulse text-[10px] font-bold tracking-[0.2em]">
            [!] {{ error }}
        </div>
        <input
            :value="modelValue"
            :type="type"
            spellcheck="false"
            @input="
                $emit('update:modelValue', $event.target.value);
                $emit('input');
            "
            :placeholder="placeholder"
            :class="[
                'auth-input focus:placeholder:text-blue-light/30 w-full border-b bg-transparent py-4 text-[0.875rem] tracking-[0.5em] uppercase transition-all duration-700 outline-none',
                showError
                    ? 'border-rose-danger text-rose-danger placeholder-rose-danger/40'
                    : 'border-blue-system/20 text-blue-pale placeholder-blue-light/30 focus:border-blue-light',
            ]" />
        <div
            class="absolute bottom-0 left-0 h-0.5 transition-all duration-700 group-focus-within/input:w-full"
            :class="[
                showError ? 'bg-rose-danger w-full' : 'bg-blue-light shadow-glow-blue w-0',
            ]"></div>
        <slot />
    </div>
</template>

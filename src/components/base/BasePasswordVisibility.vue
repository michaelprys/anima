<script setup>
const modelValue = defineModel({ type: Boolean });
</script>

<template>
    <button
        @click.prevent="modelValue = !modelValue"
        id="show-password"
        class="text-blue-system/40 hover:text-blue-light absolute top-1/2 -right-7 -translate-1/2 cursor-pointer text-xs transition-colors">
        [ {{ modelValue ? 'hide' : 'show' }} ]
    </button>
</template>

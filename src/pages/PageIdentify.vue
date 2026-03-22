<script setup>
import { ref } from 'vue';

const identity = ref({
    userId: '',
    passKey: '',
});
</script>

<template>
    <form @submit.prevent class="space-y-12 text-left uppercase">
        <div class="group/input relative">
            <input
                v-model="identity.userId"
                type="text"
                spellcheck="false"
                placeholder="USER_IDENTIFIER"
                class="w-full bg-transparent border-b border-white/10 py-4 text-[13px] uppercase tracking-[0.4em] text-slate-100 outline-none focus:border-cyan-400 transition-all duration-500 placeholder:text-slate-400 focus:placeholder:text-slate-300" />
            <div
                class="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-500 group-focus-within/input:w-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        <div class="group/input relative">
            <input
                v-model="identity.passKey"
                type="password"
                placeholder="SECURITY_KEY"
                class="w-full bg-transparent border-b border-white/10 py-4 text-[13px] tracking-[0.4em] text-slate-100 outline-none focus:border-cyan-400 transition-all duration-500 placeholder:text-slate-400 focus:placeholder:text-slate-300" />
            <div
                class="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-500 group-focus-within/input:w-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        <button
            class="w-full py-5 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-500 active:scale-[0.98] group/btn overflow-hidden relative cursor-pointer outline-none font-black tracking-[0.8em]">
            <span
                class="relative z-10 text-[11px] text-cyan-500 group-hover/btn:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                IDENTIFY
            </span>
            <span
                class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></span>
        </button>
    </form>
</template>

<style scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.terminal-in-enter-active {
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.terminal-in-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
    filter: blur(10px);
}

input:focus {
    text-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
}
</style>

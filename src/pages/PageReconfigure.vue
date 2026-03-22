<script setup>
import { ref } from 'vue';

const identity = ref({
    passKey: '',
    confirmPassKey: '',
});
</script>

<template>
    <form @submit.prevent class="space-y-12 text-left uppercase">
        <div class="space-y-12">
            <div class="group/input relative">
                <input
                    v-model="identity.passKey"
                    type="password"
                    placeholder="NEW_SECURITY_KEY"
                    class="w-full bg-transparent border-b border-white/10 py-4 text-[13px] tracking-[0.4em] text-slate-100 outline-none focus:border-amber-400 transition-all duration-500 placeholder:text-slate-400 focus:placeholder:text-slate-300" />
                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-500 group-focus-within/input:w-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
            </div>

            <div class="group/input relative">
                <input
                    v-model="identity.confirmPassKey"
                    type="password"
                    placeholder="CONFIRM_NEW_KEY"
                    class="w-full bg-transparent border-b border-white/10 py-4 text-[13px] tracking-[0.4em] text-slate-100 outline-none focus:border-amber-400 transition-all duration-500 placeholder:text-slate-400 focus:placeholder:text-slate-300" />
                <div
                    class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-500 group-focus-within/input:w-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
            </div>
        </div>

        <div class="space-y-10">
            <button
                class="w-full py-5 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-500 active:scale-[0.98] group/btn overflow-hidden relative cursor-pointer outline-none font-black tracking-[0.8em]">
                <span
                    class="relative z-10 text-[11px] text-amber-500 group-hover/btn:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                    RECONFIGURE
                </span>
                <span
                    class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></span>
            </button>

            <RouterLink
                :to="{ name: 'identify' }"
                class="flex items-center justify-center py-3 bg-cyan-500/10 text-[9px] font-black tracking-[0.2em] text-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/15 transition-all duration-500">
                BACK TO IDENTIFY
            </RouterLink>
        </div>
    </form>
</template>

<style scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

input:focus {
    text-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}
</style>

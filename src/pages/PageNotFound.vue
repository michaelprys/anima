<script setup>
import { useEsc } from '@/composables/useEsc';
import { useRouter } from 'vue-router';

const router = useRouter();

useEsc();
</script>

<template>
    <div
        class="fixed inset-0 z-1000 flex items-center justify-center overflow-hidden bg-black p-6 font-mono select-none">
        <div
            class="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,2px_100%] opacity-[0.03]"></div>

        <div
            class="border-rose-danger/10 bg-canvas/20 shadow-terminal-deep relative flex w-full max-w-160 flex-col items-center border py-24 backdrop-blur-sm">
            <div class="bg-rose-danger/30 absolute -top-px -left-px h-12 w-px"></div>
            <div class="bg-rose-danger/30 absolute -top-px -left-px h-px w-12"></div>
            <div class="bg-rose-danger/30 absolute -right-px -bottom-px h-12 w-px"></div>
            <div class="bg-rose-danger/30 absolute -right-px -bottom-px h-px w-12"></div>

            <div class="relative flex h-56 w-56 items-center justify-center">
                <div
                    class="border-rose-danger/5 absolute inset-0 animate-[ping_8s_infinite] rounded-full border"></div>

                <div
                    class="relative flex h-44 w-44 items-center justify-center rounded-full border border-rose-950/30 bg-black shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
                    <div
                        class="animate-scanner relative flex h-16 w-16 items-center justify-center rounded-full border border-rose-600/10 bg-rose-950/5 transition-all duration-75">
                        <div
                            class="h-4 w-4 rounded-full bg-rose-700 shadow-[0_0_25px_6px_#be123c]"></div>
                        <div
                            class="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-white/5 blur-[0.03125rem]"></div>
                        <div
                            class="absolute inset-0 animate-pulse rounded-full border border-rose-500/10"></div>
                    </div>
                </div>
            </div>

            <div class="mt-20 space-y-12 text-center">
                <div class="space-y-4">
                    <h1
                        class="text-rose-danger mr-[-0.6em] animate-pulse text-2xl font-black tracking-[0.6em] uppercase">
                        Violation
                    </h1>
                    <p
                        class="mr-[-0.4em] text-[0.625rem] font-bold tracking-[0.4em] text-slate-700 uppercase">
                        Anima_Protocol_Restricted_Area
                    </p>
                </div>

                <nav class="flex flex-col items-center gap-8 pt-4">
                    <button
                        @click="router.push('/')"
                        class="group relative flex items-center justify-center px-12 py-3 transition-all">
                        <span
                            class="text-rose-danger group-hover:text-rose-light mr-[-0.8em] text-[0.7rem] font-black tracking-[0.8em] uppercase transition-colors">
                            Abort
                        </span>
                        <div
                            class="border-rose-danger/10 group-hover:border-rose-danger/30 absolute inset-0 border transition-all"></div>
                    </button>

                    <button
                        @click="router.back()"
                        class="mr-[-0.6em] text-[0.5rem] font-bold tracking-[0.6em] text-slate-800 uppercase transition-colors hover:text-slate-600">
                        Return_Previous_State
                    </button>
                </nav>
            </div>

            <footer class="mt-20 flex flex-col items-center gap-4 opacity-10">
                <div class="flex items-center gap-6">
                    <span class="bg-rose-danger h-px w-10"></span>
                    <span
                        class="text-rose-danger mr-[-1.5em] text-[0.4rem] tracking-[1.5em] uppercase">
                        Watching
                    </span>
                    <span class="bg-rose-danger h-px w-10"></span>
                </div>
                <div class="text-[0.45rem] tracking-[0.4em] text-slate-500 uppercase">
                    [ Press_ESC_to_Exit ]
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped>
@keyframes scanner {
    0%,
    20%,
    45%,
    70%,
    100% {
        transform: translate(0, 0);
    }
    22% {
        transform: translate(-1.375rem, 0.5rem);
    }
    24% {
        transform: translate(-1.375rem, 0.5rem);
    }
    26% {
        transform: translate(1.25rem, -0.75rem);
    }
    28% {
        transform: translate(1.25rem, -0.75rem);
    }
    47% {
        transform: translate(0, 1.125rem);
    }
    50% {
        transform: translate(0, 1.125rem);
    }
    72% {
        transform: translate(-0.625rem, -1.25rem);
    }
    75% {
        transform: translate(-0.625rem, -1.25rem);
    }
    77% {
        transform: translate(1.375rem, 0.375rem);
    }
    80% {
        transform: translate(0, 0);
    }
}

.animate-scanner {
    animation: scanner 7s ease-in-out infinite;
}

h1 {
    text-shadow: 0 0 0.9375rem rgba(255, 32, 86, 0.4);
}
</style>

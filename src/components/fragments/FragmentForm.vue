<script setup>
import { useStoreFragments } from '@/stores/fragments.store';
import { useToast } from '@/composables/useToast.js';
import { useTemplateRef, reactive, ref } from 'vue';

const storeFragments = useStoreFragments();
const { showToast } = useToast();

const newFragment = reactive({
    title: '',
    thought: '',
});

const attempted = ref(true);
const thoughtRef = useTemplateRef('thoughtRef');
const pending = ref(false);

const handleAddFragment = async () => {
    if (!newFragment.title || !newFragment.thought) {
        attempted.value = false;

        return;
    }

    const payload = { ...newFragment };
    Object.assign(newFragment, { title: '', thought: '' });
    thoughtRef.value?.focus();

    pending.value = true;
    try {
        await storeFragments.addFragment(payload);
    } catch (error) {
        showToast(error || 'ERROR_CREATING_FRAGMENT_');
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <div class="mx-auto mb-24 max-w-4xl">
        <div class="group relative">
            <div
                class="from-cyan-glow/15 to-blue-system/15 absolute -inset-1 bg-linear-to-r opacity-0 blur-2xl transition-opacity duration-1000 group-focus-within:opacity-100"></div>

            <form
                @submit.prevent="handleAddFragment"
                @keydown.ctrl.enter="handleAddFragment"
                @focusout="attempted = true"
                class="focus-within:border-cyan-glow/30 bg-base-panel/40 relative overflow-hidden rounded-sm border border-white/10 p-6 backdrop-blur-3xl transition-all duration-500 md:p-8">
                <input
                    v-model="newFragment.title"
                    maxLength="40"
                    type="text"
                    :placeholder="attempted || newFragment.title ? '> TITLE' : 'REQUIRED_TITLE _'"
                    @input="attempted = true"
                    :class="[
                        'mb-2 w-full border-none bg-transparent font-mono text-lg font-black tracking-[0.5em] uppercase transition-all duration-500 focus:ring-0 focus:outline-none',
                        attempted || newFragment.title
                            ? 'text-cyan-glow placeholder-cyan-glow/20'
                            : 'text-rose-danger placeholder-rose-danger/40 animate-pulse',
                    ]" />

                <div class="mb-6 h-px w-12 bg-white/5"></div>

                <textarea
                    v-model="newFragment.thought"
                    maxLength="1000"
                    ref="thoughtRef"
                    :placeholder="
                        attempted || newFragment.thought ? 'I_AM_LISTENING...' : 'REQUIRED_INPUT _'
                    "
                    rows="5"
                    @input="attempted = true"
                    :class="[
                        'mb-6 w-full resize-none border-none bg-transparent font-mono text-sm leading-relaxed tracking-[0.3em] uppercase transition-colors focus:ring-0 focus:outline-none',
                        attempted || newFragment.thought
                            ? 'text-slate-300 placeholder-slate-600'
                            : 'text-rose-danger placeholder-rose-danger/40 animate-pulse',
                    ]"></textarea>

                <div
                    class="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                    <div class="flex flex-wrap gap-x-4 gap-y-2">
                        <span
                            class="text-[0.5625rem] font-bold tracking-[0.3em] whitespace-nowrap text-slate-400 uppercase">
                            Encrypted
                        </span>
                        <span
                            class="text-cyan-glow/60 animate-pulse text-[0.5625rem] font-bold tracking-[0.3em] whitespace-nowrap uppercase">
                            Buffer active
                        </span>
                    </div>

                    <button
                        type="submit"
                        :disabled="pending"
                        class="group/btn border-cyan-glow/40 text-cyan-glow relative h-10 w-full overflow-hidden rounded-xs border px-10 text-[0.625rem] font-black tracking-[0.4em] uppercase transition-all duration-300 disabled:cursor-default sm:w-44">
                        <div class="relative z-20 flex h-full items-center justify-center">
                            <span
                                class="transition-opacity duration-500"
                                :class="{ 'opacity-20': pending }">
                                COMMIT
                            </span>
                        </div>

                        <Transition name="fade-loader">
                            <div v-if="pending" class="pointer-events-none absolute inset-0 z-10">
                                <div class="bg-cyan-glow/5 absolute inset-0"></div>
                                <div class="infinite-flow absolute inset-0"></div>
                                <div
                                    class="bg-cyan-glow/30 absolute bottom-0 left-0 h-[1px] w-full animate-pulse"></div>
                            </div>
                        </Transition>

                        <div
                            class="bg-cyan-glow absolute inset-0 translate-y-full opacity-5 transition-transform duration-500 group-hover/btn:translate-y-0"></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.infinite-flow {
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(34, 211, 238, 0) 30%,
        rgba(34, 211, 238, 0.2) 50%,
        rgba(34, 211, 238, 0) 70%,
        transparent 100%
    );
    background-size: 200% 100%;
    animation: flow-right 2s linear infinite;
}

@keyframes flow-right {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.fade-loader-leave-active {
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-loader-leave-to {
    opacity: 0;
}

button:active:not(:disabled) {
    transform: scale(0.97);
}

button:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-cyan-glow) 5%, transparent);
    border-color: var(--color-cyan-glow);
    box-shadow: 0 0 30px rgba(34, 211, 238, 0.1);
}
</style>

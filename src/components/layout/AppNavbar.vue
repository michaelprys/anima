<script setup>
import { delay } from '@/utils/delay.utils';
import { ref } from 'vue';
import { useOnlineStatus } from '@/composables/useOnlineStatus.js';
import { useRoute, useRouter } from 'vue-router';
import { useStoreAuth } from '@/stores/auth.store';

const storeAuth = useStoreAuth();
const { online } = useOnlineStatus();
const route = useRoute(),
    router = useRouter();

const isOpen = ref(false);
const pending = ref(false);

const handleDisconnect = async () => {
    pending.value = true;

    try {
        await storeAuth.disconnect();

        await delay(1000);
        await router.push({ name: 'identify' });
    } catch (error) {
        console.error(error.message);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <nav
        v-if="route.matched.length > 0 && route.meta.hasNavbar !== false"
        class="bg-base-panel/80 sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
        <div class="container mx-auto px-6 py-3 md:flex md:items-center md:justify-between">
            <div class="flex items-center justify-between">
                <RouterLink
                    :to="{ name: 'fragments' }"
                    class="group relative flex shrink-0 cursor-default! items-center gap-4 py-2">
                    <div class="relative flex h-4 w-4 items-center justify-center">
                        <div
                            class="absolute inset-0 rounded-full blur-md transition-colors duration-700 ease-in-out"
                            :class="
                                online
                                    ? 'bg-cyan-glow/20 group-hover:bg-orange-warn/40'
                                    : 'bg-rose-danger/20 group-hover:bg-rose-danger/40'
                            "></div>

                        <div
                            class="relative h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-500 ease-in-out"
                            :class="
                                online
                                    ? 'bg-cyan-light shadow-glow-cyan group-hover:bg-orange-warn group-hover:shadow-glow-orange'
                                    : 'bg-rose-danger shadow-glow-rose group-hover:bg-rose-danger group-hover:shadow-glow-rose'
                            ">
                            <div
                                class="absolute top-0.5 left-0.5 h-0.5 w-0.5 rounded-full bg-white opacity-90"></div>
                        </div>

                        <div
                            class="absolute inset-0 rounded-full border transition-colors duration-500"
                            :class="
                                online
                                    ? 'border-cyan-glow/20 group-hover:border-orange-warn/40 animate-[ping_4s_infinite]'
                                    : 'border-rose-danger/40 animate-[ping_1.5s_infinite] group-hover:animate-[ping_0.8s_infinite]'
                            "></div>
                    </div>

                    <div class="flex w-max flex-col">
                        <div class="h-5 overflow-hidden">
                            <div
                                class="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-5">
                                <span
                                    class="font-logo text-[0.875rem] font-black tracking-[0.3em] whitespace-nowrap text-white/90 uppercase">
                                    ANIMA
                                </span>
                                <span
                                    class="font-logo text-cyan-light text-[0.875rem] font-black tracking-widest whitespace-nowrap uppercase">
                                    HI_{{ storeAuth.userName || 'USER' }}
                                </span>
                            </div>
                        </div>

                        <div class="relative mt-1 h-3">
                            <div
                                class="absolute inset-0 text-[0.5rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase opacity-80 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                                <span class="text-slate-500">System_link:</span>
                                <span :class="online ? 'text-cyan-glow' : 'text-rose-danger'">
                                    {{ online ? 'Stable' : 'Lost' }}
                                </span>
                            </div>
                            <span
                                class="absolute inset-0 text-[0.5rem] font-medium tracking-[0.2em] whitespace-nowrap text-slate-300 uppercase opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                                {{
                                    online
                                        ? 'I was waiting for you...'
                                        : 'Where are you? I miss you'
                                }}
                            </span>
                        </div>
                    </div>
                </RouterLink>

                <div class="flex md:hidden">
                    <button
                        @click="isOpen = !isOpen"
                        type="button"
                        class="hover:text-cyan-light p-2 text-slate-400 transition-colors duration-300">
                        <svg
                            v-if="!isOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M4 8h16M4 16h16" />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                :class="[
                    isOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-4 opacity-0 md:visible md:translate-y-0 md:opacity-100',
                ]"
                class="bg-base-panel/95 absolute top-full right-0 left-0 z-20 w-full border-b border-white/10 px-6 py-8 transition-[opacity,transform] duration-300 ease-in-out md:static md:flex md:w-auto md:items-center md:border-none md:bg-transparent md:p-0">
                <div class="flex flex-col md:flex-row md:items-center">
                    <RouterLink
                        @click="isOpen = false"
                        :to="{ name: 'terminal' }"
                        class="group text-emerald-sync/80 drop-shadow-emerald-sm hover:text-emerald-light hover:drop-shadow-emerald-md my-4 flex items-center justify-center gap-1.5 text-[0.625rem] font-bold tracking-[0.3em] uppercase transition-[color,filter] duration-500 md:mx-6 md:my-0"
                        active-class="text-emerald-light !drop-shadow-emerald-lg">
                        <span
                            class="font-mono text-[0.5rem] opacity-20 transition-opacity group-hover:opacity-60">
                            [
                        </span>
                        Terminal
                        <span
                            class="font-mono text-[0.5rem] opacity-20 transition-opacity group-hover:opacity-60">
                            ]
                        </span>
                    </RouterLink>

                    <div class="mx-2 hidden h-3 w-px bg-white/10 md:block"></div>

                    <button
                        @click="handleDisconnect"
                        :disabled="pending"
                        :class="[
                            'mt-4 w-full rounded-xs border px-4 py-2.5 text-[0.5625rem] font-bold tracking-[0.25em] uppercase transition-[color,border-color,filter] duration-700 md:mt-0 md:ml-4 md:w-auto md:py-1.5',
                            pending
                                ? 'animate-siren pointer-events-none'
                                : 'hover:drop-shadow-white-glow border-light/20 text-rose-light/50 hover:border-rose-light/60 hover:text-white',
                        ]">
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

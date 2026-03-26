<script setup>
import FragmentModalDelete from '@/components/fragments/FragmentModalDelete.vue';
import FragmentSearch from '@/components/fragments/FragmentSearch.vue';
import FragmentCard from '@/components/fragments/FragmentCard.vue';
import FragmentForm from '@/components/fragments/FragmentForm.vue';
import { useStoreFragments } from '@/stores/fragments.store';
import { useInfiniteScroll } from '@vueuse/core';
import { ref, onMounted } from 'vue';

const storeFragments = useStoreFragments();
const pending = ref(false);

useInfiniteScroll(
    window,
    async () => {
        if (pending.value || !storeFragments.hasMoreFragments) return;

        pending.value = true;

        try {
            await storeFragments.loadMoreFragments();
        } catch {
            // ignore
        } finally {
            pending.value = false;
        }
    },
    { distance: 10 },
);

onMounted(async () => {
    await storeFragments.loadFragments();
});
</script>

<template>
    <section class="mx-auto min-h-screen max-w-7xl px-6 py-10 text-slate-300 md:px-12">
        <FragmentForm :fragments="storeFragments.fragments" />
        <FragmentSearch />

        <Transition name="fade" mode="out-in">
            <div v-if="storeFragments.fragments.length === 0" key="empty" class="mt-32">
                <div class="flex flex-col items-center justify-center opacity-40">
                    <div class="bg-surface-card mb-8 h-px w-12"></div>
                    <p
                        class="text-center text-[0.625rem] leading-loose font-bold tracking-[0.4em] text-slate-500 uppercase">
                        Buffer is empty
                        <br />
                        <span class="font-light opacity-60">System awaiting new data input...</span>
                    </p>
                    <div class="bg-surface-card mt-8 h-1 w-1 rounded-full"></div>
                </div>
            </div>

            <div v-else key="content">
                <TransitionGroup
                    name="jump"
                    tag="ul"
                    class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FragmentCard
                        v-for="fragment in storeFragments.fragments"
                        :key="fragment.id"
                        :fragment="fragment" />
                </TransitionGroup>

                <div v-if="pending" class="mt-24 mb-16 flex flex-col items-center">
                    <div
                        class="group flex flex-col items-center gap-5 py-6 transition-all duration-500">
                        <span
                            class="bg-surface-card group-hover:bg-cyan-glow/40 h-px w-10 transition-all duration-700 group-hover:w-32"></span>
                        <span
                            class="group-hover:text-cyan-light text-[0.625rem] font-bold tracking-[0.6em] text-slate-600 uppercase transition-colors">
                            Next_Data_Block
                        </span>
                    </div>
                </div>
            </div>
        </Transition>

        <Teleport to="body">
            <FragmentModalDelete />
        </Teleport>
    </section>
</template>

<style scoped>
.jump-enter-active,
.jump-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.jump-enter-from,
.jump-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.jump-move {
    transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);
}
</style>

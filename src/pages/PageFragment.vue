<script setup>
import NoteCard from '@/components/fragments/FragmentCard.vue';
import NoteForm from '@/components/fragments/FragmentForm.vue';
import NoteModalDelete from '@/components/fragments/FragmentModalDelete.vue';
import FragmentSearch from '@/components/fragments/FragmentSearch.vue';
import { useStoreFragments } from '@/stores/fragments.store';

const storeFragments = useStoreFragments();
</script>

<template>
    <section class="min-h-screen max-w-7xl mx-auto px-6 py-10 md:px-12 text-slate-300">
        <NoteForm :fragments="storeFragments.fragments" />

        <Transition name="fade" mode="out-in">
            <div v-if="storeFragments.fragments.length === 0" key="empty" class="mt-32">
                <div class="flex flex-col items-center justify-center opacity-40">
                    <div class="w-12 h-px bg-slate-700 mb-8"></div>
                    <p
                        class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] text-center leading-loose">
                        Buffer is empty
                        <br />
                        <span class="font-light opacity-60">System awaiting new data input...</span>
                    </p>
                    <div class="w-1 h-1 rounded-full bg-slate-800 mt-8"></div>
                </div>
            </div>

            <div v-else key="content">
                <FragmentSearch />

                <TransitionGroup
                    name="jump"
                    tag="ul"
                    class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    <NoteCard
                        v-for="fragment in storeFragments.fragments"
                        :key="fragment.id"
                        :fragment="fragment" />
                </TransitionGroup>

                <div class="mt-24 mb-16 flex flex-col items-center">
                    <button
                        class="group flex flex-col items-center gap-5 py-6 transition-all duration-500">
                        <span
                            class="h-px w-10 bg-slate-800 group-hover:bg-cyan-500/40 group-hover:w-32 transition-all duration-700"></span>
                        <span
                            class="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-600 group-hover:text-cyan-400 transition-colors">
                            Next_Data_Block
                        </span>
                    </button>
                </div>
            </div>
        </Transition>

        <Teleport to="body">
            <NoteModalDelete />
        </Teleport>
    </section>
</template>

<style scoped>
.jump-enter-active,
.jump-leave-active {
    transition: all 0.4s ease;
}
.jump-enter-from,
.jump-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
.jump-move {
    transition: transform 0.4s ease;
}
</style>

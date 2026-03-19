<script setup>
import { ref } from 'vue';

const notes = ref([
    {
        id: 1,
        title: 'Sleep Log',
        content: 'Went to bed at 11 PM, woke up at 7 AM. Slept well.',
        date: 'Oct 24',
    },
    {
        id: 2,
        title: 'Workout',
        content: '30 minutes of cardio and 15 minutes of stretching.',
        date: 'Oct 25',
    },
]);
</script>

<template>
    <div class="min-h-screen max-w-7xl mx-auto px-6 py-10 md:px-12">
        <section class="max-w-4xl mx-auto mb-24">
            <div class="relative group">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000"></div>

                <div
                    class="relative bg-slate-950/20 backdrop-blur-3xl rounded-sm p-6 md:p-8 transition-all duration-500 border border-white/5 focus-within:border-cyan-500/20">
                    <input
                        type="text"
                        placeholder="Title"
                        class="w-full bg-transparent border-none text-2xl font-light tracking-tight text-white placeholder-slate-700 focus:outline-none focus:ring-0 mb-4" />

                    <textarea
                        placeholder="Vent your thoughts here..."
                        rows="5"
                        class="w-full bg-transparent border-none text-lg text-slate-400 placeholder-slate-700 focus:outline-none focus:ring-0 resize-none leading-relaxed mb-6"></textarea>

                    <div
                        class="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pt-6 border-t border-white/5">
                        <div class="flex flex-wrap gap-x-4 gap-y-2">
                            <span
                                class="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 whitespace-nowrap">
                                Encrypted session
                            </span>
                            <span
                                class="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-500/40 animate-pulse whitespace-nowrap">
                                Buffer active
                            </span>
                        </div>

                        <button
                            class="w-full sm:w-auto px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-500 rounded-[2px] active:scale-95 shadow-lg shadow-cyan-500/5">
                            Commit Note
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <TransitionGroup
            name="jelly"
            tag="div"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="note in notes"
                :key="note.id"
                class="group relative flex flex-col justify-between overflow-hidden rounded-[4px] border border-white/5 bg-slate-900/30 p-8 transition-all duration-700 hover:bg-slate-900/50 hover:border-cyan-500/20">
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <div
                            class="h-[1px] w-8 bg-cyan-500/30 group-hover:w-12 transition-all duration-700"></div>
                        <button
                            @click="deleteNote(note.id)"
                            class="text-slate-800 hover:text-red-400/60 transition-colors p-1 -mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>

                    <h3
                        class="text-sm font-bold uppercase tracking-widest text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors">
                        {{ note.title }}
                    </h3>

                    <p
                        class="text-sm leading-relaxed text-slate-500 group-hover:text-slate-300 transition-all duration-700">
                        {{ note.content }}
                    </p>
                </div>

                <div class="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span class="text-[10px] font-medium tracking-[0.2em] text-slate-700 uppercase">
                        {{ note.date }}
                    </span>
                    <button
                        class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                        Open
                    </button>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.jelly-enter-active,
.jelly-move {
    transition: all 0.45s cubic-bezier(0.3, 1.3, 0.3, 1);
}
.jelly-leave-active {
    transition: all 0.3s ease-in;
}
.jelly-enter-from {
    opacity: 0;
    transform: scale(0.97) translateY(-10px);
}
.jelly-leave-to {
    opacity: 0;
    transform: scale(0.97);
}
</style>

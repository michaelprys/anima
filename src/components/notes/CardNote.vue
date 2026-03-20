<script setup>
const props = defineProps({
    note: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['delete']);

const handleDelete = () => {
    emit('delete', props.note.id);
};
</script>

<template>
    <li
        class="group relative flex flex-col justify-between overflow-hidden rounded-[4px] border border-white/10 bg-slate-800/30 p-8 transition-all duration-700 hover:bg-slate-800/50 hover:border-cyan-500/30">
        <div>
            <div class="flex items-center justify-between mb-6">
                <div
                    class="h-[1px] w-8 bg-cyan-500/40 group-hover:w-12 transition-all duration-700"></div>
                <button
                    class="text-slate-600 hover:text-red-400/70 transition-colors p-1 -mr-1"
                    @click="handleDelete">
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
                class="text-sm leading-relaxed text-slate-400 group-hover:text-slate-200 transition-all duration-700">
                {{ note.thought }}
            </p>
        </div>

        <div class="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
            <span class="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">
                {{ note.date }}
            </span>

            <button
                class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Open
            </button>
        </div>
    </li>
</template>

import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

export const useEsc = () => {
    const router = useRouter();

    const exit = (e) => {
        if (e.key === 'Escape' && router.currentRoute.value.name !== 'fragments') {
            router.push({ name: 'fragments' });
        }
    };

    onMounted(() => window.addEventListener('keydown', exit));
    onBeforeUnmount(() => window.removeEventListener('keydown', exit));

    return {
        exit,
    };
};

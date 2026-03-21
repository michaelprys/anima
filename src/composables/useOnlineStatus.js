import { ref, onBeforeUnmount, onMounted } from 'vue';

export const useOnlineStatus = () => {
    const online = ref(navigator.onLine);

    const setOnline = () => (online.value = true);
    const setOffline = () => (online.value = false);

    onMounted(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('online', setOnline);
        window.removeEventListener('offline', setOffline);
    });

    return {
        online,
    };
};

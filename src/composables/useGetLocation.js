import { delay } from '@/utils/delay.utils.js';
import { ref } from 'vue';

export const useGetLocation = () => {
    const coords = ref(null),
        location = ref(''),
        pending = ref(false);

    const getLocation = async () => {
        pending.value = true;

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 7000 });
            });

            coords.value = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            // Address

            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.value.latitude}&lon=${coords.value.longitude}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();

            location.value = `${data.address.city}, ${data.address.country}`;
        } catch (error) {
            coords.value = null;
            location.value = 'Not Detected';
            console.error(error);
        } finally {
            await delay(1000);
            pending.value = false;
        }
    };

    const watchPermissions = async () => {
        if (!navigator.permissions) return;

        try {
            const status = await navigator.permissions.query({ name: 'geolocation' });

            status.onchange = async () => {
                if (status.state === 'granted') {
                    await getLocation();
                }
            };
        } catch (error) {
            console.error('Permission Error: ', error);
        }
    };

    return {
        coords,
        location,
        pending,
        getLocation,
        watchPermissions,
    };
};

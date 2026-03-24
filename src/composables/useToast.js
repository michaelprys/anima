import { reactive, readonly } from 'vue';

const state = reactive({
    message: '',
    active: false,
    type: 'success',
    timeout: 0,
});

export const useToast = () => {
    const showToast = (message, type = 'success', duration = 3000) => {
        state.message = message;
        state.type = type;
        state.active = true;

        if (state.timeout) {
            clearTimeout(state.timeout);
        }
        state.timeout = setTimeout(() => {
            state.active = false;
        }, duration);
    };

    return {
        toastState: readonly(state),
        showToast,
    };
};

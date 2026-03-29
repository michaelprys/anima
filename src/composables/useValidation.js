import { ref } from 'vue';

export const useValidation = () => {
    const validationError = ref('');

    const validate = (formData) => {
        validationError.value = '';

        const { email, passKey } = formData;

        if (!/^.+@.+$/.test(email)) {
            validationError.value = 'INVALID EMAIL';

            return false;
        }

        if (!/^.{1,16}$/.test(passKey)) {
            validationError.value = 'INVALID PASSKEY';

            return false;
        }

        return true;
    };

    return { validationError, validate };
};

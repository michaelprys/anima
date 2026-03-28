import { defineStore, acceptHMRUpdate } from 'pinia';

export const useStoreSentiment = defineStore('storeSentiment', () => {
    const recognizeSentiment = async (data) => {
        try {
            const response = await fetch(
                'https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-xlm-roberta-base-sentiment',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ inputs: data }),
                },
            );
            if (!response.ok) return null;

            return await response.json();
        } catch (error) {
            console.error(error);

            return null;
        }
    };

    const calculateImpact = (sentimentArray, text, title = '') => {
        let score = 0.5;
        let label = 'neutral';
        if (sentimentArray && Array.isArray(sentimentArray)) {
            const flat = Array.isArray(sentimentArray[0]) ? sentimentArray[0] : sentimentArray;
            if (flat && flat.length > 0) {
                let top = flat[0];
                flat.forEach((e) => {
                    if (e.score > top.score) top = e;
                });
                score = top.score;
                label = String(top.label).toLowerCase();
            }
        }
        const base = (text.length + title.length) * score;
        if (label.includes('pos') || label === 'label_2') return base * 0.2;
        if (label.includes('neg') || label === 'label_0') return base * 1.5;

        return base;
    };

    return { recognizeSentiment, calculateImpact };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreSentiment, import.meta.hot));
}

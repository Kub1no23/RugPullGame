import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Achievement } from '../data/types';

export const usePopUpStore = defineStore('popUp', () => {
    const isVisible = ref(false);
    const title = ref('');
    const description = ref('');

    const triggerPopUp = (a: Achievement) => {
        isVisible.value = true;
        title.value = a.title;
        description.value = a.description;

        setTimeout(() => {
            isVisible.value = false;
        }, 3000);
    }

    return {
        isVisible,
        title,
        description,
        triggerPopUp
    }
});
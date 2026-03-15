import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Achievement } from '../data/types';
import alertSound from '../assets/sounds/alert.wav';
import { playSound } from '../helperFuncs';



export const usePopUpStore = defineStore('popUp', () => {
    const isVisible = ref(false);
    const title = ref('');
    const description = ref('');

    let queue: Promise<void> = Promise.resolve()
    const triggerPopUp = async (a: Achievement) => {
        await queue;

        queue = showPopUp(a);
    }

    const showPopUp = async (a: Achievement) => {
        isVisible.value = true;
        title.value = a.title;
        description.value = a.description;
        playSound(alertSound);

        return new Promise<void>((resolve) => setTimeout(() => { isVisible.value = false; resolve() }, 3000));
    }

    return {
        isVisible,
        title,
        description,
        triggerPopUp
    }
});
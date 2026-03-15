import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEndScreenStore = defineStore('modal', () => {
    const isOpen = ref(false)
    const type = ref<'victory' | 'defeat' | null>(null)
    const actionCallback = ref<(() => void) | null>(null);
    const reset = ref<boolean | null>(null);
    const title = ref('')
    const description = ref('')

    const openModal = (modalType: 'victory' | 'defeat', doReset: boolean, action: (() => void | boolean), t: string, d: string) => {
        type.value = modalType
        reset.value = doReset;
        actionCallback.value = action;
        title.value = t
        description.value = d
        isOpen.value = true
    }

    const closeModal = () => {
        isOpen.value = false
        reset.value = null;
        type.value = null
        actionCallback.value = null;
    }

    return {
        isOpen,
        type,
        actionCallback,
        title,
        description,
        reset,
        openModal,
        closeModal
    }
})

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { playSound } from '../helperFuncs';
import errorSound from '../assets/sounds/error.mp3';
import confirmSound from '../assets/sounds/confirmation.mp3';

export type FileUploadStatus = "success" | "missingData" | "invalidFile"

export const useFileUploadModalStore = defineStore('fileUploadModal', () => {
    const isVisible = ref(false);
    const status = ref<FileUploadStatus | null>(null)
    const title = ref('');
    const description = ref('');

    const showModal = (s: FileUploadStatus) => {
        status.value = s;
        isVisible.value = true;

        switch (s) {
            case "success":
                title.value = "Save Loaded";
                description.value = "Your game progress has been successfully restored.";
                playSound(confirmSound);
                break;

            case "missingData":
                title.value = "Missing Data";
                description.value = "The saved file is missing some required information.";
                playSound(errorSound);
                break;

            case "invalidFile":
                title.value = "Invalid File";
                description.value = "The selected file is not a valid file or is corrupt.";
                playSound(errorSound);
                break;
        }
    }

    const hideModal = () => {
        isVisible.value = false
    }

    return {
        isVisible,
        status,
        title,
        description,
        showModal,
        hideModal
    }
})
<script setup lang="ts">
import { useFileUploadModalStore } from "../stores/fileUpload";
import Button from "../components/Button.vue";

const modal = useFileUploadModalStore();
</script>

<template>
    <div v-if="modal.isVisible" class="fixed inset-0 z-50 flex items-center justify-center">
        <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="modal.hideModal">
        </div>

        <div
            class="
                relative z-60
                p-6
                bg-[#c8b8a8] text-[#2a1f1a]
                font-bold tracking-wide
                border-[3px] border-[#5a4a3a]
                shadow-[5px_5px_0_0_#7c6a58]
                rounded-md
                transition-all
                animate-[popIn_0.25s_ease-out]
                w-[90%] max-w-md text-center">
            <h1 class="text-3xl mb-4">{{ modal.title }}</h1>
            <p class="mb-6">{{ modal.description }}</p>

            <Button
                text="OK"
                @click="modal.hideModal"
            />
        </div>
    </div>
</template>
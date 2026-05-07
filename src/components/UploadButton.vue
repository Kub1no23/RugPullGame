<script setup lang="ts">
import Button from "./Button.vue";
import { useAchievementsStore } from "../stores/achievements";
import { useUpgradesStore } from "../stores/upgrades";
import { useGameMetricsStore } from "../stores/gameMetrics";
import { ref } from "vue"
import { useFileUploadModalStore } from "../stores/fileUpload";


const achievements = useAchievementsStore();
const upgrades = useUpgradesStore();
const game = useGameMetricsStore();

const fileInput = ref<HTMLInputElement | null>(null)
const fileModal = useFileUploadModalStore();

function triggerFileDialog() {
    fileInput.value?.click();
}

const uploadSave = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return;
    const file = input.files[0]!;
    const reader = new FileReader();

    reader.onload = () => {
            try {
            const data = JSON.parse(reader.result as string)

            if (data.achievements?.items?.length > 0) {
                achievements.section = data.achievements
            } else {
                fileModal.showModal('missingData');
                return;
            }

            if (data.upgrades?.items?.length > 0) {
                upgrades.section = data.upgrades
            } else {
                fileModal.showModal('missingData');
                return;
            }

            if (data.game) {
                const g = data.game;
                game.balance = g.balance;
                game.cloutPower = g.cloutPower;
                game.heatLevelPercentage = g.heat;
                game.coinPrice = g.coinPrice;
                game.coinsOwned = g.coinsOwned;
                game.level = g.level;
                game.lives = g.lives;
                game.clickCount = g.clickCount;
                game.taxEvasion = g.taxEvasion;
                game.background = g.background;
            } else {
                fileModal.showModal('missingData');
                return;
            }
            
            fileModal.showModal('success');
        } catch (e) {
            console.error("Failed to load save:", e);
            fileModal.showModal('invalidFile');
        }
    }

    reader.readAsText(file);
}

</script>

<template>
    <input
        ref="fileInput"
        type="file"
        accept="application/json"
        class="hidden"
        @change="uploadSave"
    />
    <Button
        text="Load Game"
        @click="triggerFileDialog"
    />
</template>
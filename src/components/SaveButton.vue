<script setup lang="ts">
import Button from "./Button.vue";
import { useAchievementsStore } from "../stores/achievements";
import { useUpgradesStore } from "../stores/upgrades";
import { useGameMetricsStore } from "../stores/gameMetrics";

const achievements = useAchievementsStore();
const upgrades = useUpgradesStore();
const game = useGameMetricsStore();


const saveGame = () => {
    const data = {
        achievements: achievements.section,
        upgrades: upgrades.section,
        game: {
            balance: game.balance,
            cloutPower: game.cloutPower,
            heat: game.heatLevelPercentage,
            coinPrice: game.coinPrice,
            coinsOwned: game.coinsOwned,
            level: game.level,
            lives: game.lives,
            clickCount: game.clickCount,
            taxEvasion: game.taxEvasion,
            background: game.background
        }
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "save.json";
    a.click();

    URL.revokeObjectURL(url);
}
</script>

<template>
    <Button text="Save Game" @click="saveGame"/>
</template>
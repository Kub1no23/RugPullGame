import { defineStore } from "pinia"
import { useAchievementsStore } from "./achievements"
import { useUpgradesStore } from "./upgrades"
import { useGameMetricsStore } from "../stores/gameMetrics";
import { useFileUploadModalStore } from "../stores/fileUpload";

export const useSaveSystem = defineStore("saveSystem", () => {
    const fileModal = useFileUploadModalStore();
    const achievements = useAchievementsStore();
    const upgrades = useUpgradesStore();
    const game = useGameMetricsStore();

    const STORAGE_KEY = "RugPullGameSave";

    const saveToLocalStorage = () => {
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
                taxEvasion: game.taxEvasion,
                clickCount: game.clickCount,
                background: game.background
            }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    const loadFromLocalStorage = () => {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return false;

        try {
            const data = JSON.parse(raw)

            if (data.achievements?.items) {
                Object.assign(achievements.section, data.achievements);
            } else {
                fileModal.showModal('missingData');
                return false;
            }

            if (data.upgrades?.items) {
                Object.assign(upgrades.section, data.upgrades);
            } else {
                fileModal.showModal('missingData');
                return false;
            }

            if (data.game) {
                const g = data.game
                game.balance = g.balance
                game.cloutPower = g.cloutPower
                game.heatLevelPercentage = g.heat
                game.coinPrice = g.coinPrice
                game.coinsOwned = g.coinsOwned
                game.level = g.level
                game.lives = g.lives
                game.clickCount = g.clickCount;
                game.taxEvasion = g.taxEvasion;
                game.background = g.background;
            } else {
                fileModal.showModal('missingData');
                return false;
            }

            fileModal.showModal('success');
            return true
        } catch (e) {
            fileModal.showModal('invalidFile');
            console.error("Failed to load save:", e);
            return false
        }
    }

    return {
        saveToLocalStorage,
        loadFromLocalStorage
    }
})

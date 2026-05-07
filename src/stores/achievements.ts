import { defineStore } from "pinia";
import type { Achievement, Section } from "../data/types";
import { achievementsSection as initialAchievements } from "../data/achievements";
import { usePopUpStore } from '../stores/popUp';

export const useAchievementsStore = defineStore("achievements", {
    state: () => ({
        section: structuredClone(initialAchievements) as Section<Achievement>
    }),
    actions: {
        unlock(id: number) {
            const popUp = usePopUpStore();
            this.section.items.forEach(i => {
                if (i.id == id && i.unlocked === false) {
                    i.unlocked = true
                    popUp.triggerPopUp(i);
                }
            });
        },
        resetAll() {
            this.section.items.forEach(i => (i.unlocked = false))
        }
    }
})

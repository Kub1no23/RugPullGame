import { defineStore } from "pinia"
import type { Section, Upgrade } from "../data/types";
import { upgradesSection as initialUpgrades } from "../data/upgrades";

export const useUpgradesStore = defineStore("upgrades", {
    state: () => {
        return { section: structuredClone(initialUpgrades) as Section<Upgrade> }
    },
    actions: {
        resetPrices() {
            this.section.items.forEach((item) => {
                item.price = initialUpgrades.items.find(i => i.id === item.id)!.price;
            })
        }
    }
})
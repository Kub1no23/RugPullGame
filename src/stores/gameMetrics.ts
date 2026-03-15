import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Upgrade } from '../data/types';

export const useGameMetricsStore = defineStore('gameMetrics', () => {
    const cloutPower = ref(1);
    const heatLevelPercentage = ref(0);
    const coinPrice = ref(0.0001);
    const coinsOwned = ref(50000);
    const balance = ref(0);
    const volumePercentage = ref(20);
    const level = ref(0);
    const lives = ref(0);
    const rugPull = ref<boolean | null>(null);

    const resetGame = () => {
        cloutPower.value = 1;
        heatLevelPercentage.value = 0;
        coinPrice.value = 0.0001;
        coinsOwned.value = 50000;
        balance.value = 0;
        volumePercentage.value = 20;
        level.value = 0;
        lives.value = 0;
        rugPull.value = null;
    }
    const setRugPull = (val: boolean | null) => {
        rugPull.value = val;
    }
    const setLivesCount = (amount: number) => {
        lives.value = amount;
    }
    const changeCloutPower = (amount: number) => {
        cloutPower.value += amount;
    }
    const changeHeatLevelPercentage = (amount: number) => {
        heatLevelPercentage.value += amount;
    }
    const setHeatLevelPercentage = (amount: number) => {
        heatLevelPercentage.value = amount;
    }
    const changeCoinPrice = (amount: number) => {
        coinPrice.value += amount;
    }
    const setCoinPrice = (amount: number) => {
        coinPrice.value = amount;
    }
    const changeCoinsOwned = (amount: number) => {
        coinsOwned.value += amount;
    }
    const setCoinsOwned = (amount: number) => {
        coinsOwned.value = amount;
    }
    const changeBalance = (amount: number) => {
        balance.value += amount;
    }
    const setVolumePercentage = (amount: number) => {
        volumePercentage.value = amount;
    }
    const increaseLevel = () => {
        level.value++;
    }
    const applyUpgrade = (upgrade: Upgrade) => {
        upgrade.price = Math.floor(upgrade.price * upgrade.upgradePriceMultiplier);

        if (typeof upgrade.heatChange === "number") {
            changeHeatLevelPercentage(upgrade.heatChange);
        }
        if (typeof upgrade.cloutPowerChange === "number") {
            changeCloutPower(upgrade.cloutPowerChange);
        }
        if (typeof upgrade.coinPriceMultiplier === "number") {
            const newPrice = Math.floor(coinPrice.value * upgrade.upgradePriceMultiplier);
            setCoinPrice(newPrice);
        }


        if (typeof upgrade.activeForSeconds === "number") {
            setTimeout(() => {
                if (typeof upgrade.heatChange === "number") {
                    changeHeatLevelPercentage(-upgrade.heatChange);
                }
                if (typeof upgrade.cloutPowerChange === "number") {
                    changeCloutPower(-upgrade.cloutPowerChange);
                }
                if (typeof upgrade.coinPriceMultiplier === "number") {
                    const oldPrice = Math.floor(coinPrice.value / upgrade.upgradePriceMultiplier);
                    setCoinPrice(oldPrice);
                }
            }, upgrade.activeForSeconds * 1000);
        }
    }


    setInterval(() => {
        const newVolumePercentage = Math.floor(Math.random() * 60) + 1 + 20;

        setVolumePercentage(newVolumePercentage);

        console.log('Volume percentage updated to:', newVolumePercentage);
    }, 20000);

    return {
        cloutPower,
        heatLevelPercentage,
        coinPrice,
        coinsOwned,
        balance,
        volumePercentage,
        level,
        lives,
        rugPull,
        setLivesCount,
        changeCloutPower,
        changeHeatLevelPercentage,
        setHeatLevelPercentage,
        changeCoinPrice,
        setCoinPrice,
        changeCoinsOwned,
        setCoinsOwned,
        changeBalance,
        increaseLevel,
        setRugPull,
        applyUpgrade,
        resetGame
    }
});
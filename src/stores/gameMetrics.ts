import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameMetricsStore = defineStore('gameMetrics', () => {
    const cloutPower = ref(1);
    const heatLevelPercentage = ref(0);
    const coinPrice = ref(0.0001);
    const coinsOwned = ref(1000000);
    const balance = ref(0);
    const volumePercentage = ref(20);
    const level = ref(0);

    const changeCloutPower = (amount: number) => {
        cloutPower.value += amount;
    }
    const changeHeatLevelPercentage = (amount: number) => {
        heatLevelPercentage.value += amount;
    }
    const changeCoinPrice = (amount: number) => {
        coinPrice.value += amount;
    }
    const changeCoinsOwned = (amount: number) => {
        coinsOwned.value += amount;
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
        changeCloutPower,
        changeHeatLevelPercentage,
        changeCoinPrice,
        changeCoinsOwned,
        changeBalance,
        increaseLevel
    }
});
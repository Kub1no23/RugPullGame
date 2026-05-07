import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Upgrade } from '../data/types';
import { useUpgradesStore } from './upgrades';
import room from '../assets/background/room.png';
import beachVilla from '../assets/background/beachvilla.png';

export const useGameMetricsStore = defineStore('gameMetrics', () => {
    const totalCoins = 20000;
    const cloutPower = ref(1);
    const heatLevelPercentage = ref(0);
    const coinPrice = ref(0.0001);
    const coinsOwned = ref(totalCoins);
    const balance = ref(0);
    const volumePercentage = ref(20);
    const level = ref(0);
    const lives = ref(0);
    const taxEvasion = ref(0);
    const rugPull = ref<boolean | null>(null);
    const background = ref(room);

    const clickCount = ref(0);
    const upgrades = useUpgradesStore();

    const resetGame = () => {
        cloutPower.value = 1;
        heatLevelPercentage.value = 0;
        coinPrice.value = 0.0001;
        coinsOwned.value = 20000;
        balance.value = 0;
        volumePercentage.value = 20;
        level.value = 0;
        lives.value = 0;
        taxEvasion.value = 0;
        rugPull.value = null;

        upgrades.resetPrices();
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
        if (heatLevelPercentage.value + amount < 0) {
            setHeatLevelPercentage(0);
        } else {
            heatLevelPercentage.value += amount;
        }
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
        changeBalance(-upgrade.price);
        upgrade.price = Math.floor(upgrade.price * upgrade.upgradePriceMultiplier);

        if (upgrade.id === 11) background.value = `${beachVilla}`;
        if (upgrade.id === 10) lives.value = 1;
        if (upgrade.id === 9) taxEvasion.value++;

        if (typeof upgrade.heatChange === "number") {
            changeHeatLevelPercentage(upgrade.heatChange);
        }
        if (typeof upgrade.cloutPowerChange === "number") {
            changeCloutPower(upgrade.cloutPowerChange);
        }
        if (typeof upgrade.coinPriceMultiplier === "number") {
            const newPrice = coinPrice.value * upgrade.coinPriceMultiplier;
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
                    const oldPrice = Math.floor(coinPrice.value / upgrade.coinPriceMultiplier);
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
        totalCoins,
        cloutPower,
        heatLevelPercentage,
        coinPrice,
        coinsOwned,
        balance,
        volumePercentage,
        level,
        lives,
        rugPull,
        taxEvasion,
        clickCount,
        background,
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
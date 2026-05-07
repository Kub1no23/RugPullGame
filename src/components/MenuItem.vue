<script setup lang="ts">
import type { Achievement, Upgrade } from '../data/types';
import { computed, ref } from 'vue';
import { useGameMetricsStore } from '../stores/gameMetrics';
import Card from './Card.vue';
import errorSound from '../assets/sounds/error.mp3';
import confirmSound from '../assets/sounds/confirmation.mp3';
import { useAchievementsStore } from "../stores/achievements";
import { useUpgradesStore } from '../stores/upgrades';
import { playSound } from '../helperFuncs';

const props = defineProps<{itemId: number, heading: string}>();
let success = ref<boolean | null>(null);
const game = useGameMetricsStore();
const achievements = useAchievementsStore();
const upgrades = useUpgradesStore();

let item: Achievement | Upgrade = props.heading === 'Achievements' 
   ? achievements.section.items.find(a => a.id === props.itemId)! 
   : upgrades.section.items.find(u => u.id === props.itemId)!;

const isLocked = computed(() => {
    if (props.heading === 'Achievements') {
        return !(item as Achievement).unlocked
    }
    if (props.heading === 'Upgrades & Actions') {
        return (item as Upgrade).unlockAtLevel > game.level
    }
    return false
})

const onClick = (heading: string) => {
    switch (heading) {
        case 'Upgrades & Actions':
            const u = item as Upgrade

            if (game.balance < u.price || isLocked.value === true) {
                console.log(game.balance);
                console.log(u.price)
                playSound(errorSound);

                success.value = false;
                setTimeout(() => {
                    success.value = null;
                }, 400);
            } else {
                playSound(confirmSound);
                success.value = true;
                game.applyUpgrade(u);
                if (u.id === 11) achievements.unlock(3);

                setTimeout(() => {
                    success.value = null;
                }, 400);
            }
        break;
        case 'Achievements':

        break;
    }
}
</script>

<template>
    <Card
        class="cursor-pointer"
        :class="[
            success === true
            ? 'hover:shadow-[5px_5px_0_0_#4CAF50] shadow-[5px_5px_0_0_#4CAF50]'
            : success === false
            ? 'hover:shadow-[5px_5px_0_0_#E53935] shadow-[5px_5px_0_0_#E53935]'
            : 'hover:shadow-[5px_5px_0_0_#d6cec7]']">
        <div
            v-if="heading === 'Upgrades & Actions'"
            :key="(item as Upgrade).id"
            @click="() => onClick(heading)"
            :class="[
                'p-2 w-full h-full bg-[#3b2d26] flex flex-col gap-3 items-center',
                { locked: isLocked }
            ]">
                <img
                class="icon"
                :src="(item as Upgrade).icon"
                :alt="(item as Upgrade).title + ' icon'"/>
                <p class="self-start text-xl font-extrabold text-[#f5e9d8] drop-shadow-[2px_2px_0_#000]">
                {{ (item as Upgrade).title }}
                </p>
                <p class="self-start text-sm text-[#f5e9d8]/90 leading-snug drop-shadow-[1px_1px_0_#000]">
                {{ (item as Upgrade).description }}
                </p>
                <p :key="(item as Upgrade).price" class="self-start text-xl font-bold text-[#f5e9d8] drop-shadow-[1px_1px_0_#000] mt-auto">
                ${{ (item as Upgrade).price }}
                </p>
        </div>
        <div
            v-else-if="heading === 'Achievements'"
            :key="(item as Achievement).id"
            @click="() => onClick(heading)"
            :class="[
                'p-2 w-full h-full bg-[#3b2d26] flex flex-col gap-3 items-center',
                { locked: isLocked }
            ]">
                <img
                class="icon"
                :src="(item as Achievement).icon"
                :alt="(item as Achievement).title + ' icon'"/>
                <p class="self-start text-xl font-extrabold text-[#f5e9d8] drop-shadow-[2px_2px_0_#000]">{{ (item as Achievement).title }}</p>
                <p class="self-start text-sm text-[#f5e9d8]/90 leading-snug drop-shadow-[1px_1px_0_#000]">{{ (item as Achievement).description }}</p>
        </div>
    </Card>
</template>

<style scoped>
    .locked {
        position: relative;
    }

    .locked::after {
        content: "";
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/lock.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 48px;
        background-color: rgba(0,0,0,0.25);
        backdrop-filter: blur(8px);
    }
</style>
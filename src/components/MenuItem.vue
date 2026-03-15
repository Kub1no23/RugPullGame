<script setup lang="ts">
import type { Achievement, Upgrade } from '../data/types';
import { computed, ref, type ComputedRef } from 'vue';
import { useGameMetricsStore } from '../stores/gameMetrics';
import Card from './Card.vue';
import errorSound from '../assets/sounds/error.mp3';
import confirmSound from '../assets/sounds/confirmation.mp3';

const props = defineProps<{item: Achievement | Upgrade, heading: string}>();
const game = useGameMetricsStore();
let isLocked: ComputedRef<boolean>;
let success = ref<boolean | null>(null);

const playSound = (file: string) => {
   const audio = new Audio(file);
   audio.currentTime = 0;
   audio.play();
}

const sectionType = (heading: string) => {
    switch (heading) {
        case 'Achievements':
            const a = props.item as Achievement
            isLocked = computed(() => a.unlocked === false);
            
            return `
                <img class="w-16 h-16 mx-auto mb-3 drop-shadow-[2px_2px_0_#000]" src=${a.icon} alt="${a.title} icon">
                <p class="self-start">${ a.title }</p>
                <p class="self-start">${ a.description }</p>
            `
        case 'Upgrades & Actions':
            const u = props.item as Upgrade
            isLocked = computed(() => u.unlockAtLevel > game.level);

            return `
                <img class="icon" src=${u.icon} alt="${u.title} icon">
                <p class="self-start text-xl font-extrabold text-[#f5e9d8] drop-shadow-[2px_2px_0_#000]">${ u.title }</p>
                <p class="self-start text-sm text-[#f5e9d8]/90 leading-snug drop-shadow-[1px_1px_0_#000]">${ u.description }</p>
                <p class="self-start text-xl font-bold text-[#f5e9d8] drop-shadow-[1px_1px_0_#000] mt-auto">$${ u.price }</p>
            `
    }
}
const htmlContent = sectionType(props.heading);

const onClick = (heading: string) => {
    switch (heading) {
        case 'Upgrades & Actions':
            const u = props.item as Upgrade

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
         @click="() => (onClick(props.heading))"
         v-html="htmlContent"
         :class="[
             'p-2 w-full h-full bg-[#3b2d26] flex flex-col gap-3 items-center',
             { locked: isLocked }]">
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
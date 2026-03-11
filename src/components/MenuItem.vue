<script setup lang="ts">
import type { Achievement, Upgrade } from '../data/types';
import { computed } from 'vue';
import { useGameMetricsStore } from '../stores/gameMetrics';

const props = defineProps<{item: Achievement | Upgrade, heading: string}>();
const game = useGameMetricsStore();
let isLocked;

const sectionType = (heading: string) => {
    switch (heading) {
        case 'Achievements':
            const a = props.item as Achievement
            isLocked = computed(() => a.unlocked === false);

            return `
                <img class="icon" src=${a.icon} alt="${a.title} icon">
                <p>${ a.title }</p>
                <p>${ a.description }</p>
            `
        case 'Upgrades & Actions':
            const u = props.item as Upgrade
            isLocked = computed(() => u.unlockAtLevel > game.level);

            return `
                <img class="icon" src=${u.icon} alt="${u.title} icon">
                <p>${ u.title }</p>
                <p>${ u.description }</p>
                <p>${ u.price }</p>
            `
    }
}
const htmlContent = sectionType(props.heading);
</script>

<template>
   <div v-html="htmlContent" :class="{ locked: isLocked }"></div>
</template>

<style scoped>
    .locked {
        position: relative;
    }

    .locked::after {
        content: url('../assets/lock.svg');
        color: white;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        inset: 0;
        backdrop-filter: blur(6px);
    }
</style>
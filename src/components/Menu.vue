<script setup lang="ts">
import { ref } from 'vue';
import type { Achievement, Upgrade } from '../data/types';
import { useUpgradesStore } from '../stores/upgrades';
import { useAchievementsStore } from '../stores/achievements';
import MenuItem from './MenuItem.vue';
import Button from './Button.vue';

const props = defineProps<{heading: string}>();
let items: Achievement[] | Upgrade[] = [];
let description = '';

if (props.heading === 'Upgrades & Actions') {
   const upgSection = useUpgradesStore().section;
   const upgrds: Upgrade[] = upgSection.items;
   description = upgSection.description;
   
   upgrds.sort((a, b) => a.unlockAtLevel - b.unlockAtLevel);

   items = upgrds;
} else if (props.heading === 'Achievements') {
   const achSection = useAchievementsStore().section;
   const achs: Achievement[] = achSection.items;
   description = achSection.description;

   items = achs;
}

const isVisible = ref(false);

</script>

<template>
   <Button :text="heading" @click="isVisible = !isVisible" />
   <div v-if="isVisible" class="fixed top-0 left-0 w-screen h-dvh bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex justify-center" @click="isVisible = !isVisible">
      <div class="w-full h-full flex flex-col items-center p-2 gap-2 xl:w-1/2 overflow-y-scroll no-scrollbar" @click.stop>
        <p class="text-2xl font-extrabold tracking-wide text-[#f5e9d8] drop-shadow-[2px_2px_0_#000]">{{ heading }}</p>
        <p class="text-lg font-medium text-[#f5e9d8]/90 leading-snug drop-shadow-[1px_1px_0_#000]">{{ description }}</p>

        <div class="w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[auto] overflow-x-visible mb-2">
           <MenuItem v-for="item in items" :key="item.id" :itemId="item.id" :heading />
        </div>
        
        <Button @click="isVisible = !isVisible" text="Close Menu" class="mb-2 mt-auto"/>
      </div>
   </div>
</template>

<style scoped>
   .no-scrollbar::-webkit-scrollbar {
      display: none;
   }
   .no-scrollbar {
      -ms-overflow-style: none; /* IE */
      scrollbar-width: none; /* Firefox */
   }
</style>

<script setup lang="ts">
import { ref } from 'vue';
import type { Achievement, Upgrade } from '../data/types';
import MenuItem from './MenuItem.vue';

const props = defineProps<{section: {heading: string, description: string, items: Achievement[] | Upgrade[]}}>();
let {heading, description, items} = props.section;

if (heading === 'Upgrades & Actions') {
   const upgrades = items as Upgrade[];
   upgrades.sort((a, b) => a.unlockAtLevel - b.unlockAtLevel);
   items = upgrades;
}

const isVisible = ref(false);

</script>

<template>
   <button @click="isVisible = !isVisible">{{ heading }}</button>
   <div v-if="isVisible" class="container" @click="isVisible = !isVisible">
      <div class="wrapper" @click.stop>
        <p>{{ heading }}</p>
        <p>{{ description }}</p>
        <div class="responsive-grid">
           <MenuItem v-for="item in items" :key="item.id" :item :heading style="width: 100%; background-color: blue;"></MenuItem>
        </div>
        
        <button @click="isVisible = !isVisible">Close Menu</button>
      </div>
   </div>
</template>

<style scoped>
   .responsive-grid {
      display: grid; 
      gap: 10px; 
      grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
      grid-template-rows: auto;
      width: 100%;
   }
   .container {
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100vw; 
      height: 100dvh; 
      background: rgba(0, 0, 0, 0.5); 
      backdrop-filter: blur(10px); 
      z-index: 100;
      display: flex;
      justify-content: center;
   }
   .wrapper {
      width: 100%;
      height: 100%;
      overflow-y: auto; 
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: aquamarine;
   }
   @media (min-width: 1200px) { 
      .wrapper { 
         width: 50%;
      } 
   }
   @media (min-width: 600px) {
      .responsive-grid {
         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
   }
</style>
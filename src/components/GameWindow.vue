<script setup lang="ts">
import { ref } from 'vue'
import { useGameMetricsStore } from '../stores/gameMetrics';
import { usePopUpStore } from '../stores/popUp';
import PopUp from './PopUp.vue';
import Menu from './Menu.vue';
import { achievementsSection } from '../data/achievements';
import { upgradesSection } from '../data/upgrades';

defineProps<{}>()

const game = useGameMetricsStore();
const popUp = usePopUpStore();

const count = ref(0);

const handleClick = () => {
   const priceIncrease = (game.cloutPower / game.volumePercentage) * 0.005;
   game.changeCoinPrice(Number(priceIncrease.toFixed(4)));

   const coinsSold = Number((15 * (game.volumePercentage / 100) * (1 + Math.log2(game.cloutPower + 1))).toFixed(0));
   game.changeCoinsOwned(-coinsSold);
   game.changeBalance(coinsSold * game.coinPrice);
   
   console.log(`Coins sold: ${coinsSold}, New price: ${game.coinPrice.toFixed(4)}, Balance increase: ${game.balance.toFixed(2)}`);
}

const handleCountClick = () => {
   count.value++;
   console.log(count.value)
   if (count.value % 5 === 0 && count.value !== 0) {
      if (popUp.isVisible) {
         setTimeout(() => {
            popUp.triggerPopUp({ title: 'Achievement Unlocked!', description: `You clicked ${count.value} times!`, id: 0, unlocked: true, icon: 'bla'});
         }, 3000); // Delay to allow the current pop-up to hide
      } else {
         popUp.triggerPopUp({ title: 'Achievement Unlocked!', description: `You clicked ${count.value} times!`, id: 0, unlocked: true, icon: 'bla'});
      }
   }
}

</script>

<template>
   <main>
      <h1 class="text-3xl">Rug Pull Game</h1>
      <section @click="handleClick" style="border: 1px solid black; padding: 100px; cursor: pointer;">
         <p>Click here</p>
         <div class="stats">
            <div>
               <p>Clout power: {{ game.cloutPower }}</p><p>Heat level:{{ game.heatLevelPercentage }}</p><p>Volume: {{ game.volumePercentage }}</p>
            </div>
            <div>
               <p>Coin price: {{ game.coinPrice.toFixed(4) }}</p><p>Coins owned:{{ game.coinsOwned }}</p><p>Balance: {{ game.balance }}</p>
            </div>
            <div>
               <p>Game level: {{ game.level }}</p>
            </div>
         </div>
      </section>
    <button @click="handleCountClick">Count is: {{ count }}</button>
    <Menu :section="achievementsSection" ></Menu>
    <Menu :section="upgradesSection"></Menu>
    <PopUp v-if="popUp.isVisible"/>
   </main>
</template>

<style scoped>

</style>

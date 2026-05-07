<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameMetricsStore } from '../stores/gameMetrics';
import { useEndScreenStore } from '../stores/endScreen';
import Notification from './Notification.vue';
import EndScreen from './EndScreen.vue';
import Menu from './Menu.vue';
import Character from './Character.vue';
import logo from '../assets/logo.png';
import blank from '../assets/monitor/blank.png';
import up from '../assets/monitor/up.png';
import twoUp from '../assets/monitor/twoup.png';
import threeUp from '../assets/monitor/threeup.png';
import upDown from '../assets/monitor/up-down.png';
import twoUpDown from '../assets/monitor/twoup-down.png';
import threeUpDown from '../assets/monitor/threeup-down.png';
import neutralSvgRaw from '../assets/character/neutral.svg?raw';
import hypeOneSvgRaw from '../assets/character/hype-1.svg?raw';
import hypeTwoSvgRaw from '../assets/character/hype-2.svg?raw';
//import hypedSvgRaw from '../assets/character/hyped.svg?raw';
import clickSound from '../assets/sounds/click.mp3';
import { playSound } from '../helperFuncs';
import { useAchievementsStore } from "../stores/achievements";
import { useUpgradesStore } from '../stores/upgrades';
import SaveButton from './SaveButton.vue';
import UploadButton from './UploadButton.vue';
import FileUpload from './FileUpload.vue';
import { useSaveSystem } from "../stores/saveSystem";



defineProps<{}>()

const achievements = useAchievementsStore();
const upgrades = useUpgradesStore();
const game = useGameMetricsStore();
const endScreen = useEndScreenStore(); 
const currentCharacter = ref<string>(neutralSvgRaw);
const currentMonitor = ref<string>(blank);
const afk = ref<boolean>(false);
const afkTimeout = ref<number | null>(null)
const saveSystem = useSaveSystem();

const handleClick = () => {
   game.clickCount++;
   const priceIncrease = (game.cloutPower / game.volumePercentage) * 0.005;
   game.changeCoinPrice(Number(priceIncrease.toFixed(4)));

   const coinsSold = Number((15 * (game.volumePercentage / 100) * (1 + Math.log2(game.cloutPower + 1))).toFixed(0));
   game.changeCoinsOwned(-coinsSold);
   game.changeBalance(coinsSold * game.coinPrice);
   
   playSound(clickSound);
   updateUI();
   console.log(currentMonitor.value)
   console.log(`Coins sold: ${coinsSold}, New price: ${game.coinPrice.toFixed(4)}, Balance increase: ${game.balance.toFixed(2)}`);
}
const handleRugPull = () => {
   let coinsToSell;
   let gainedBalance;
   if (game.taxEvasion > 0) {
      game.taxEvasion--;
      coinsToSell = game.coinsOwned * 1;
      gainedBalance = coinsToSell * game.coinPrice;
      achievements.unlock(5);
   } else {
      coinsToSell = game.coinsOwned * (game.volumePercentage / 100);
      gainedBalance = coinsToSell * game.coinPrice;
   }

   game.changeBalance(Number(gainedBalance.toFixed(4)));
   game.changeHeatLevelPercentage(50);
   game.setCoinPrice(0.0001);
   game.setCoinsOwned(game.totalCoins + ((game.level + 1) * 2500));
   game.increaseLevel();
   game.setRugPull(true);

   if (game.volumePercentage >= 75) {
      achievements.unlock(2);
   }
};

const updateUI = () => {
   if (afkTimeout.value) {
      clearTimeout(afkTimeout.value)
   }

   switch (currentMonitor.value) {
      case up:
         currentMonitor.value = twoUp;
      break;
      case twoUp:
         currentMonitor.value = threeUp;
      break;
      default:
         currentMonitor.value = up;
      break;
   }
   switch (currentCharacter.value) {
      case hypeOneSvgRaw: 
         currentCharacter.value = hypeTwoSvgRaw;
      break;
      default:
         currentCharacter.value = hypeOneSvgRaw;
      break;
   }

   afkTimeout.value = setTimeout(() => {
      afk.value = true;
   }, 10000);
}

watch(afk, () => {
   if (afk.value === true) {
      saveSystem.saveToLocalStorage();
      switch (currentMonitor.value) {
         case up:
            currentMonitor.value = upDown
         break;
         case twoUp:
            currentMonitor.value = twoUpDown
         break;
         case threeUp:
            currentMonitor.value = threeUpDown
         break;
      }
      switch (currentCharacter.value) {
         default:
            currentCharacter.value = neutralSvgRaw;
         break;
      }
   }
   afk.value = false;
});
watch(() => game.heatLevelPercentage, (heat) => {
   console.log('heelo' + heat);
   saveSystem.saveToLocalStorage();
   if (heat > 90 && game.lives > 0) {
      game.lives--;
      endScreen.openModal('defeat', false, () => { game.setHeatLevelPercentage(0); game.setRugPull(null); game.setCoinPrice(0.0001); game.setCoinsOwned(20000)}, `You've been caught`, 'You managed to escape from the authorities');
      achievements.unlock(6);

      return;
   }
   else if (heat > 90) {
      endScreen.openModal('defeat', true, game.resetGame, `You've been caught`, 'You are a disgrace to the scammer community');
      achievements.unlock(6);

      return;
   }

   if (game.rugPull) {
      endScreen.openModal('victory', false, () => game.setRugPull(null), `Your crypto project was successful`, 'All scammer communities are proud of you');
      return;
   }
})
watch(() => game.coinsOwned, () => {
   if (game.coinsOwned <= 0 && game.lives > 0) {
      game.lives--;
      endScreen.openModal('defeat', false, () => { game.setHeatLevelPercentage(0); game.setRugPull(null); game.setCoinPrice(0.0001); game.setCoinsOwned(20000) }, `You've been caught`, 'You managed to escape from the authorities');
      achievements.unlock(6);
   }
   else if (game.coinsOwned <= 0) {
      endScreen.openModal('defeat', true, game.resetGame, `You've been caught`, 'You are a disgrace to the scammer community');
      achievements.unlock(6);
      achievements.unlock(7);
   }
});
watch(() => game.clickCount, () => {
   if (game.clickCount === 1) {
      achievements.unlock(0);
   }
});
watch(() => game.level, () => {
   if (game.level >= 5) {
      achievements.unlock(4);
   }
});
</script>

<template>
   <main
      :style="{ backgroundImage: `url(${game.background})` }"
      class="h-dvh w-screen bg-cover bg-top bg-no-repeat flex max-md:flex-col-reverse max-md:overflow-y-scroll gap-6 px-[clamp(8px,2vw,48px)] py-[clamp(6px,1.3vh,25px)]">
      <h1 class="fixed top-3 left-3 w-[clamp(150px,30vw,350px)]"><img :src="logo" alt="RugPullGame logo" class="w-full"></h1>

      <section id="click" 
         @click="handleClick"
         class="border border-black cursor-pointer basis-[500px] flex-shrink flex-grow-0 h-full flex justify-center items-end">
         <Character class="h-[400px]" :svgRaw="currentCharacter"/>
      </section>
      <div class="flex w-full max-xl:flex-col-reverse max-md:flex-col max-xl:items-center gap-4">
         <section id="monitor" class="basis-[500px] flex-shrink flex-grow-0 h-full max-md:h-auto flex flex-col">
            <img :src="currentMonitor" alt="monitor showing graph" class="mt-auto">
            
            <div class="flex flex-col gap-4 items-start bg-[#1a1a1a] text-gray-200 px-[clamp(12px,2vw,40px)] py-[clamp(10px,1vh,24px)]
               rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-[#2a2a2a] relative [mask-image:linear-gradient(#fff_0_0)] [mask-composite:exclude]">
                  <div class="w-full bg-black/40 px-2 py-1 rounded-md 
                              shadow-inner font-semibold flex justify-between gap-4 pl-5">
                     <p>Clout power: {{ game.cloutPower }}</p>
                     <p>Heat level: {{ game.heatLevelPercentage }}</p>
                     <p>Volume: {{ game.volumePercentage }}</p>
                  </div>
                  <div class="bg-black/40 px-2 py-1 rounded-md shadow-inner font-semibold flex gap-4 pl-5">
                     <p>Coin price: {{ game.coinPrice.toFixed(4) }}</p>
                     <p>Coins owned: {{ game.coinsOwned }}</p>
                  </div>
                  <div class="bg-black/40 px-2 py-1 rounded-md shadow-inner font-semibold flex gap-4 pl-5">
                     <p>Balance: {{ game.balance.toFixed(2) }}</p>
                  </div>
                  <div class="bg-black/40 px-2 py-1 rounded-md shadow-inner font-semibold flex gap-4 pl-5">
                     <p>Game level: {{ game.level }}</p>
                  </div>
                  <button
                     @click="handleRugPull"
                     class="
                        absolute bottom-4 right-4
                        px-4 py-2 font-bold uppercase tracking-wide
                        bg-[#e85a5a] text-[#ffffff]
                        border-[3px] border-[#8a2e2e]
                        shadow-[2px_2px_0_0_#c44747,5px_5px_0_0_#9e3a3a]
                        hover:shadow-[3px_3px_0_0_#d94f4f,6px_6px_0_0_#b04343]
                        active:shadow-[0_0_0_0_#c44747,0_0_0_0_#9e3a3a]
                        active:translate-x-[5px] active:translate-y-[5px]
                        transition-all">
                     Rug Pull
                  </button>
            </div>
         </section>
         <section id="menu" class="flex flex-col gap-3 w-[260px] h-full max-md:h-auto justify-center xl:ml-auto">
            <button>Click count: {{ game.clickCount }}</button>
            <Menu :heading="achievements.section.heading"></Menu>
            <Menu :heading="upgrades.section.heading"></Menu>
            <SaveButton />
            <UploadButton />
         </section>
      </div>

      <Notification />
      <EndScreen v-if="endScreen.isOpen" />
      <FileUpload />
   </main>
</template>

<style scoped>

</style>

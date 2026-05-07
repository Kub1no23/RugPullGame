<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './Button.vue'

const showTutorial = ref(false);
const dontShowAgain = ref(false);

onMounted(() => {
  if (localStorage.getItem('tip') !== 'false') {
    showTutorial.value = true
  }
})

const closeTutorial = () => {
  if (dontShowAgain.value) {
    localStorage.setItem('tip', 'false');
  } else {
    localStorage.setItem('tip', 'true');
  }
  showTutorial.value = false
}
</script>

<template>
  <div v-if="showTutorial" @click="closeTutorial" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div @click.stop class="bg-[#c8b8a8] text-[#2a1f1a] border-[3px] border-[#5a4a3a] shadow-[5px_5px_0_0_#7c6a58] rounded-md max-w-2xl w-full max-h-[80vh] overflow-hidden p-6 overflow-y-auto custom-scrollbar">
        <h2 class="text-xl font-bold mb-4">Tutorial</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-bold">1. Theme and Game Summary</h3>
            <p>The game is a satirical idle clicker that puts the player in the role of the founder of a scam crypto project. The goal is not to create useful technology, but to use manipulation, fake hype, and an army of bots/influencers to drive the price of your own token to astronomical heights and execute a "Rug Pull" at the right time – that is, withdraw all liquidity and disappear with the investors' money before the community sees through the scam.</p>
          </div>
          <div>
            <h3 class="font-bold">2. Core Logic</h3>
            <p>The core gameplay is based on balancing price growth and the risk of exposure:</p>
            <ul class="list-disc list-inside ml-4">
              <li>Hype & Clicking: By clicking, the player simulates activity on social networks, attracting investors and increasing the coin's price.</li>
              <li>Random Volume: Market volume changes randomly over time. The player must monitor this metric because a Rug Pull during high volume means bigger profits.</li>
              <li>The Rug Pull: The key decision. The player can press the button to end the project at any time. If done too early, the profit is small. If too late or at a bad time, arrest and game reset threaten.</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold">3. Key Metrics and Mechanics</h3>
            <p>The player must monitor their "Dashboard", which contains these metrics:</p>
            <div class="grid grid-cols-[minmax(120px,150px)_1fr] gap-0 mt-2 border border-[#5a4a3a]">
              <div class="font-bold border-r border-b border-[#5a4a3a] p-2 bg-[#b8a89a]">Clout Power</div>
              <div class="border-b border-[#5a4a3a] p-2">The strength of your influence. Determines how much the coin price increases per click.</div>
              <div class="font-bold border-r border-b border-[#5a4a3a] p-2 bg-[#b8a89a]">Heat</div>
              <div class="border-b border-[#5a4a3a] p-2">Suspicion indicator. If it reaches over 90%, the community abandons the coin and the authorities catch you.</div>
              <div class="font-bold border-r border-b border-[#5a4a3a] p-2 bg-[#b8a89a]">Volume</div>
              <div class="border-b border-[#5a4a3a] p-2">Current wave of market interest. Serves as a "profit multiplier" when ending the project. If volume is high it's harder to hype the price up, on the other hand you also sell more coins thus increasing your profit.</div>
              <div class="font-bold border-r border-b border-[#5a4a3a] p-2 bg-[#b8a89a]">Balance</div>
              <div class="border-b border-[#5a4a3a] p-2">Your real money "safe" in offshore accounts (obtained from previous game phases & selling coins in current phase to hype price up).</div>
              <div class="font-bold border-r border-b border-[#5a4a3a] p-2 bg-[#b8a89a]">Coins Owned</div>
              <div class="border-b border-[#5a4a3a] p-2">Number of tokens you hold and can "sell". If you lack the initative to rug pull and deplete your holdings you may face consequences depending on your modifiers.</div>
              <div class="font-bold border-r border-b border-[#5a4a3a] p-2 bg-[#b8a89a]">Coin Price</div>
              <div class="border-b border-[#5a4a3a] p-2">Current value of your token.</div>
              <div class="font-bold border-r border-[#5a4a3a] p-2 bg-[#b8a89a]">Game Level</div>
              <div class="p-2">Level of your crooked reputation (game), unlocks more advanced modifiers.</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold">4. Upgrades and Actions (Shop)</h3>
            <p>In the shop, the player buys modifiers that fundamentally affect the game progress and unlock gradually based on Game Level. They are divided into two categories:</p>
            <p><strong>A. Aggressive modifiers (High Risk / High Reward)</strong></p>
            <p>They increase the price or clout power, but generate high Heat.</p>
            <ul class="list-disc list-inside ml-4">
              <li>Bots Farm: Automatically hypes the price upwards (comments like "To the moon!").</li>
              <li>Deepfake Endorsement: Fake celebrity video that causes a price jump.</li>
              <li>Exchange Listing: Listing on a dubious exchange (massive price multiplier).</li>
            </ul>
            <p><strong>B. Defensive modifiers (Risk Mitigation)</strong></p>
            <p>They help keep the game running by calming investors and reducing Heat.</p>
            <ul class="list-disc list-inside ml-4">
              <li>Whitepaper Generator: Creates a nonsensical technical document that looks professional.</li>
              <li>Donate to Charity: Public donation of a small portion of the profit, which reduces suspicion.</li>
              <li>Celebrity Shield: Complete clearing of your identity by celebrity endorsement (expensive action).</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold">5. Achievements (Successes)</h3>
            <p>Achievements serve to motivate the player and improve User Experience through a sense of progress:</p>
            <ul class="list-disc list-inside ml-4">
              <li>"First Victim": First caught victim.</li>
              <li>"Exit Liquidity": Performing a Rug Pull exactly when Volume is at maximum.</li>
              <li>"Interpol's Most Wanted": Reaching the maximum Heat level without arrest.</li>
              <li>"Laguna Beach Villa": Purchasing the first property with "earned" money (visual background change).</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold">6. Game Goal</h3>
            <p>The goal of the game is to go through several cycles (each coin is one cycle). After each Rug Pull, the player returns to the beginning, but with permanent bonuses (e.g., higher base Clout Power), which allow them to scam even more people in the next round and eventually take over the entire global crypto market.</p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" v-model="dontShowAgain" class="sr-only peer" />
            <div class="w-5 h-5 border-2 border-[#5a4a3a] bg-[#c8b8a8] peer-checked:bg-[#2a1f1a] peer-checked:border-[#2a1f1a] rounded-sm flex items-center justify-center">
              <svg v-if="dontShowAgain" class="w-3 h-3 text-[#c8b8a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="ml-2">Don't show again</span>
          </label>
          <Button text="Close" @click="closeTutorial" />
        </div>
      </div>
    </div>
</template>

<style scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #ffffff transparent;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover, .custom-scrollbar::-webkit-scrollbar-thumb:active, .custom-scrollbar::-webkit-scrollbar-thumb:focus {
    background: #ffffff;
}
</style>
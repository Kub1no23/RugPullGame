<script setup lang="ts">
import GameWindow from './components/GameWindow.vue'
import Tutorial from './components/Tutorial.vue'
import { useSaveSystem } from "./stores/saveSystem";

const saveSystem = useSaveSystem();
saveSystem.loadFromLocalStorage();
</script>

<template>
    <GameWindow />
    <Tutorial />
</template>

<style scoped>
</style>

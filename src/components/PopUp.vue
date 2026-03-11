<script setup lang="ts">
import { ref} from 'vue'
import { usePopUpStore } from '../stores/popUp';

const popUp = usePopUpStore();
const visibleClass = ref('hide');

setTimeout(() => {
    visibleClass.value = 'show';
}, 0);


</script>

<template>
   <div style="position: fixed; bottom: 20px; border-radius: 20px; max-width: 400px; width: 60vw; background: #1a1a1a; border: 2px solid #646cff; padding: 20px; z-index: 1000; transition: right ease-out 0.5s;"
        :class="visibleClass">
        <p>{{ popUp.title }}</P>
        <p>{{ popUp.description }}</p>
   </div>
</template>

<style scoped>
    .show {
        right: 20px;
    }
    .hide {
        right: -450px;
    }
</style>
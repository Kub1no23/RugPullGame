<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePopUpStore } from '../stores/popUp';
import Card from './Card.vue';

const popUp = usePopUpStore();
const visibleClass = ref('hide');

watch(() => popUp.isVisible, (visible) => {
    if (!visible) {
      visibleClass.value = 'hide'
    } else {
      setTimeout(() => {
        visibleClass.value = 'show'
    }, 0)}}
)

</script>

<template>
    <Card v-if="popUp.isVisible" :class="visibleClass" class="z-[100] fixed bottom-5 max-w-[400px] w-[60vw]">
        <p>{{ popUp.title }}</p>
        <p>{{ popUp.description }}</p>
    </Card>
</template>

<style scoped>
    .show {
        right: 20px;
        transition: right 0.6s ease;
    }
    .hide {
        right: -450px;
    }
</style>
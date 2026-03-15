<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  svgRaw: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), { color: '#FFFFFF' });

const svgHtml = computed(() => {
  return props.svgRaw
    .replace(/width="[^"]*"/g, '')
    .replace(/height="[^"]*"/g, '')
    .replace(/<svg([^>]*)>/, `<svg$1 width="100%" height="100%">`)
    .replace(/fill="[^"]*"/g, `fill="${props.color}"`)
    .replace(/stroke="[^"]*"/g, `stroke="${props.color}"`)
})


</script>

<template>
    <div v-html="svgHtml" />
</template>

<style scoped>
    :deep(.character svg path) {
        fill: var(--char-color);
        stroke: var(--char-color);
    }
</style>
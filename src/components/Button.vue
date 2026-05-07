<script setup lang="ts">
const emit = defineEmits(["click"])
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <button @click="emit('click')"
    class="
      px-4 py-2 font-bold uppercase tracking-wide
      bg-[#c8b8a8] text-[#2a1f1a]
      border-[3px] border-[#5a4a3a]
      shadow-[3px_3px_0_0_#a08f7e,7px_7px_0_0_#7c6a58]
      hover:shadow-[4px_4px_0_0_#b8a89a,9px_9px_0_0_#8f7c6a]
      active:shadow-[0_0_0_0_#a08f7e,0_0_0_0_#7c6a58]
      active:translate-x-[5px] active:translate-y-[5px]
      transition-all">
    {{ text }}
  </button>
</template>


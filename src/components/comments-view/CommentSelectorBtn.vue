<template>
  <button
    class="px-2 py-1 rounded text-sm cursor-pointer transition-all duration-200 ease-in-out bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"
  >
    {{ text }}
  </button>
</template>
<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

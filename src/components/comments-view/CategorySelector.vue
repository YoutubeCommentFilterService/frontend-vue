<template>
  <div v-if="categoryArray.length">
    <div class="font-semibold">{{ categoryName }}</div>
    <div class="flex gap-2">
      <button
        v-for="(category, idx) in categoryArray"
        :key="idx"
        @click="toggleCategory(categoryType, category)"
        class="px-2 py-1 border rounded text-sm cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-600"
        :class="{
          'bg-gray-500 text-white border-gray-600 ': isSelected(categoryType, category),
          'bg-gray-100 text-gray-600 border-gray-200': !isSelected(categoryType, category),
        }"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  categoryArray: {
    type: Array,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryType: {
    type: String,
    required: true,
  },
  toggleCategory: {
    type: Function,
    required: true,
  },
  isSelected: {
    type: Function,
    required: true,
  },
})
</script>

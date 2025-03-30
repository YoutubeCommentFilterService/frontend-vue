<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- 배경 오버레이 - 투명도 40%로 조정 (60% 투명) -->
    <div class="absolute inset-0 bg-gray-500/50" @click="$emit('update:modelValue', false)"></div>

    <!-- 모달 카드 -->
    <div class="relative bg-white dark:bg-gray-200 rounded-lg shadow-xl w-full max-w-md p-6 z-10">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-6">{{ message }}</p>

      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('update:modelValue', false)"
          class="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-300 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          @click="onConfirm"
          class="px-4 py-2 text-sm font-medium text-white bg-red-500 dark:bg-red-400 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: '확인',
  },
  message: {
    type: String,
    default: '이 작업을 수행하시겠습니까?',
  },
  confirmText: {
    type: String,
    default: '확인',
  },
  cancelText: {
    type: String,
    default: '취소',
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const onConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

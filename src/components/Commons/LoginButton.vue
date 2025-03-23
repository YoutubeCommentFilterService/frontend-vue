<template>
    <button
        @click="login ? login() : null"
        class="mt-6 flex items-center cursor-pointer justify-between gap-3 border-1 border-gray-300 text-gray-800 px-6 py-3 rounded-lg w-60 mx-auto shadow-md transition-all hover:bg-gray-100 hover:border-gray-400"
        :class="bgColor"
      >
        <img :src="icon" :alt="loginType" class="w-6 h-6">
        <div class="flex-grow">
          <span class="text-lg font-semibold"> {{ loginType }}</span>
        </div>
    </button>
</template>
<script lang="ts" setup>
const props = defineProps({
  login: {
    type: Function,
    required: false,
    default: () => {}
  },
  loginType: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
    default: "bg-white"
  },
  icon: {
    type: String,
    required: true,
  }
})
</script>
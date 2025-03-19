<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
      <h1 class="text-3xl font-bold text-gray-900">로그인</h1>
      <p class="text-gray-500 mt-2">Google 계정으로 간편하게 로그인하세요</p>

      <button
        @click="handleLogin"
        class="mt-6 flex items-center justify-center gap-3 bg-purple-600 text-white px-6 py-3 rounded-xl w-full shadow-md transition-all hover:bg-white hover:text-purple-600 hover:border hover:border-purple-600"
      >
        <img :src="GoogleLoginIcon" alt="구글 로그인" class="w-6 h-6">
        <span class="text-lg font-semibold">Google 로그인</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import GoogleLoginIcon from '../components/icons/web_light_sq_ctn.svg';
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorize/google`
  }
</script>

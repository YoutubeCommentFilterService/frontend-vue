<template>
  <div class="flex  flex-grow items-center justify-center">
    <div class="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
      <h1 class="text-3xl font-bold text-gray-900">로그인</h1>
      <p class="text-gray-500 mt-2">Google 계정으로 간편하게 로그인하세요</p>

      <LoginButton
        :login="handleGoogleLogin"
        loginType="Google 로그인"
        bgColor="bg-white"
        :icon="GoogleLoginIcon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import GoogleLoginIcon from '@/components/icons/g-logo.webp';
  import LoginButton from '@/components/Commons/LoginButton.vue';
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorize/google`
  }
</script>

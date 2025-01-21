<template>
  <p>로그인 중입니다...</p>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

fetch("http://localhost:8080/member/refresh-token", {
  credentials: 'include',
})
  .then((res) => res.json())
  .then((json) => {
    localStorage.setItem("refresh_token", json.refreshToken)
    authStore.login();
    router.push("/");
  })
  .catch((err) => console.log(err));

</script>
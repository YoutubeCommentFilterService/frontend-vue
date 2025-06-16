<template>
  <div>
    <button @click="reloginGoogle">구글 재연동</button>
    <button @click="withdrawService">회원 탈퇴</button>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script setup lang="ts">
import { tokenAxiosInstance } from '@/utils/axios-instance'
import { useAuthStore } from '@/stores/auth'
import { useVideoStore } from '@/stores/video'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const videoStore = useVideoStore()
const router = useRouter()

const reloginGoogle = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorize/google`
}

const withdrawService = async () => {
  try {
    await tokenAxiosInstance.delete('/member')
    await logout()
  } catch (err) {
    console.log(err)
  }
}

const logout = async () => {
  authStore.logout()
  videoStore.flush()
  router.replace('/')
}

onMounted(() => {
  if (!authStore.isLoggedIn) {
    alert('로그인을 먼저 해주세요')
    router.replace('/')
  }
})
</script>

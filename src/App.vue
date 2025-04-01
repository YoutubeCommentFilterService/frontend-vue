<template>
  <div id="app" class="h-screen flex flex-col">
    <Header />
    <!-- main-content  -->
    <main class="flex-grow flex overflow-y-auto">
      <div class="hidden lg:flex flex-grow bg-gray-100 items-center justify-center">
        <ins
          class="kakao_ad_area"
          style="display: none"
          data-ad-unit="DAN-vOzU50P1ln9wdaO6"
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
      </div>
      <div class="flex w-full max-w-7xl">
        <RouterView class="bg-white dark:bg-gray-300" />
      </div>
      <div class="hidden lg:flex flex-grow bg-gray-100 items-center justify-center">
        <ins
          class="kakao_ad_area"
          style="display: none"
          data-ad-unit="DAN-1njAgw7cXtts9jcy"
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
      </div>
    </main>

    <!-- 푸터 -->
    <footer class="py-2 bg-gray-50 dark:bg-gray-300 border-t border-gray-200 flex-shrink-0">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex flex-col md:flex-row justify-center items-center">
          <div class="flex space-x-6">
            <router-link
              to="/privacy-google"
              class="text-gray-600 hover:text-gray-900 hover:underline text-sm"
            >
              개인정보 이용
            </router-link>
            <a
              href="mailto:blue.h.sh.0.0@gmail.com"
              class="text-gray-600 hover:text-gray-900 hover:underline text-sm"
            >
              문의하기
            </a>
          </div>
        </div>
        <div class="text-gray-500 text-sm">
          <p>&copy; 2025 유튜브 스팸 댓글 제거. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/contents/Header.vue'
import { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN } from '@/utils'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useVideoStore } from '@/stores/video'
import type { UserProfile } from '@/types/after-login-interface'
import { useThemeStore } from './stores/theme'

const authStore = useAuthStore()
const videoStore = useVideoStore()
const themeStore = useThemeStore()

const adLoaded = () => {
  console.info('Ad loaded')
}

onMounted(() => {
  const refreshToken: string | null = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
  themeStore.loadTheme()
  authStore.restore()
  authStore.clearLocalStorage()
  if (refreshToken) {
    tokenAxiosInstance
      .post<UserProfile>('/api/member/refresh-auth', { refreshToken })
      .then(({ data }) => {
        authStore.login(data)
      })
      .then(() => {
        videoStore.restore()
      })
  }

  window.addEventListener('beforeunload', () => {
    videoStore.backup()
    authStore.backup()
  })
})
</script>

<style>
@media (max-width: 1600px) {
  /* 1600px 이하일 때 숨김 */
  .kakao_ad_area {
    display: none !important;
  }
}
</style>

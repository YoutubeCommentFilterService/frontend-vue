<template>
  <header class="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 왼쪽: 타이틀 -->
        <RouterLink to="/" class="flex items-center">
          <span
            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text tracking-tight"
          >
            TITLE
          </span>
        </RouterLink>

        <!-- 오른쪽: 네비게이션 -->
        <nav class="flex items-center space-x-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="p-2 font-medium text-gray-700 transition-all duration-200 border-b-2 border-transparent hover:border-b-2 hover:border-gray-300"
            active-class="border-b-2 !border-blue-500 font-extrabold"
          >
            {{ link.name }}
          </RouterLink>
          <div v-if="authStore.isLoggedIn" class="text-xs flex flex-col items-center select-none">
            <span class="select-none">Youtube 연동</span>
            <span class="select-none">{{ authStore.profile.hasYoutubeAccess ? '🟢' : '🔴' }}</span>
          </div>
          <!-- 로그인 버튼 -->
          <div
            class="flex ml-4 w-10 h-10 items-center justify-center transition-all duration-200 hover:opacity-90"
            :class="{
              'rounded-full shadow-sm': !authStore.isLoggedIn,
              'bg-gradient-to-r from-blue-500 to-purple-600': !authStore.isLoggedIn,
            }"
          >
            <RouterLink
              v-if="!authStore.isLoggedIn"
              to="login"
              class="flex items-center gap-2 px-2 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition-transform hover:shadow-md hover:scale-105"
            >
              <i class="pi pi-sign-in text-white text-base"></i>
            </RouterLink>
            <div v-else class="relative">
              <img
                :src="authStore.profile.profileImage"
                @click="handleClickUserMenu"
                class="w-10 h-10 rounded-full cursor-pointer object-cover ring-2 ring-gray-200 transition-all relative"
                alt="Profile"
              />
              <div
                v-show="isUserMenuVisible"
                ref="userMenu"
                class="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-xl z-50 transform transition-all duration-200 origin-top-right"
              >
                <div class="flex items-center p-4 border-b border-gray-100 bg-gray-50 select-none">
                  <img
                    :src="authStore.profile.profileImage"
                    class="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200"
                    alt="Profile"
                    draggable="false"
                  />
                  <div class="ml-3">
                    <p class="text-base font-medium text-gray-800">
                      {{ authStore.profile.nickname }}
                    </p>
                  </div>
                </div>

                <div class="py-1 select-none">
                  <div
                    @click="reloginGoogle"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-sync mr-3 text-blue-500"></i> 구글 재연동
                  </div>
                  <div
                    @click="logout"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-sign-out mr-3 text-gray-500"></i> 로그아웃
                  </div>
                  <div class="border-t border-gray-100 my-1"></div>
                  <div
                    @click="withdrawService"
                    class="flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-user-minus mr-3"></i> 회원탈퇴
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <ConfirmModal
      v-model="showWithdrawModal"
      title="회원 탈퇴"
      message="정말 회원 탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      confirm-text="탈퇴"
      @confirm="confirmWithdraw"
    />
  </header>
</template>

<script setup lang="ts">
import ConfirmModal from '@/components/ConfirmModal.vue'
import { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN } from '@/utils'
import { useAuthStore } from '@/stores/auth'
import { useVideoStore } from '@/stores/video'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const authStore = useAuthStore()
const videoStore = useVideoStore()
const router = useRouter()

const reloginGoogle = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorize/google`
}

const navLinks = ref([
  { name: '내 동영상', path: '/videos' },
  // 필요하면 더 추가 가능
])

const showWithdrawModal = ref(false)

const confirmWithdraw = async () => {
  try {
    await tokenAxiosInstance.delete('/api/member')
    await logout()
  } catch (err) {
    console.error(err)
  }
}

const withdrawService = () => {
  showWithdrawModal.value = true
}

const logout = async () => {
  authStore.logout()
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN)
  videoStore.flush()
  router.replace('/')
}

const isUserMenuVisible = ref<boolean>(false)
const userMenu = ref<HTMLElement | null>(null)

const handleClickUserMenu = (event: MouseEvent) => {
  event.stopPropagation()
  isUserMenuVisible.value = true
}

const handleClickOutside = (event: MouseEvent) => {
  event.stopPropagation()
  if (userMenu.value && !userMenu.value.contains(event.target as Node) && isUserMenuVisible.value) {
    isUserMenuVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.addEventListener('click', handleClickOutside)
})
</script>

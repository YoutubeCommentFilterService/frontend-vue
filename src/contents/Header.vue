<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm dark:shadow-md sticky top-0 z-30 border-b border-gray-100 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 왼쪽: 타이틀 -->
        <RouterLink to="/" class="flex items-center">
          <span
            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 text-transparent bg-clip-text tracking-tight"
          >
            유댓청소
          </span>
        </RouterLink>

        <!-- 오른쪽: 네비게이션 -->
        <nav class="flex items-center space-x-6 text-gray-700 dark:text-gray-300">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="p-2 font-medium transition-all duration-200 border-b-2 border-transparent hover:border-b-2 hover:border-gray-300"
            active-class="border-b-2 !border-blue-500 font-extrabold"
          >
            {{ link.name }}
          </RouterLink>
          <div
            v-if="authStore.isLoggedIn"
            class="text-xs flex flex-col items-center select-none gap-1"
          >
            <span class="select-none">Youtube 연동</span>
            <span class="select-none">{{ authStore.profile.hasYoutubeAccess ? '🟢' : '🔴' }}</span>
          </div>
          <div class="text-xs w-30">
            <label
              class="flex flex-col w-full items-center me-5 cursor-pointer justify-center gap-1"
            >
              <p class="font-medium text-gray-900 dark:text-gray-300 select-none">
                {{ (themeStore.isDarkMode ? '화이트' : '다크') + '모드로 전환' }}
              </p>
              <div>
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer w-16"
                  :checked="themeStore.isDarkMode"
                  @click="toggleTheme"
                />
                <div
                  class="relative justify-center w-12 h-4 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600 transition-all"
                >
                  <!-- 이미지 (해/달) -->
                  <img
                    :src="themeStore.isDarkMode ? '/imgs/moon.png' : '/imgs/sun.png'"
                    class="absolute h-3 w-3 top-0.5 pointer-events-none z-10 select-none transition-all duration-300 ease-in-out"
                    :class="themeStore.isDarkMode ? 'translate-x-[2.25rem]' : 'translate-x-0.5'"
                    alt="Theme icon"
                  />
                  <!-- 움직이는 공 -->
                  <div
                    class="absolute h-4 w-4 bg-white rounded-full border border-gray-300 transition-all duration-300 ease-in-out"
                    :class="
                      themeStore.isDarkMode
                        ? 'translate-x-[2.1rem] bg-yellow-600 border-gray-600'
                        : 'translate-x'
                    "
                  ></div>
                </div>
              </div>
            </label>
          </div>
          <!-- 로그인 버튼 -->
          <div
            class="flex ml-4 w-10 h-10 items-center justify-center transition-all duration-200"
            :class="{
              'rounded-full shadow-sm bg-gradient-to-r from-blue-500 to-purple-600':
                !authStore.isLoggedIn,
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
              <!-- 프로필 이미지 섹션 -->
              <img
                :src="authStore.profile.profileImage"
                @click="handleClickUserMenu"
                class="w-10 h-10 rounded-full cursor-pointer object-cover ring-1 ring-gray-200 transition-all relative"
                alt="Profile"
              />
              <div
                v-show="isUserMenuVisible"
                ref="userMenu"
                class="absolute right-0 mt-3 w-56 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-b-xl z-50 transform transition-all duration-200 origin-top-right"
              >
                <div class="flex items-center p-4 select-none">
                  <img
                    :src="authStore.profile.profileImage"
                    class="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200"
                    alt="Profile"
                    draggable="false"
                  />
                  <div class="ml-3">
                    <p class="text-base font-medium">
                      {{ authStore.profile.nickname }}
                    </p>
                  </div>
                </div>
                <div class="border-t border-gray-100 dark:border-gray-300 my-1"></div>
                <div class="py-1 select-none text-sm">
                  <div
                    v-if="authStore.profile.role == 'ADMIN'"
                    @click="router.push('/admin')"
                    class="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-address-book mr-3 text-red-500 dark:text-red-400"></i>
                    <p>어드민 페이지</p>
                  </div>
                  <div
                    @click="reloginGoogle"
                    class="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-sync mr-3 text-blue-500 dark:text-blue-400"></i>
                    <p>구글 재연동</p>
                  </div>
                  <div
                    @click="logout"
                    class="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-sign-out mr-3 text-gray-500 dark:text-gray-400"></i>
                    <p>로그아웃</p>
                  </div>
                  <div class="border-t border-gray-100 dark:border-gray-300 my-1"></div>
                  <div
                    @click="() => (showWithdrawModal = true)"
                    class="flex items-center px-4 py-3 hover:bg-red-50 dark:hover:bg-red-200 cursor-pointer transition-colors"
                  >
                    <i class="pi pi-user-minus mr-3 text-red-500 dark:text-red-400"></i>
                    <p class="text-red-500 dark:text-red-400">회원탈퇴</p>
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
      id="member-withdraw"
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
import { useThemeStore } from '@/stores/theme'

const authStore = useAuthStore()
const videoStore = useVideoStore()
const themeStore = useThemeStore()
const router = useRouter()

const toggleTheme = () => {
  themeStore.toggleTheme()
}

interface OAuthRedirectTo {
  redirectTo: string
}

const reloginGoogle = async () => {
  const { data } = await tokenAxiosInstance.get<OAuthRedirectTo>('/api/member/resync')
  authStore.logout()
  window.location.href = data.redirectTo
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

const logout = async () => {
  await tokenAxiosInstance.post('/api/member/logout')
  authStore.logout()
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

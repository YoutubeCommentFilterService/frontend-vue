<template>
  <header class="bg-white shadow-md w-full">
    <div class="flex justify-between items-center px-8 py-4 border-b">
      <!-- 왼쪽: 타이틀 -->
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">title</h1>

      <!-- 오른쪽: 네비게이션 -->
      <nav class="flex items-center gap-8">
        <RouterLink to="/" class="nav-item">Home</RouterLink>
        <RouterLink to="/videos" class="nav-item">Spams</RouterLink>
        <RouterLink to="/recent" class="nav-item">최근 댓글</RouterLink>

        <!-- 로그인 버튼 -->
        <div class="flex ml-6 bg-purple-600 w-10 h-10 justify-center align-center rounded-lg">
          <RouterLink v-if="!authStore.isLoggedIn" to="login"
                      class="login-btn flex items-center justify-center">
            <i class="pi pi-sign-in text-white text-lg"></i>
          </RouterLink>

          <div v-else class="relative">
            <img :src="authStore.profile.profileImage" @click="handleClickUserMenu"
                 class="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-300 hover:border-purple-500 transition-all">
            <div v-show="isUserMenuVisible" ref="userMenu"
                 class="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden z-10">
              <div class="flex items-center px-5 py-4 border-b">
                <img :src="authStore.profile.profileImage" class="w-10 h-10 rounded-full">
                <p class="ml-4 text-lg font-medium text-gray-800">{{ authStore.profile.nickname }}</p>
              </div>
              <div @click="reloginGoogle" class="menu-item"><i class="pi pi-sync"></i> 구글 재연동</div>
              <div @click="logout" class="menu-item"><i class="pi pi-sign-out"></i> 로그아웃</div>
              <div @click="withdrawService" class="menu-item text-red-500"><i class="pi pi-user-minus"></i> 회원탈퇴</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN } from '@/utils';
import { useAuthStore } from '@/stores/auth';
import { useVideoStore } from '@/stores/video';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';

const authStore = useAuthStore();
const videoStore = useVideoStore();
const router = useRouter();

const reloginGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorize/google";
}

const withdrawService = async () => {
    try {
        await tokenAxiosInstance.delete("/api/member");
        await logout();
    } catch (err) {
        console.log(err);
    }
}

const logout = async () => {
    authStore.logout();
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    videoStore.flush();
    router.replace("/");
}


const isUserMenuVisible = ref<boolean>(false)
const userMenu = ref<HTMLElement | null>(null);

const handleClickUserMenu = (event: MouseEvent) => {
  event.stopPropagation();
  isUserMenuVisible.value = true;
}

const handleClickOutside = (event: MouseEvent) => {
  event.stopPropagation();
  if (userMenu.value && !userMenu.value.contains(event.target as Node) && isUserMenuVisible.value) {
    isUserMenuVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
  window.addEventListener('click', handleClickOutside);
})
</script>

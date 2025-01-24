<template>
  <header class="header">
    <div class="header-top">
      <div class="header-left"></div>
      <h1 class="title">title</h1>
      <div class="header-right">
        <div v-if="authStore.isLoggedIn">
          <i class="pi pi-user user-menu-icon" @click="handleClickUserMenu"></i>
          <div v-show="isUserMenuVisible" ref="userMenu" class="user-menu" @click.stop>
            <div @click="reloginGoogle"><i class="pi pi-sync"></i> 구글 재연동</div>
            <div @click="logout"><i class="pi pi-sign-out"></i> 로그아웃</div>
            <div @click="withdrawService"><i class="pi pi-user-minus"></i> 회원탈퇴</div>
          </div>
        </div>
        <RouterLink v-else to="login" class="pi pi-sign-in"></RouterLink>
      </div>
    </div>
    <nav class="navigation">
      <div class="header-left"></div>
      <RouterLink to="/" class="nav-item">Home</RouterLink>
      <RouterLink to="/videos" class="nav-item">Spams</RouterLink>
      <RouterLink to="/recent" class="nav-item">최근 댓글</RouterLink>
      <RouterLink to="/inf-scroll" class="nav-item">무한스크롤</RouterLink>
      <div class="header-right"></div>
    </nav>
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
        await tokenAxiosInstance.delete("/member");
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

<style scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #000;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #000;
}

.title {
  margin: 0;
  font-size: 1.5rem;
}

.navigation {
    justify-content: space-between;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;  /* 메뉴 항목 간 간격 */
}

.nav-item {
  text-decoration: none;
  color: #000;
}

.nav-item:hover {
  text-decoration: underline;
}

.header-left, .header-right {
 margin: 0;
 font-size: 1.5rem;
}

.user-menu-icon:hover {
  cursor: pointer;
}

.user-menu {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);  /* 메뉴에 그림자 효과 추가 */
  padding: 10px;
  width: 200px;  /* 메뉴의 너비 설정 */
  z-index: 1000;  /* 메뉴가 다른 요소들 위에 떠서 표시되도록 설정 */
}

.user-menu div {
  padding: 8px 0;
  cursor: pointer;
}
.user-menu div:hover {
  background-color: #f4f4f4;  /* 메뉴 항목에 마우스 오버 시 배경색 변경 */
}
</style>
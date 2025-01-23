<template>
    <header class="header">
      <div class="header-top">
        <div class="header-left"></div>
        <h1 class="title">title</h1>
        <div class="header-right">
            <RouterLink v-if="authStore.isLoggedIn" to="my-page" class="login-btn">my page</RouterLink>
            <RouterLink v-else to="login" class="login-btn">login</RouterLink>
        </div>
      </div>
      <nav class="navigation">
        <div class="header-left"></div>
        <RouterLink to="/" class="nav-item">Home</RouterLink>
        <RouterLink to="/videos" class="nav-item">Spams</RouterLink>
        <div class="header-right"></div>
      </nav>
    </header>
  </template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();


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

.login-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  background: none;
  cursor: pointer;
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
</style>
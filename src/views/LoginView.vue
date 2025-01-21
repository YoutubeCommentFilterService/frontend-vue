<template>
  <div class="page">
    <div class="login-container">
      <h1>Login</h1>
      <p ></p>
      <img class="google" :src="GoogleLoginIcon" alt="구글 로그인" @click="handleLogin">
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import GoogleLoginIcon from '../components/icons/web_light_sq_ctn.svg';

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorize/google'
  }
  
</script>

<style scoped>
.page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.google:hover {
  cursor: pointer;
}
</style>
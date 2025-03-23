<template>
  <div class="flex overflow-y-auto flex-grow justify-center">
    <p v-if="!isNewMember" class="flex items-center">
      로그인 중입니다...
      <span class="ml-2 w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></span>
    </p>
    <div v-else>
      <ConcenredPrivacyGoogle />
      <div class="flex justify-center gap-5 mt-7 mb-7 pb-12">
        <button class="reject-button" @click="rejectConsent">거부</button>
        <button class="submit-button" @click="submitConsent">동의</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { AfterLoginDto, IsNewMember } from '@/types/after-login-interface'
import { LOCAL_STORAGE_REFRESH_TOKEN, tokenAxiosInstance } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ConcenredPrivacyGoogle from '@/components/ConcernedPrivacyGoogle.vue'

const router = useRouter()
const authStore = useAuthStore()

const isNewMember = ref<boolean>(false)

onMounted(async () => {
  try {
    const {data} = await tokenAxiosInstance.get<IsNewMember>('/api/member/check-new', { timeout: 1000 })
    if (data.isNewMember === true) isNewMember.value = data.isNewMember
    else await getRefreshToken()
  } catch (e) {
     // TODO: 추후 home으로 이동
    isNewMember.value = true
  } 
})

const submitConsent = async () => {
  await tokenAxiosInstance
    .post<AfterLoginDto>('/api/member/accept-signin')
    .then((res) => res.data)
    .then(async () => {
      await getRefreshToken()
      router.push('/')
    })
}

const rejectConsent = async () => {
  await tokenAxiosInstance
    .post<AfterLoginDto>('/api/member/reject-signin')
    .then((res) => res.data)
    .then((data) => {
      console.log(data)
      router.push('/')
    })
}

const getRefreshToken = async () => {
  await tokenAxiosInstance
    .get<AfterLoginDto>('/api/member/refresh-token')
    .then((res) => res.data)
    .then((data) => {
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken)
      authStore.login(data)
      router.push('/')
    })
    .catch((err) => console.error(err))
}
</script>

<style lang="css" scoped>
.privacy-consent-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
  margin-bottom: 3em;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

h2 {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.consent-section {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.info-header {
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  display: flex;
  align-items: baseline;
}

.toggle-icon {
  margin-right: 5px;
  font-size: 12px;
  color: #666;
}

.info-details {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
}

ul {
  padding-left: 20px;
}

.submit-button,
.reject-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button {
  background-color: #4caf50;
  color: white;
}

.reject-button {
  background-color: #f44336;
  color: white;
}
</style>

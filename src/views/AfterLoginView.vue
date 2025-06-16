<template>
  <div class="flex overflow-y-auto flex-grow justify-center">
    <p v-if="!isNewMember" class="flex items-center">
      로그인 중입니다...
      <span
        class="ml-2 w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
      ></span>
    </p>
    <div v-else>
      <ConcenredPrivacyGoogle />
      <div class="flex justify-center gap-5 mt-7 mb-7 pb-12">
        <button
          class="px-5 py-2.5 border-none rounded text-[16px] cursor-pointer bg-red-500 text-white"
          @click="rejectConsent"
        >
          거부
        </button>
        <button
          class="px-5 py-2.5 border-none rounded text-[16px] cursor-pointer bg-green-500 text-white"
          @click="submitConsent"
        >
          동의
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { AfterLoginDto, IsNewMember } from '@/types/after-login-interface'
import { LOCAL_STORAGE_REFRESH_TOKEN, tokenAxiosInstance } from '@/utils/axios-instance'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ConcenredPrivacyGoogle from '@/components/ConcernedPrivacyGoogle.vue'

const router = useRouter()
const authStore = useAuthStore()

const isNewMember = ref<boolean>(false)

onMounted(async () => {
  try {
    const { data } = await tokenAxiosInstance.get<IsNewMember>('/api/member/check-new', {
      timeout: 1000,
    })
    if (data.isNewMember === true) isNewMember.value = data.isNewMember
    else await getRefreshToken()
  } catch (e) {
    // TODO: 추후 home으로 이동
    isNewMember.value = true
  }
})

const submitConsent = async () => {
  await tokenAxiosInstance.post<AfterLoginDto>('/api/member/accept-signin').then(async () => {
    await getRefreshToken()
    router.push('/')
  })
}

const rejectConsent = async () => {
  await tokenAxiosInstance
    .post<AfterLoginDto>('/api/member/reject-signin')
    .then(() => router.push('/'))
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

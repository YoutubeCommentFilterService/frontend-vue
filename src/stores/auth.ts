import type { UserProfile } from '@/types/after-login-interface'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const nickname = ref<string>('')
  const profileImage = ref<string>('')
  const hasYoutubeAccess = ref<boolean>(false)
  const channelId = ref<string>('')
  const role = ref<string>('')

  const localStorageKey = 'auth-store'

  const login = (profile: UserProfile) => {
    isLoggedIn.value = true
    nickname.value = profile.nickname
    profileImage.value = profile.profileImage
    hasYoutubeAccess.value = profile.hasYoutubeAccess
    role.value = profile.role
  }

  const logout = () => {
    isLoggedIn.value = false
    nickname.value = ''
    profileImage.value = ''
    hasYoutubeAccess.value = false
    role.value = ''
  }

  const profile = computed(() => ({
    nickname: nickname?.value
                ? nickname?.value
                : '연동을 해주세요!',
    profileImage: profileImage.value || '/default-user.svg',
    hasYoutubeAccess: hasYoutubeAccess.value || null,
    role: role.value || null
  }))

  const backup = () => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        isLoggedIn: isLoggedIn.value,
        nickname: nickname.value,
        profileImage: profileImage.value,
        hasYoutubeAccess: hasYoutubeAccess.value,
        channelId: channelId.value,
      }),
    )
  }
  const restore = () => {
    const savedState = localStorage.getItem(localStorageKey)
    if (savedState) {
      const states: AuthJSONBackupData = JSON.parse(savedState)
      isLoggedIn.value = states.isLoggedIn
      nickname.value = states.nickname
      profileImage.value = states.profileImage
      hasYoutubeAccess.value = states.hasYoutubeAccess
      channelId.value = states.channelId
    }
  }
  const clearLocalStorage = () => {
    localStorage.removeItem(localStorageKey)
  }

  return { 
    isLoggedIn, login, logout, 
    profile,
    backup, restore, clearLocalStorage 
  }
})

interface AuthJSONBackupData {
  isLoggedIn: boolean
  nickname: string
  profileImage: string
  hasYoutubeAccess: boolean
  channelId: string
  role: string
}

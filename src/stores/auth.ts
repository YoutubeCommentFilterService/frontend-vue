import type { UserProfile } from "@/types/after-login-interface"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const nickname = ref<string>("")
  const profileImage = ref<string>("")
  const hasYoutubeAccess = ref<boolean>(false)

  const login = (profile: UserProfile) => {
    isLoggedIn.value = true;
    nickname.value = profile.nickname;
    profileImage.value = profile.profileImage;
    hasYoutubeAccess.value = profile.hasYoutubeAccess;
  }

  const logout = () => {
    isLoggedIn.value = false
    nickname.value = "";
    profileImage.value = "";
    hasYoutubeAccess.value = false;
  }

  const profile = computed(() => ({
      nickname: nickname.value || "로그인을 해주세요!", 
      profileImage: profileImage.value || "/default-user.svg",
      hasYoutubeAccess: hasYoutubeAccess.value || null
  }))

  return { isLoggedIn, login, logout, profile }
})

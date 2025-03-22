<template>
  <div style="display: flex; overflow-y: auto; flex-grow: 1">
    <p v-if="!isNewMember">로그인 중입니다...</p>
    <div v-if="isNewMember" class="privacy-consent-form">
      <h1>개인정보 수집 및 이용 동의서</h1>

      <section class="consent-section">
        <h2>1. 개인정보 수집 및 이용 목적</h2>
        <p>
          당사는 회원 가입, 서비스 제공, 고객 지원 및 서비스 개선을 위해 아래와 같은 개인정보를
          수집하고 있습니다.
        </p>
      </section>

      <section class="consent-section">
        <h2>2. 수집하는 개인정보 항목</h2>
        <div class="info-item">
          <div class="info-header" @click="toggleInfo('googleInfo')">
            <span class="toggle-icon">{{ showGoogleInfo ? '▼' : '▶' }}</span>
            <strong>Google 계정 정보</strong>: Google Refresh Token, Google Access Token, Google
            닉네임, Google 프로필 이미지
          </div>
          <div class="info-details" v-if="showGoogleInfo">
            <ul>
              <li>
                <strong>Google Refresh Token</strong>: 이 토큰은 본 프로젝트에서만 사용되며,
                사용자의 재인증 없이 Google 서비스에 접근하기 위해 보관됩니다.
              </li>
              <li>
                <strong>Google Access Token</strong>: 이 토큰은 본 프로젝트에서만 사용되며, Google
                API 호출 시 인증을 위해 사용됩니다. 토큰은 암호화되어 저장됩니다.
              </li>
              <li>
                <strong>Google 닉네임</strong>: 서비스 내에서 사용자를 식별하는 데 사용됩니다.
              </li>
              <li>
                <strong>Google 프로필 이미지</strong>: 서비스 내에서 사용자의 프로필 표시에
                사용됩니다.
              </li>
            </ul>
          </div>
        </div>

        <div class="info-item">
          <div class="info-header" @click="toggleInfo('emailInfo')">
            <span class="toggle-icon">{{ showEmailInfo ? '▼' : '▶' }}</span>
            <strong>이메일 주소</strong>
          </div>
          <div class="info-details" v-if="showEmailInfo">
            <p>
              이메일 주소는 계정 확인, 공지사항 전달, 계정 복구 등의 목적으로 사용됩니다. 마케팅
              목적으로는 별도의 동의 없이 사용되지 않습니다.
            </p>
          </div>
        </div>

        <div class="info-item">
          <div class="info-header" @click="toggleInfo('youtubeInfo')">
            <span class="toggle-icon">{{ showYoutubeInfo ? '▼' : '▶' }}</span>
            <strong>YouTube 계정 정보</strong>: YouTube 채널 ID, YouTube 업로드 재생목록 ID
          </div>
          <div class="info-details" v-if="showYoutubeInfo">
            <ul>
              <li>
                <strong>YouTube 채널 ID</strong>: 사용자의 YouTube 채널과 연동하여 서비스를 제공하기
                위해 사용됩니다.
              </li>
              <li>
                <strong>YouTube 업로드 재생목록 ID</strong>: 사용자의 YouTube 콘텐츠를 관리하고
                통합하기 위해 사용됩니다.
              </li>
            </ul>
            <p>
              이 정보는 서비스 내에서 YouTube 콘텐츠를 관리하는 데에만 사용되며, 제3자에게 제공되지
              않습니다.
            </p>
          </div>
        </div>
      </section>

      <section class="consent-section">
        <h2>3. 개인정보의 보유 및 이용 기간</h2>
        <p>
          회원 탈퇴 시 또는 개인정보 수집 및 이용 목적 달성 시까지 보유하며, 관련 법령에 따라 보존할
          필요가 있는 경우에는 해당 기간 동안 보존합니다.
        </p>
        <p>
          특히, Google 계정 토큰(Refresh Token, Access Token)은 사용자가 서비스 이용을 중단하거나
          Google 계정 연동을 해제하는 즉시 삭제됩니다.
        </p>
      </section>

      <section class="consent-section">
        <h2>4. 동의 거부권 및 거부 시 불이익</h2>
        <p>
          귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 동의를 거부할
          경우 회원 가입 및 서비스 이용이 제한될 수 있습니다.
        </p>
      </section>

      <section class="consent-section">
        <h2>5. 개인정보의 제3자 제공</h2>
        <p>
          당사는 귀하의 동의 없이 수집한 개인정보를 제3자에게 제공하지 않습니다. 다만, 관련 법령에
          의하여 제공하는 경우는 예외로 합니다.
        </p>
      </section>

      <div class="buttons-container">
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

const router = useRouter()
const authStore = useAuthStore()

const isNewMember = ref<boolean>(false)
const showGoogleInfo = ref<boolean>(false)
const showEmailInfo = ref<boolean>(false)
const showYoutubeInfo = ref<boolean>(false)

const toggleInfo = (infoType: string) => {
  switch (infoType) {
    case 'googleInfo':
      showGoogleInfo.value = !showGoogleInfo.value
      break
    case 'emailInfo':
      showEmailInfo.value = !showEmailInfo.value
      break
    case 'youtubeInfo':
      showYoutubeInfo.value = !showYoutubeInfo.value
      break
  }
}

onMounted(async () => {
  tokenAxiosInstance
    .get<IsNewMember>('/api/member/check-new', {
      timeout: 1000,
    })
    .then((res) => res.data)
    .then(async (data) => {
      if (data.isNewMember === true) {
        isNewMember.value = data.isNewMember
      } else {
        await getRefreshToken()
      }
    })
    .catch(() => {
      // TODO: 추후 home으로 이동
      isNewMember.value = true
    })
})

const submitConsent = async () => {
  console.log('submit!')
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

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
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

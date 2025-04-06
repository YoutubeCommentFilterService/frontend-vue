<template>
  <div class="max-w-800 p-20 leading-relaxed font-Pretendatd">
    <h1>개인정보 수집 및 이용 동의서</h1>
    <p>
      본 동의서는 회원 가입, 서비스 제공 및 개선 과정에서 필요한 개인정보 수집 및 이용에 대한 내용을
      담고 있습니다.
    </p>

    <section class="consent-section">
      <h2>1. 개인정보 수집 및 이용 목적</h2>
      <p>당사는 다음의 목적을 위해 개인정보를 수집·이용합니다.</p>
      <ul>
        <li>회원 식별 및 계정 관리</li>
        <li>서비스 제공 및 기능 연동</li>
        <li>인기 급상승 동영상 등재 시 댓글 분석 결과 메일 발송</li>
      </ul>
    </section>
    <section class="consent-section">
      <h2>2. 수집하는 개인정보 항목</h2>
      <div class="info-item">
        <div class="info-header" @click="toggleInfo('googleInfo')">
          <span class="toggle-icon">{{ showGoogleInfo ? '▼' : '▶' }}</span>
          <strong>Google 계정 정보</strong>
        </div>
        <div class="info-details" v-if="showGoogleInfo">
          <ul>
            <li>
              <strong>Google Refresh Token</strong>: 사용자의 재인증 없이 Google 서비스 접근을 위해
              암호화된 상태로 저장됩니다.
            </li>
            <li>
              <strong>Google Access Token</strong>: Google API 호출 시 인증 용도로 사용되며 암호화
              저장됩니다.
            </li>
            <li>
              <strong>Google 닉네임, 프로필 이미지</strong>: 서비스 내 사용자 식별 및 표시를 위해
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
            계정 확인, 공지사항 전달, 인기 콘텐츠 관련 알림 메일 발송 등 서비스 운영 목적에
            사용됩니다.
          </p>
          <p>마케팅 목적으로는 별도의 동의 없이 사용되지 않습니다.</p>
        </div>
      </div>

      <div class="info-item">
        <div class="info-header" @click="toggleInfo('youtubeInfo')">
          <span class="toggle-icon">{{ showYoutubeInfo ? '▼' : '▶' }}</span>
          <strong>YouTube 계정 정보</strong>: YouTube 채널 ID, YouTube 업로드 재생목록 ID
        </div>
        <div class="info-details" v-if="showYoutubeInfo">
          <strong>YouTube 채널 ID, 업로드 재생목록 ID</strong>: 사용자의 YouTube 콘텐츠 연동 및
          관리를 위해 사용됩니다.
          <p>
            이 정보는 서비스 내에서 YouTube 콘텐츠를 관리하는 데에만 사용되며, 제3자에게 제공되지
            않습니다.
          </p>
        </div>
      </div>
    </section>

    <section class="consent-section">
      <h2>3. 개인정보의 보유 및 이용 기간</h2>
      <p>수집된 개인정보는 회원 탈퇴 또는 수집·이용 목적 달성 시 지체 없이 파기됩니다.</p>
      <p>
        <strong>Google 계정 토큰</strong>은 사용자가 Google 연동을 해제하거나 서비스 이용을 중단할
        경우 즉시 삭제됩니다.
      </p>
      <p>관련 법령에 따라 보존이 필요한 정보는 해당 법령에서 정한 기간 동안 보관됩니다.</p>
    </section>

    <section class="consent-section">
      <h2>4. 동의 거부권 및 거부 시 불이익</h2>
      <p>이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.</p>
      <p>
        다만, 필수 항목에 대한 동의를 거부할 경우 회원 가입 또는 서비스 이용이 제한될 수 있습니다.
      </p>
    </section>

    <section class="consent-section">
      <h2>5. 개인정보의 안정성 확보 조치</h2>
      <p>당사는 개인정보 보호를 위해 다음과 같은 조치를 시행하고 있습니다</p>
      <ul>
        <li>수집된 토큰은 암호화하여 안전하게 저장됩니다.</li>
        <li>개인정보 접근은 최소한으로 제한하며, 접근 기록을 주기적으로 점검합니다.</li>
        <li>보안 업데이트 및 점검을 통해 외부 침해를 방지합니다.</li>
      </ul>
    </section>

    <section class="consent-section">
      <h2>6. 이용자의 권리</h2>
      <p>이용자는 언제든지 아래와 같은 권리를 행사할 수 있습니다</p>
      <ul>
        <li>본인의 개인정보 열람, 정정, 삭제</li>
        <li>Google 계정 연동 해제 및 관련 정보 삭제 요청</li>
        <li>개인정보 처리 정지 요청</li>
      </ul>
      <p>요청은 서비스 내 [문의하기] 기능을 통해 접수하실 수 있습니다.</p>
    </section>

    <section class="consent-section">
      <h2>7. 개인정보의 제3자 제공</h2>
      <p>당사는 이용자의 동의 없이 수집한 개인정보를 제3자에게 제공하지 않습니다.</p>
      <p>단, 법령에 따라 제공이 요구되는 경우에는 예외로 할 수 있습니다.</p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

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
</style>

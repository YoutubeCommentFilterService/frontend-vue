<script setup lang="ts"></script>

<template>
  <div class="flex flex-col bg-white shadow-lg rounded-2xl w-full mx-auto overflow-auto">
    <!-- 히어로 섹션 -->
    <section class="gradient-bg py-24">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="flex flex-col items-center">
          <!-- 헤더 -->
          <div class="text-center mb-16">
            <h1 class="text-5xl font-black text-gray-800 mb-4">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
                스팸 댓글로 인한 불편함
              </span>
            </h1>
            <div
              class="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-600 mx-auto mb-8 rounded-full"
            ></div>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              온라인 동영상 시청 중 마주치는 스팸, 광고성 댓글, 불필요한 내용들로 인해 불편함을 겪고
              계신가요?
            </p>
          </div>

          <!-- 문제점 카드 -->
          <div class="card-shadow bg-white rounded-2xl p-8 mb-16 w-full max-w-4xl">
            <div class="flex flex-col md:flex-row items-center">
              <div class="md:w-1/3 mb-6 md:mb-0">
                <div
                  class="w-32 h-32 mx-auto rounded-full bg-red-100 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <div class="md:w-2/3 text-center md:text-left md:pl-8">
                <p class="text-lg text-gray-700 leading-relaxed">
                  최근에는 댓글 필터링을 회피하기 위해 채널 이름을 활용한 교묘한 스팸 댓글까지
                  등장하고 있습니다.
                </p>
              </div>
            </div>
          </div>

          <!-- 솔루션 카드 -->
          <div class="card-shadow bg-white rounded-2xl overflow-hidden w-full max-w-4xl mb-16">
            <div class="bg-gradient-to-r from-red-500 to-pink-600 py-6 px-8">
              <h2 class="text-3xl font-bold text-white">스마트 댓글 필터링 서비스</h2>
            </div>
            <div class="p-10">
              <div class="flex flex-col md:flex-row items-center">
                <div class="md:w-2/3 mb-8 md:mb-0">
                  <p class="text-2xl font-semibold text-gray-800 mb-4">
                    온라인 댓글 속 스팸을 효과적으로 차단하세요
                  </p>
                  <p class="text-lg text-gray-600 leading-relaxed mb-6">
                    현재 기본적인 스팸 필터링 기능을 제공합니다. 향후 맞춤형 가이드라인 설정 기능도
                    추가될 예정입니다.
                  </p>
                  <ul class="space-y-3">
                    <li class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="text-gray-700">광고성 댓글 자동 필터링</span>
                    </li>
                    <li class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="text-gray-700">AI 기반 스팸 탐지 기술</span>
                    </li>
                    <li class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="text-gray-700">맞춤형 필터 설정 (개발 중)</span>
                    </li>
                  </ul>
                </div>
                <div class="md:w-1/3 md:pl-10">
                  <div
                    class="w-48 h-48 mx-auto rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-24 w-24 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 행동 유도 (CTA) -->
          <div class="text-center">
            <p class="text-xl text-gray-700 mb-8">
              지금 바로 스팸 없는 온라인 시청 환경을 경험하세요!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 기능 섹션 -->
    <section class="py-12 content-center">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-gray-800">주요 기능</h2>
      </div>
      <div class="container mx-auto px-4 grid grid-cols-1 max-w-5xl md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-md text-center">
          <div class="text-4xl mb-4">🛡️</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-800">고급 스팸 필터링</h3>
          <p class="text-gray-600">
            채널 이름을 이용한 최신 스팸 기법까지 감지하고 필터링합니다. 스팸 댓글을 자동으로 숨겨
            깨끗한 댓글창을 유지하세요.
          </p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md text-center">
          <div class="text-4xl mb-4">👀</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-800">깔끔한 댓글 보기</h3>
          <p class="text-gray-600">
            동영상 페이지에서 바로 필터링된 댓글 목록을 확인할 수 있습니다. 불필요한 댓글 없이
            중요한 내용만 볼 수 있습니다.
          </p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md text-center">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-800">가볍고 빠른 동작</h3>
          <p class="text-gray-600">
            웹 기반으로 가볍게 동작하며, 유튜브 이용 속도에 영향을 주지 않습니다.
          </p>
        </div>
      </div>
    </section>

    <!-- 사용 방법 섹션 -->
    <section id="how-it-works" class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="mb-16 text-center">
          <h2 class="text-3xl font-bold text-gray-800 relative inline-block">
            사용 방법
            <span class="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded-full"></span>
          </h2>
        </div>

        <div
          class="flex flex-col md:flex-row justify-between gap-8 max-w-5xl mx-auto relative mt-10"
        >
          <!-- 연결선 (데스크톱에서만 보임) -->
          <div class="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gray-200 z-0"></div>

          <!-- Step 1 -->
          <div
            class="flex-1 bg-white rounded-xl shadow-lg overflow-visible transition-all duration-300 hover:shadow-xl z-10 mt-6"
          >
            <div class="relative">
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div
                  class="flex items-center justify-center h-10 w-10 bg-red-600 text-white text-sm font-semibold rounded-full border-4 border-white shadow-md"
                >
                  01
                </div>
              </div>
            </div>
            <div class="p-6 pt-8">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-800">로그인</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p class="text-gray-600">구글 로그인을 통해 간단하게 회원가입 하세요</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div
            class="flex-1 bg-white rounded-xl shadow-lg overflow-visible transition-all duration-300 hover:shadow-xl z-10 mt-6"
          >
            <div class="relative">
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div
                  class="flex items-center justify-center h-10 w-10 bg-red-600 text-white text-sm font-semibold rounded-full border-4 border-white shadow-md"
                >
                  02
                </div>
              </div>
            </div>
            <div class="p-6 pt-8">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-800">동영상 클릭</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p class="text-gray-600">Spams 탭으로 들어가 동영상을 클릭하세요</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div
            class="flex-1 bg-white rounded-xl shadow-lg overflow-visible transition-all duration-300 hover:shadow-xl z-10 mt-6"
          >
            <div class="relative">
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div
                  class="flex items-center justify-center h-10 w-10 bg-red-600 text-white text-sm font-semibold rounded-full border-4 border-white shadow-md"
                >
                  03
                </div>
              </div>
            </div>
            <div class="p-6 pt-8">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-800">필터링 확인</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>
              <p class="text-gray-600">필터링된 댓글을 확인 및 삭제합니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 향후 기능 섹션 -->
    <section class="py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
      <div class="container mx-auto px-6 max-w-6xl">
        <!-- 헤더 부분 -->
        <div class="text-center mb-12">
          <span
            class="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4"
            >COMING SOON</span
          >
          <h3
            class="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            앞으로 추가될 기능
          </h3>
          <div
            class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"
          ></div>
        </div>

        <!-- 카드 그리드 -->
        <div class="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 기능 카드 1 -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-gray-800">맞춤형 필터링 규칙</h4>
            <p class="text-gray-600">
              사용자마다 다른 기준으로 댓글을 필터링할 수 있는 맞춤형 규칙 설정 기능이 추가됩니다.
            </p>
          </div>

          <!-- 기능 카드 2 -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-gray-800">키워드 기반 자동 필터</h4>
            <p class="text-gray-600">
              특정 키워드나 문구를 지정하여 자동으로 필터링하는 기능을 제공할 예정입니다.
            </p>
          </div>

          <!-- 기능 카드 3 -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-gray-800">AI 학습 필터</h4>
            <p class="text-gray-600">
              사용자의 필터링 패턴을 학습하여 점점 더 정확한 필터링을 제공하는 기능을 개발 중입니다.
            </p>
          </div>
        </div>

        <!-- 하단 설명 -->
        <div class="mt-12 text-center">
          <p class="text-gray-600 max-w-3xl mx-auto text-lg">
            원하는 댓글 기준을 직접 설정하고, 그에 맞지 않는 댓글은 자동으로 필터링하는 기능을 준비
            중입니다. 사용자 의견을 기반으로 지속적으로 개선해 나갈 예정입니다.
          </p>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="py-10 mt-12 border-t border-gray-200 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-gray-600 mb-6">
          문의사항이 있다면
          <a href="mailto:gkstkdgus821@gmail.com" class="text-red-600 hover:text-red-700"
            >gkstkdgus821@gmail.com</a
          >
          으로 연락 바랍니다!
        </p>
        <div class="mt-6 pt-6 border-t border-gray-200 text-gray-500">
          <p>&copy; 2025 유튜브 스팸 댓글 제거. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

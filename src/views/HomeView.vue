<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const videoPage = ref(1);
const videoTake = ref(50);
const commentPage = ref(1);
const commentTake = ref(100);
const videoId = ref("");

const fetchVideos = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/youtube", {
            withCredentials: true,
            params: {
                page: videoPage.value,
                take: videoTake.value,
            }
        })
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

const fetchComments = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/youtube/${videoId.value}`, {
            withCredentials: true,
            params: {
                page: commentPage.value,
                take: commentTake.value,
            }
        });
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center align-center min-h-screen p-8">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-purple-600 mb-6">
        유튜브 스팸 댓글 관리
      </h1>
      <p class="text-gray-600 text-center text-base leading-relaxed">
        구글 로그인 후 <span class="font-semibold text-purple-500">spams</span> 탭에서 동영상을 선택하세요.
        이후 스팸 댓글을 삭제할 수 있습니다.
      </p>

      <!-- 동영상 로딩 -->
      <div class="bg-gray-100 p-6 rounded-xl shadow-md mt-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">동영상 로딩</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-gray-600">페이지</label>
            <input v-model="videoPage" type="number"
                   class="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
          <div>
            <label class="text-gray-600">개수</label>
            <input v-model="videoTake" type="number"
                   class="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
        </div>
        <button @click="fetchVideos"
                class="mt-6 w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
          동영상 불러오기
        </button>
      </div>

      <!-- 댓글 로딩 -->
      <div class="bg-gray-100 p-6 rounded-xl shadow-md mt-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">댓글 로딩</h2>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="text-gray-600">비디오 ID</label>
            <input v-model="videoId" type="text"
                   class="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
          <div>
            <label class="text-gray-600">페이지</label>
            <input v-model="commentPage" type="number"
                   class="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
          <div>
            <label class="text-gray-600">개수</label>
            <input v-model="commentTake" type="number"
                   class="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
        </div>
        <button @click="fetchComments"
                class="mt-6 w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
          댓글 불러오기
        </button>
      </div>
    </div>
  </div>
</template>

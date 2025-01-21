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
    <div>
        <p>유튜브 댓글 중 스팸으로 간주된 댓글들을 삭제해주는 사이트입니다.</p>
        <p></p>
        <p>구글 로그인을 하고 spams 탭으로 이동하면 동영상 목록이 나옵니다.</p>
        <p></p>
        <p>해당 동영상에 들어가면 전체 댓글을 가져온 후 스팸 댓글으로 예상되는 댓글들을 가져옵니다.</p>
        <p></p>
        <p>이후 댓글을 선택하고 삭제 버튼을 누르면 댓글이 삭제됩니다!</p>
        
        <div>
            <span >동영상 페이지: <input v-model="videoPage"></span>
            <span >동영상 개수: <input v-model="videoTake"></span>
            <br/>
            <button @click="fetchVideos">동영상 로딩 테스트!</button>
        </div>
        <br/>
        <div>
            <span >비디오 ID: <input v-model="videoId"></span>
            <span >댓글 페이지: <input v-model="commentPage"></span>
            <span >댓글 개수: <input v-model="commentTake"></span>
            <br/>
            <button @click="fetchComments">댓글 로딩 테스트!</button>
        </div>
    </div>
</template>
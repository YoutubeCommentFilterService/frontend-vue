<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { tokenAxiosInstance } from '@/utils';
import type { CommentResource, CommentResponseData } from "@/types/comment-interface";
import type { InterVideoListNComment } from "@/types/video-interface";

const state = history.state as InterVideoListNComment;
const authStore = useAuthStore();

const items = ref<CommentResource[]>([]);
const isLast = ref<boolean>(false);

const fetchComments = async (): Promise<CommentResponseData> => {
    const response = await tokenAxiosInstance.get<CommentResponseData>(`/api/youtube/videos/${state.video.id}`, {
        withCredentials: true,
        params: {
            page: 1,
            take: 100,
        }
    })
    return response.data;
}

onMounted(() => {
    // if (!authStore.isLoggedIn) {
    //     alert("로그인을 먼저 해주세요")
    //     router.replace("/");
    // }

    fetchComments()
        .then((data) => {
            console.log(data)
            isLast.value = data.isLast;
            items.value = [...items.value, ...data.items];
        })
        .catch((err) => console.log(err));
})

</script>

<template>
    <div>
        <li v-if="!items.length">
            Loading..
        </li>
        <div v-for="(item, index) in items" :key="index" class="item">
            <p> comment id: {{ item.id }}</p>
            <p> {{ item.nickname }}({{ item.nicknamePredict }})</p>
            <p class="meta"> {{ item.comment }}({{ item.commentPredict }})</p>
        </div>
    </div>
</template>

<style scoped>
.item {
    position: relative;
    border: 1px solid #ff0000
}

ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }
li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
}

.trash-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  fill: #ff0000;
}

.trash-icon:hover {
    cursor: pointer;
}
</style>
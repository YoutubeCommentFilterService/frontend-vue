<script setup lang="ts">
import { onMounted } from "vue";
import Video from "../components/Video.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const onVideoClick = (videoId: string) => {
    router.push({
        path: "/comments",
        state: { videoId },
    })
}

onMounted(() => {
    if (!authStore.isLoggedIn) {
        alert("로그인을 먼저 해주세요")
        router.replace("/");
    }
})
</script>

<template>
<div>
    <Video>
        <template #item="{videoId, videoTitle, videoThumb, publishedAt}">
            <div class="item" :id="videoId" @click="() => onVideoClick(videoId)">
                <img :src="videoThumb" /> 
                <p> {{ videoTitle }}</p>
                <p class="meta"> {{ publishedAt }}</p>
            </div>
        </template>
    </Video>
</div>
</template>
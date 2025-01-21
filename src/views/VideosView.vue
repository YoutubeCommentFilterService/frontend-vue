<script setup lang="ts">
import Video from "../components/Video.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onVideoClick = (videoId: string) => {
    router.push({
        path: "/comments",
        state: { videoId },
    })
}
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
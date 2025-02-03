<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { VideoResponseData, VideoResource, InterVideoListNComment } from "@/types/video-interface";
import { tokenAxiosInstance } from "@/utils";
import { useVideoStore } from "@/stores/video";
import InfiniteScroll from "@/components/InfiniteScroll.vue";

const router = useRouter();
const authStore = useAuthStore();
const videoStore = useVideoStore();

const onVideoClick = (videoId: string, video: VideoResource) => {
  router.push({
      path: "/comments",
      state: {
        video: {
          id: video.id,
          title: video.title,
          thumbnail: video.thumbnail,
          description: video.description,
        }
      }
  })
}

const fetchVideos = async (): Promise<VideoResponseData | void> => {
  if (!videoStore.isLast) {
    const response = await tokenAxiosInstance.get<VideoResponseData>("/api/youtube/videos", {
      params: {
        page: videoStore.videoPage,
        take: 50,
      },
    });
    return response.data;
  }
  return;
}

const refreshVideos = async (): Promise<VideoResponseData | void> => {
  const response = await tokenAxiosInstance.get<VideoResponseData>("/api/youtube/videos", {
    params: {
      page: 1,
      take: 50,
    }
  });

  videoStore.flush();
  videoStore.push(response.data);
}

onMounted(() => {
  if (!authStore.isLoggedIn) {
      alert("로그인을 먼저 해주세요")
      router.replace("/");
  }

  if (videoStore.videoList.length === 0) {
    console.log("asdf")
      fetchVideos()
          .then((data) => {
              if (data) videoStore.push(data);
          })
          .catch((err) => console.log(err))
  }
})
</script>

<template>
<div class="video-root-page">
    <InfiniteScroll :is-last="videoStore.isLast">
        <div v-for="(item, _) in videoStore.videoList" :key="item.id" class="item" @click="() => onVideoClick(item.id, item)">
            <img :src="item.thumbnail" /> 
            <p> {{ item.title }}</p>
            <p class="meta"> {{ item.publishedAt }}</p>
        </div>
    </InfiniteScroll>
</div>
</template>

<style scoped>
.video-root-page {
    display: flex;
    width: 100%;
}
</style>
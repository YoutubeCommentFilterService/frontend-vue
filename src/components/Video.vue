<template>
  <div>
    <button class="reloading-btn" @click="refreshVideos">reloading!</button>
    <ul>
        <li v-if="!videoStore.videoList.length">
            Loading..
        </li>
        <li v-for="(item, idx) in videoStore.videoList" :key="idx">
            <slot name="item" v-bind="item" />
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { VideoResponseData } from "@/types/video-interface";
import { tokenAxiosInstance } from "@/utils";
import { onMounted } from "vue";
import { useVideoStore } from "@/stores/video";

const videoStore = useVideoStore();

const fetchVideos = async (): Promise<VideoResponseData | void> => {
  if (!videoStore.isLast) {
    const response = await tokenAxiosInstance.get<VideoResponseData>("/api/youtube", {
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
  const response = await tokenAxiosInstance.get<VideoResponseData>("/api/youtube", {
    params: {
      page: 1,
      take: 50,
    }
  });

  videoStore.flush();
  videoStore.push(response.data);
}

onMounted(() => {
  if (videoStore.videoList.length === 0) {
    fetchVideos()
      .then((data) => {
        if (data) videoStore.push(data);
      })
      .catch((err) => console.log(err))
  }
});

</script>

<style scoped>
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
</style>
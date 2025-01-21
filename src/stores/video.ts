import type { VideoResource, VideoResponseData } from "@/types/video-interface"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useVideoStore = defineStore('video', () => {
  const videoList = ref<VideoResource[]>([]);
  const videoPage = ref<number>(1);
  const isLast = ref<boolean>(false);

  const push = (data: VideoResponseData) => {
    videoList.value = [...videoList.value, ...data.videoResources];
    videoPage.value++;
    if (data.isLast) isLast.value = data.isLast;
  }

  const flush = () => {
    videoList.value = [];
    videoPage.value = 1;
  }

  return { videoList, flush, push, videoPage, isLast};
})
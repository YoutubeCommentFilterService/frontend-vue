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

  const backup = () => {
    localStorage.setItem('videoStore', JSON.stringify({
      videoList: videoList.value,
      videoPage: videoPage.value,
      isLast: isLast.value,
    }))
  }

  const restore = () => {
    const savedState = localStorage.getItem('videoStore');
    if (savedState) {
      const states: VideoJSONBackupData = JSON.parse(savedState);
      videoList.value = states.videoList;
      videoPage.value = states.videoPage;
      isLast.value = states.isLast;
    }
  }

  return { 
    videoList, flush, push, videoPage, isLast,
    backup, restore
  };
})

interface VideoJSONBackupData {
  videoList: VideoResource[];
  videoPage: number;
  isLast: boolean;
}
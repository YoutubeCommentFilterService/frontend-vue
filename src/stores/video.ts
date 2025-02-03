import type { VideoResource, VideoResponseData } from "@/types/video-interface"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useVideoStore = defineStore('video', () => {
  const videoList = ref<VideoResource[]>([]);
  const videoPage = ref<number>(1);
  const isLast = ref<boolean>(false);

  const localStorageKey = 'video-store'

  const push = (data: VideoResponseData) => {
    videoList.value = [...videoList.value, ...data.items];
    videoPage.value++;
    isLast.value = data.isLast === 'Y' ? true : false;
  }

  const flush = () => {
    localStorage.removeItem(localStorageKey)
    videoList.value = [];
    videoPage.value = 1;
  }

  const backup = () => {
    localStorage.setItem(localStorageKey, JSON.stringify({
      videoList: videoList.value,
      videoPage: videoPage.value,
      isLast: isLast.value,
    }))
  }

  const restore = () => {
    const savedState = localStorage.getItem(localStorageKey);
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
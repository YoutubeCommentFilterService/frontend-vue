<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { VideoResponseData, VideoResource } from '@/types/video-interface'
import { tokenAxiosInstance } from '@/utils'
import { useVideoStore } from '@/stores/video'
import InfiniteScroll from '@/components/InfiniteScroll.vue'

const router = useRouter()
const authStore = useAuthStore()
const videoStore = useVideoStore()

const videoPrivacyTooltip: { [key: string]: string | undefined } = {
  private: '비공개 영상은 댓글 조회가 불가합니다 ㅠㅠ',
  public: undefined,
  unlisted: '링크 공개 영상은 댓글 조회가 가능합니다!',
}

const onVideoClick = (video: VideoResource) => {
  if (video.privacy === 'private') return
  router.push({
    path: '/comments',
    state: {
      video: {
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        description: video.description,
        publishedAt: convertUTC2KST(video.publishedAt),
      },
    },
  })
}

const fetchVideos = async (page: number, take: number = 50): Promise<VideoResponseData | void> => {
  if (!videoStore.isLast) {
    const { data } = await tokenAxiosInstance.get<VideoResponseData>('/api/youtube/videos', {
      params: {
        page,
        take,
      },
    })
    return data
  }
  return
}

const refreshVideos = async (take: number = 50): Promise<VideoResponseData | void> => {
  videoStore.isLast = false
  const data = await fetchVideos(1, take)

  videoStore.flush()
  if (data) videoStore.push(data)
}

const sleep = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, time)
  })
}

const maxFetchNum = 50
const loadMoreItem = async () => {
  try {
    const data = await fetchVideos(videoStore.videoPage, maxFetchNum)
    // 스피너 디버그용
    // await sleep(3000)

    if (data) {
      videoStore.push(data)
      return true
    }
    return false
  } catch (err) {
    console.error(err)
    return false
  }
}
const refreshItem = async () => {
  await refreshVideos(maxFetchNum)
}

const convertUTC2KST = (datetime: string): string => {
  if (!datetime.endsWith('Z')) datetime = datetime + 'Z'
  return new Date(datetime).toLocaleString('ko-kr', { timeZone: 'Asia/Seoul' })
}

onMounted(() => {
  if (!authStore.isLoggedIn) {
    alert('로그인을 먼저 해주세요')
    router.replace('/')
  }
})
</script>

<template>
  <div class="flex w-full">
    <InfiniteScroll
      :is-last="videoStore.isLast"
      :load-more-item="loadMoreItem"
      :refresh-item="refreshItem"
      spinner-text="동영상을 불러오는 중입니다!!"
    >
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 p-5">
        <div
          v-for="item in videoStore.videoList"
          :key="item.id"
          class="border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-md transition-transform duration-200 ease-in-out hover:translate-y-[-4px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          :class="{
            'cursor-not-allowed': item.privacy === 'private',
            'cursor-pointer': item.privacy !== 'priate',
          }"
          @click="item.privacy !== 'private' && onVideoClick(item)"
          :title="videoPrivacyTooltip[item.privacy]"
        >
          <div class="relative">
            <img :src="item.thumbnail" class="w-full h-[200px] object-cover" />
            <div
              v-if="item.privacy === 'private'"
              class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-60 z-10"
            >
              <svg
                width="80px"
                height="80px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="cls-1"
                  d="M16 8.00169L16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8.00169M16 8.00169C15.7563 8 15.4907 8 15.2 8H8.8C8.50929 8 8.24373 8 8 8.00169M16 8.00169C17.1649 8.00979 17.8313 8.05658 18.362 8.32698C18.9265 8.6146 19.3854 9.07354 19.673 9.63803C20 10.2798 20 11.1198 20 12.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V12.8C4 11.1198 4 10.2798 4.32698 9.63803C4.6146 9.07354 5.07354 8.6146 5.63803 8.32698C6.16873 8.05658 6.83507 8.00979 8 8.00169M10 11V18M14 11V18M8.5 12.5H15.5M8.5 16.5H15.5"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div v-if="item.privacy === 'unlisted'" class="absolute top-2.5 right-2.5 z-20">
              <svg
                width="30px"
                height="30px"
                viewBox="0 -1 510 515"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M476.335 35.664v.001c47.554 47.552 47.552 125.365.002 172.918l-101.729 101.73c-60.027 60.025-162.073 42.413-194.762-32.45 35.888-31.191 53.387-21.102 87.58-6.638 20.128 8.512 43.74 3.955 60.08-12.387l99.375-99.371c21.49-21.493 21.492-56.662 0-78.155-21.489-21.488-56.677-21.472-78.151 0l-71.278 71.28c-23.583-11.337-50.118-14.697-75.453-10.07a121.476 121.476 0 0118.767-24.207l82.651-82.65c47.554-47.551 125.365-47.555 172.918-.001zM35.664 476.334l.001.001c47.554 47.552 125.365 47.552 172.917 0l85.682-85.682a121.496 121.496 0 0019.325-25.157c-27.876 6.951-57.764 4.015-83.932-8.805l-70.192 70.19c-21.472 21.471-56.658 21.492-78.149 0-21.492-21.491-21.493-56.658 0-78.149l99.375-99.376c20.363-20.363 61.002-26.435 91.717 1.688 29.729-3.133 41.275-8.812 59.742-26.493-39.398-69.476-137.607-80.013-194.757-22.863L35.664 303.417c-47.552 47.553-47.552 125.364 0 172.917z"
                />
              </svg>
            </div>
          </div>
          <p class="m-2 text-sm text-gray-800 truncate whitespace-nowrap overflow-hidden">
            {{ item.title }}
          </p>
          <p class="mt-0 mb-3 ml-3 text-xs text-gray-500">
            업로드 일자: {{ convertUTC2KST(item.publishedAt) }}
          </p>
        </div>
      </div>
    </InfiniteScroll>
  </div>
</template>

<style scoped>
svg {
  filter: drop-shadow(0px 0px 2px rgba(255, 255, 255));
}
</style>

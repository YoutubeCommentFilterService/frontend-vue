<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { tokenAxiosInstance } from '@/utils/axios-instance'
import { useVideoStore } from '@/stores/video'

import type { VideoResponseData, VideoResource } from '@/types/video-interface'

import InfiniteScroll from '@/components/InfiniteScroll.vue'
import VideoItem from '@/components/videos-view/VideoItem.vue'

const router = useRouter()
const authStore = useAuthStore()
const videoStore = useVideoStore()

const isLoading = ref<boolean>(false)

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
  videoStore.flush()
  const data = await fetchVideos(1, take)

  if (data) videoStore.push(data)
}

const maxFetchNum = 50
const loadMoreItem = async () => {
  try {
    const data = await fetchVideos(videoStore.videoPage, maxFetchNum)

    if (data) {
      videoStore.push(data)
      return true
    }
  } catch (err) {
    if (import.meta.env.VITE_IS_DEV === 't') console.error(err)
  }
  return false
}

const convertUTC2KST = (datetime: string | string[]): string => {
  let date
  if (typeof datetime === 'object') {
    date = new Date(
      Date.UTC(
        parseInt(datetime[0]), // year
        parseInt(datetime[1]) - 1, // month (0-based)
        parseInt(datetime[2]), // day
        parseInt(datetime[3]) || 0, // hour
        parseInt(datetime[4]) || 0, // minute
        parseInt(datetime[5]) || 0, // second
      ),
    )
  } else {
    if (!datetime.endsWith('Z')) datetime = datetime + 'Z'
    date = new Date(datetime)
  }
  return date.toLocaleString('ko-kr', { timeZone: 'Asia/Seoul' })
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
      :refresh-item="refreshVideos"
      spinner-text="동영상을 불러오는 중입니다!!"
      v-model:is-loading="isLoading"
    >
      <div
        class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-5"
        v-if="videoStore.videoList.length > 0"
      >
        <VideoItem
          v-for="item in videoStore.videoList"
          :key="item.id"
          :item="item"
          @click="item.privacy !== 'private' && onVideoClick(item)"
          :published-at="convertUTC2KST(item.publishedAt)"
          :privacy-tooltip="videoPrivacyTooltip[item.privacy]"
        />
      </div>
      <div
        class="items-center justify-center flex h-full"
        v-else-if="!isLoading && videoStore.videoList.length === 0"
      >
        <p v-if="authStore.profile.hasYoutubeAccess" class="">동영상이 존재하지 않습니다.</p>
        <p v-else>유튜브 계정 연동을 먼저 진행해 주세요!</p>
      </div>
    </InfiniteScroll>
  </div>
</template>

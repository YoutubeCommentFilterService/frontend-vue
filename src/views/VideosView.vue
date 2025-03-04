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

const onVideoClick = (video: VideoResource) => {
  router.push({
    path: '/comments',
    state: {
      video: {
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        description: video.description,
      },
    },
  })
}

const fetchVideos = async (page: number, take: number = 50): Promise<VideoResponseData | void> => {
  if (!videoStore.isLast) {
    const response = await tokenAxiosInstance.get<VideoResponseData>('/api/youtube/videos', {
      params: {
        page,
        take,
      },
    })
    return response.data
  }
  return
}

const refreshVideos = async (take: number = 50): Promise<VideoResponseData | void> => {
  const response = await tokenAxiosInstance.get<VideoResponseData>('/api/youtube/videos', {
    params: {
      page: 1,
      take,
    },
  })

  videoStore.flush()
  videoStore.push(response.data)
}

const sleep = async (time: number) => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, time)
  })
}

onMounted(() => {
  if (!authStore.isLoggedIn) {
    alert('로그인을 먼저 해주세요')
    router.replace('/')
  }
})
</script>

<template>
  <div class="video-root-page">
    <InfiniteScroll
      :is-last="videoStore.isLast"
      :load-more-item="
        async () => {
          try {
            const data = await fetchVideos(videoStore.videoPage, 5)
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
      "
      :refresh-item="
        async () => {
          await refreshVideos(5)
        }
      "
    >
      <div class="video-grid">
        <div
          v-for="item in videoStore.videoList"
          :key="item.id"
          class="item"
          @click="() => onVideoClick(item)"
        >
          <img :src="item.thumbnail" />
          <p class="title">{{ item.title }}</p>
          <p class="meta">
            업로드 일자:
            {{ new Date(item.publishedAt).toLocaleString('ko-kr', { timeZone: 'Asia/Seoul' }) }}
          </p>
        </div>
      </div>
    </InfiniteScroll>
  </div>
</template>

<style scoped>
.video-root-page {
  display: flex;
  width: 100%;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 16px;
  padding: 20px;
}

.item {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
}

.item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.item p {
  margin: 8px 12px;
  font-size: 14px;
  color: #333;
}

.item .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item .meta {
  margin: 0 12px 12px;
  font-size: 12px;
  color: #888;
}
</style>

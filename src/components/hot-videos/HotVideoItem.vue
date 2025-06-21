<template>
  <div
    class="my-2 flex flex-row select-none gap-2"
    :class="{ 'bg-white': authStore.channelId === item.channelId }"
  >
    <div class="flex items-center min-w-7 max-w-7">
      <p class="w-full text-center">{{ idx + 1 }}</p>
    </div>
    <div
      class="min-w-[240px] max-w-[240px] relative cursor-pointer"
      @click="() => moveToYoutube('video', item.videoId)"
    >
      <div class="relative object-cover">
        <img :src="item.thumbnailUrl" class="w-full" />
        <div
          class="absolute flex flex-col bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded text-end"
        >
          <p class="">
            {{ convertTimeFormat(item.publishedAt) }}
          </p>
          <p class="inline-block max-w-full">
            {{ item.viewCount }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col ml-1 overflow-x-hidden gap-2">
      <p
        class="inline-block max-w-full truncate cursor-pointer"
        @click="() => moveToYoutube('video', item.videoId)"
      >
        {{ item.title }}
      </p>
      <div class="flex flex-col items-stretch gap-2">
        <div class="flex flex-row h-12 gap-2">
          <img :src="item.channelThumbnailUrl" class="h-full object-contain rounded-full" />
          <div class="flex flex-col justify-center">
            <p
              class="cursor-pointer inline-block truncate"
              @click="() => moveToYoutube('channel', item.channelId)"
            >
              {{ item.channelTitle }}
            </p>
            <p
              class="text-sm cursor-pointer inline-block truncate"
              @click="() => moveToYoutube('channel', item.channelHandler)"
            >
              {{ item.channelHandler }}, {{ item.subscriberCount }}
            </p>
          </div>
        </div>

        <p class="text-xs line-clamp-2 wrap-break-word">
          {{ item.tags }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HotVideoData } from '@/types/hot-videos-insterface'
import { useAuthStore } from '@/stores/auth'

defineProps<{
  item: HotVideoData
  idx: number
}>()

const authStore = useAuthStore()

const convertTimeFormat = (utcTime: string) => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const date = new Date(utcTime)

  const options = { timeZone: 'Asia/Seoul' }
  const localDate = new Date(date.toLocaleString('en-US', options))
  const mm = pad(localDate.getMonth() + 1)
  const dd = pad(localDate.getDate())
  const hh = pad(localDate.getHours())
  const mi = pad(localDate.getMinutes())

  return `${mm}-${dd} ${hh}:${mi}`
}

const moveToYoutube = (type: string, ids: string) => {
  if (type === 'video') {
    window.open(`https://www.youtube.com/watch?v=${ids}`)
  } else if (type === 'channel') {
    if (ids.startsWith('@')) {
      window.open(`https://www.youtube.com/${ids}`)
    } else {
      window.open(`https://www.youtube.com/channel/${ids}`)
    }
  }
}
</script>

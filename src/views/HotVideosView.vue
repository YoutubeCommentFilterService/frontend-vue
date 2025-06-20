<template>
  <div class="flex relative w-full flex-col overflow-auto">
    <!-- 상단에 고정으로 카테고리 위치 -->
    <div
      ref="categoryHeaderRef"
      class="flex flex-row w-full sticky top-0 z-10 bg-amber-100 overflow-x-auto whitespace-nowrap shrink-0 py-1"
    >
      <div class="flex justify-center min-w-fit w-full">
        <div class="flex flex-row gap-4 px-4">
          <div
            v-for="category in categories"
            :key="category"
            @click="
              (event) => {
                if (!isDragging && event.target === dragStartRef) clicked(event, category)
              }
            "
            class="select-none cursor-pointer"
          >
            {{ category }}
          </div>
        </div>
      </div>
    </div>
    <!-- 그 밑에 데이터 존재 -->
    <div id="hot-video-items" ref="scrollableRef" class="flex grow-1 flex-col overflow-y-auto">
      <HotVideoItem :items="videos[selectedCategory]?.items"> </HotVideoItem>
      <div>
        <button
          class="inline-block px-2 py-2 absolute right-2 bottom-2 cursor-pointer bg-blue-400"
          @click="scrollToUp"
        >
          맨위로
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onBeforeUnmount } from 'vue'
import { tokenAxiosInstance } from '@/utils/axios-instance'
import type { HotVideosResponse, HotVideoDisplayResource } from '@/types/hot-videos-interface.ts'
import HotVideoItem from '@/components/hot-videos/HotVideoItem.vue'

const categoryHeaderRef = ref(null)
const dragStartRef = ref(null)
const scrollableRef = ref(null)
const baseTime = ref<number>(0)
const videos = ref<HotVideoDisplayResource>({ '': { items: [], key: -1 } })
const selectedCategory = ref<string>('')
const categories = computed(() =>
  Object.entries(videos.value)
    .sort(([, a], [, b]) => a.key - b.key)
    .map(([category]) => category),
)
const isRunning = ref<boolean>(false)
let renewHourDiffIntervalId
const checkNewVideoFetchTime = async () => {
  const hourDiff = (Date.now() - baseTime.value) / (1000 * 60 * 60)
  if (isRunning.value) return

  isRunning.value = true
  if (hourDiff >= 8) await getHotVideos()
  isRunning.value = false
}

const getHotVideos = async () => {
  const { data } = await tokenAxiosInstance.get<HotVideosResponse>('/api/youtube/hot-videos')
  baseTime.value = new Date(data.baseTime).getTime()
  videos.value = Object.fromEntries(
    Object.entries(data.itemMap).map(([key, value]) => [
      key.split(':')[1],
      { items: value, key: parseInt(key.split(':')[0]) },
    ]),
  )
}

const scrollToUp = () => {
  scrollableRef.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const clicked = (event, category: string) => {
  scrollToUp()
  selectedCategory.value = category
}

let isDown = false
let isDragging = false
let startX: number, scrollLeft: number

onMounted(async () => {
  const el = categoryHeaderRef.value
  await getHotVideos()
  selectedCategory.value = '전체'
  renewHourDiffIntervalId = setInterval(checkNewVideoFetchTime, 60 * 1000)

  if (!el) return

  const mouseDown = (e: MouseEvent) => {
    isDown = true
    isDragging = false
    el.classList.add('cursor-grabbing')
    startX = e.pageX - el.offsetLeft
    scrollLeft = el.scrollLeft
    dragStartRef.value = e.target
  }

  const mouseLeaveOrUp = (e: MouseEvent) => {
    isDown = false
    if (isDragging) {
      e.stopPropagation()
      e.preventDefault()
    }
    el.classList.remove('cursor-grabbing')
  }

  const mouseMove = (e: MouseEvent) => {
    if (!isDown) return
    const walk = e.pageX - startX
    if (Math.abs(walk) > 5) {
      isDragging = true
      el.scrollLeft = scrollLeft - walk
    }
    dragStartRef.value = null
  }

  const listeners = [
    { type: 'mousedown', func: mouseDown },
    { type: 'mouseleave', func: mouseLeaveOrUp },
    { type: 'mouseup', func: mouseLeaveOrUp },
    { type: 'mousemove', func: mouseMove },
  ]

  listeners.forEach(({ type, func }) => {
    el.addEventListener(type, func)
  })

  onBeforeUnmount(() => {
    listeners.forEach(({ type, func }) => {
      el.removeEveltListener(type, func)
    })
    clearInterval(renewHourDiffIntervalId)
  })
})
</script>

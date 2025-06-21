<template>
  <div class="flex relative w-full flex-col overflow-auto">
    <!-- 상단에 고정으로 카테고리 위치 -->
    <div
      ref="categoryHeaderRef"
      class="flex flex-row w-full sticky top-0 z-10 overflow-x-auto whitespace-nowrap shrink-0 py-1"
    >
      <div class="flex justify-center min-w-fit w-full">
        <div class="flex flex-row gap-4 px-4 items-center">
          <div
            v-for="category in categories"
            :key="category"
            @click="
              (event) => {
                if (!isDragging && event.target === dragStartRef) clicked(event, category)
              }
            "
            class="select-none cursor-pointer"
            :class="{
              'border-double border-sky-500 border-2 px-2 py-0.5 rounded-4xl':
                category === selectedCategory,
            }"
          >
            {{ category }}
          </div>
        </div>
      </div>
    </div>
    <!-- 그 밑에 데이터 존재 -->
    <div id="hot-video-items" ref="scrollableRef" class="flex grow-1 flex-col overflow-y-auto">
      <HotVideoItem v-for="(item, idx) in items" :item="item" :idx="idx" v-bind:key="item.videoId">
      </HotVideoItem>
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
import type { HotVideosResponse, HotVideoDisplayResource } from '@/types/hot-videos-insterface'
import HotVideoItem from '@/components/hot-videos/HotVideoItem.vue'

const categoryHeaderRef = ref<HTMLElement | null>(null)
const dragStartRef = ref<EventTarget | null>(null)
const scrollableRef = ref<HTMLElement | null>(null)
const baseTime = ref<number>(0)
const videos = ref<HotVideoDisplayResource>({ '': { items: [], key: -1 } })
const selectedCategory = ref<string>('')
const items = computed(() => videos.value[selectedCategory.value].items)
const categories = computed(() =>
  Object.entries(videos.value as Record<string, { key: number }>)
    .sort(([aKey, aVal], [bKey, bVal]) => aVal.key - bVal.key)
    .map(([category]) => category),
)
const isRunning = ref<boolean>(false)
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
  videos.value = data.itemMap
}

const scrollToUp = () => {
  if (scrollableRef.value) {
    scrollableRef.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

const clicked = (event: MouseEvent, category: string) => {
  scrollToUp()
  if ((event.target as HTMLElement).innerText !== selectedCategory.value)
    selectedCategory.value = category
}

let isDown = false
let isDragging = false
let startX: number, scrollLeft: number

onMounted(async () => {
  const el = categoryHeaderRef.value
  await getHotVideos()
  selectedCategory.value = '전체'
  const renewHourDiffIntervalId = setInterval(checkNewVideoFetchTime, 60 * 1000)

  if (!el) return

  const mouseDown = (e: MouseEvent) => {
    isDown = true
    isDragging = false
    if (el) {
      el.classList.add('cursor-grabbing')
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }
    dragStartRef.value = e.target
  }

  const mouseLeaveOrUp = (e: MouseEvent) => {
    isDown = false
    if (isDragging) {
      e.stopPropagation()
      e.preventDefault()
    }
    if (el) el.classList.remove('cursor-grabbing')
  }

  const mouseMove = (e: MouseEvent) => {
    if (!isDown) return
    const walk = e.pageX - startX
    if (Math.abs(walk) > 5) {
      isDragging = true
      if (el) el.scrollLeft = scrollLeft - walk
    }
    dragStartRef.value = null
  }

  const wheelMove = (e: WheelEvent) => {
    if (el) {
      // 위로 휠이 -, 아래로 휠이 +
      el.scrollLeft = scrollLeft - (e.deltaY > 0 ? -30 : 30)
      scrollLeft = el.scrollLeft
    }
  }

  el.addEventListener('mousedown', mouseDown)
  el.addEventListener('mouseleave', mouseLeaveOrUp)
  el.addEventListener('mouseup', mouseLeaveOrUp)
  el.addEventListener('mousemove', mouseMove)
  el.addEventListener('wheel', wheelMove)

  onBeforeUnmount(() => {
    el.removeEventListener('mousedown', mouseDown)
    el.removeEventListener('mouseleave', mouseLeaveOrUp)
    el.removeEventListener('mouseup', mouseLeaveOrUp)
    el.removeEventListener('mousemove', mouseMove)
    el.removeEventListener('wheel', wheelMove)
    clearInterval(renewHourDiffIntervalId)
  })
})
</script>

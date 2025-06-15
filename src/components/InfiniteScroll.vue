<script setup lang="ts">
import { throttle } from 'lodash'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  loadMoreItem: {
    type: Function,
    required: false,
  },
  refreshItem: {
    type: Function,
    required: false,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
  spinnerText: {
    type: String,
    required: true,
    default: '로딩중...',
  },
})

const showScrollToTop = ref(false)
const isLoading = defineModel('isLoading', { default: false, required: true })

const observer = ref<IntersectionObserver | null>(null)
const infScrollPointer = ref(null)
const scrollContainer = ref<HTMLElement | null>(null)

const observerCallback = async (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries
  let loadMore = false
  // 로딩 중이 아니고, 마지막 페이지가 아니며, 스크롤 포인터가 화면에 보일 때
  if (!isLoading.value && !props.isLast && entry.isIntersecting) {
    isLoading.value = true
    try {
      loadMore = props.loadMoreItem ? await props.loadMoreItem() : false

      if (!loadMore) {
        if (observer.value && infScrollPointer.value) {
          observer.value.unobserve(infScrollPointer.value)
          observer.value.disconnect()
        }
      }
    } catch (error) {
      console.error('Load more items error:', error)
    } finally {
      isLoading.value = false
      // 다음 렌더링 사이클에서 Observer 재설정
      await nextTick()
      if (loadMore) setupIntersectionObserver()
    }
  }
}

const setupIntersectionObserver = () => {
  // 기존 옵저버 해제
  if (observer.value) observer.value.disconnect()

  // 새 옵저버 설정
  if (scrollContainer.value && infScrollPointer.value) {
    observer.value = new IntersectionObserver(observerCallback, {
      root: scrollContainer.value,
      rootMargin: '20px',
      threshold: 0.1,
    })

    observer.value.observe(infScrollPointer.value)
  }
}

const refreshItems = async () => {
  await scrollToTop()

  try {
    isLoading.value = true
    if (props.refreshItem) await props.refreshItem()
  } catch (error) {
    console.error('Refresh items error:', error)
  } finally {
    isLoading.value = false
  }

  await nextTick()
  setupIntersectionObserver()
}

const scrollToTop = async () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

const throttleWait: number = 100
const handleScroll = throttle(() => {
  if (scrollContainer.value) showScrollToTop.value = scrollContainer.value.scrollTop > 200
}, throttleWait)

watch(
  () => props.isLast,
  () => {
    setupIntersectionObserver()
  },
)

onMounted(async () => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll)
    setupIntersectionObserver()
  }
})

onUnmounted(() => {
  if (observer.value) observer.value.disconnect()
  if (scrollContainer.value) scrollContainer.value.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="flex flex-grow overflow-y-auto relative">
    <div
      class="flex border border-gray-300 flex-col overflow-y-auto relative h-full w-full"
      ref="scrollContainer"
    >
      <div class="p-2.5 flex-grow">
        <slot></slot>
        <div
          v-if="isLoading"
          class="text-center flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            class="w-10 h-10 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2.5"
          ></div>
          <p>{{ props.spinnerText }}</p>
        </div>
        <div
          v-if="!props.isLast && !isLoading"
          ref="infScrollPointer"
          class="w-px h-px visible"
        ></div>
      </div>
    </div>
    <div class="absolute flex flex-col gap-2 bottom-2 right-5 text-white text-sm">
      <button
        v-if="showScrollToTop"
        class="px-4 py-3 bg-indigo-600 border-none rounded-full shadow-lg cursor-pointer z-50 hover:bg-indigo-700"
        @click="scrollToTop"
      >
        ⏫ 맨 위로
      </button>
      <button
        class="px-4 py-3 bg-indigo-600 border-none rounded-full shadow-lg cursor-pointer z-50 hover:bg-indigo-700"
        @click="refreshItems"
      >
        🔄 새로고침
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

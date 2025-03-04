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
})

const isLoading = ref(false)
const showScrollToTop = ref(false)

const observer = ref<IntersectionObserver | null>(null)
const infScrollPointer = ref(null)
const scrollContainer = ref<HTMLElement | null>(null)

const observerCallback = async (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries
  
  // 로딩 중이 아니고, 마지막 페이지가 아니며, 스크롤 포인터가 화면에 보일 때
  if (!isLoading.value && !props.isLast && entry.isIntersecting) {
    try {
      isLoading.value = true

      const loadedMore = props.loadMoreItem ? await props.loadMoreItem() : false;

      if (!loadedMore) {
        if (observer.value && infScrollPointer.value) {
          observer.value.unobserve(infScrollPointer.value)
        }
      }
    } catch (error) {
      console.error('Load more items error:', error)
    } finally {
      isLoading.value = false
      
      // 다음 렌더링 사이클에서 Observer 재설정
      await nextTick()
      setupIntersectionObserver()
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

watch(() => props.isLast, () => {setupIntersectionObserver()})

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
  <div class="scroll-container" ref="scrollContainer">
    <div class="scroll-section">
      <slot></slot>
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <p>더 많은 영상 로딩 중...</p>
      </div>
      <div v-if="!props.isLast && !isLoading" ref="infScrollPointer" class="scroll-trigger"></div>
    </div>
    <button v-if="showScrollToTop" class="to-upper-button" @click="scrollToTop">⏫ 맨 위로</button>
    <button class="refresh-button" @click="refreshItems">🔄 새로고침</button>
  </div>
</template>

<style scoped>
.scroll-container {
  display: flex;
  border: 1px solid #ddd;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  width: 100%;
}

.scroll-section {
  padding: 10px;
  padding-top: 0px;
  flex-grow: 1;
}

.scroll-trigger {
  width: 1px;
  height: 1px;
  visibility: visible;
}

.loading {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.refresh-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  cursor: pointer;
  z-index: 1000;
}

.refresh-button:hover {
  background-color: #4338ca;
}

.to-upper-button {
  position: fixed;
  bottom: 70px; /* refresh-button 위에 위치하도록 조정 */
  right: 20px;
  padding: 12px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  cursor: pointer;
  z-index: 1001; /* refresh-button보다 위로 표시되도록 z-index 증가 */
}

.to-upper-button:hover {
  background-color: #4338ca;
}
</style>

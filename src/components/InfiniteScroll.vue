<script setup lang="ts">
import { throttle } from 'lodash'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
    loadMoreItem: {
        type: Function,
        required: false,
    },
    isLast: {
        type: Boolean,
        retuired: true,
    }
})

const isLoading = ref(false)
const showScrollToTop = ref(false)

const observer = ref<IntersectionObserver | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

const observerCallback = async (entries: IntersectionObserverEntry[]) => {
  console.log(entries);
  const [entry] = entries
  if (entry.isIntersecting && !isLoading.value) {
    console.log('enterd!', props.loadMoreItem)
    if (props.loadMoreItem) props.loadMoreItem();
    // 다음 loading 함수 실행
  }
}

const scrollToTop = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const throttleWait: number = 100;
const handleScroll = throttle(() => {
  if (scrollContainer.value) {
    showScrollToTop.value = scrollContainer.value.scrollTop > 200
  }
}, throttleWait);

onMounted(async () => {
  observer.value = new IntersectionObserver(observerCallback, {
    root: scrollContainer.value,
    rootMargin: '0px',
    threshold: 1.0,
  })

  if (scrollContainer.value) {
    observer.value.observe(scrollContainer.value.lastElementChild!)
    scrollContainer.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
<div class="scroll-container" ref="scrollContainer">
    <div class="scroll-section">
        <slot></slot>
        <div v-if="isLoading" class="loading">Loading...</div>
    </div>
    <div v-if="props.isLast" ref="infScrollPointer" class="scroll-trigger"></div>
</div>
</template>

<style scoped>
.scroll-container {
  display: flex;
  border: 1px solid #ddd;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
}

.scroll-section {
  padding: 10px;
  padding-top: 0px;
  flex-grow: 1;
}

.scroll-trigger {
  width: 1px;
  height: 1px;
  visibility: hidden;
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>
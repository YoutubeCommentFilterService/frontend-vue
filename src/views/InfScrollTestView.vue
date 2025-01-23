<template>
  <div class="scroll-container" ref="scrollContainer">
    <div v-for="(data, idx) in datas" :key="idx" class="item">{{ idx }} - {{ data }}</div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div ref="infScrollPointer" class="scroll-trigger"></div>
    <button v-if="showScrollToTop" class="scroll-to-top" @click="scrollToTop">↑</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { throttle } from 'lodash'
import { onMounted, onUnmounted, ref } from 'vue'

const url =
  'https://www.random.org/integers/?num=100&min=1&max=100000000&col=1&base=16&format=plain&rnd=new'

const datas = ref<string[]>([])
const isLoading = ref(false)
const showScrollToTop = ref(false)

const observer = ref<IntersectionObserver | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

const fetchRandomData = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const randomData = (await axios.get(url)).data.trim().split('\n')
    datas.value = [...datas.value, ...randomData]
    console.log(datas.value)
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const observerCallback = async (entries: IntersectionObserverEntry[]) => {
  console.log(entries);
  const [entry] = entries
  if (entry.isIntersecting && !isLoading.value) {
    console.log('enterd!')
    await fetchRandomData()
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

<style scoped>
.scroll-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
}
.item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.scroll-trigger {
  height: 1px;
  background: transparent;
}
.loading {
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: gray;
}

.scroll-to-top {
  position: fixed; /* 화면 고정 */
  bottom: 20px; /* 화면 아래에서 20px */
  right: 20px; /* 화면 오른쪽에서 20px */
  background-color: #007bff; /* 파란색 배경 */
  color: white; /* 흰색 글씨 */
  border: none;
  border-radius: 20%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 1;
}
</style>

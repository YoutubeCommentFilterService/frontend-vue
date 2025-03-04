<template>
  <div class="inf-scroll-root">
    <div>비디오 정보가 들어갈 부분...</div>
    <div class="scroll-container" ref="scrollContainer">
      <div class="top-section">
        <i class="pi pi-spin pi-trash" style="font-size: 2rem" @click="toServer"></i>
      </div>
      <button v-if="showScrollToTop" class="scroll-to-top" @click="scrollToTop">↑</button>
      <div class="scroll-section">
        <!-- 여기에 slot 넣으면 될거같은데...? -->
        <div v-for="(item, idx) in items" :key="idx" class="item" :id="item.id">
          <i class="pi pi-user" style="width: 20px"></i>
          <div>{{ item.authorNickname + ' ' }}</div>
          <div>{{ item.textOriginal }}</div>
          <input
            type="checkbox"
            :id="'delete-' + idx"
            @change="toggleCheckInputBtn(idx, idx, $event.target)"
          />
          <input
            type="checkbox"
            :id="'ban-' + idx"
            @change="toggleCheckInputBtn(idx, idx, $event.target)"
          />
        </div>
        <div v-if="isLoading" class="loading">Loading...</div>
      </div>
      <div ref="infScrollPointer" class="scroll-trigger"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { throttle } from 'lodash'
import { onMounted, onUnmounted, ref } from 'vue'
import { CommentResource } from '../types/comment-interface.ts'

const url =
  'https://www.random.org/integers/?num=100&min=1&max=100000000&col=1&base=16&format=plain&rnd=new'

const datas = ref<string[]>([])
const isLoading = ref(false)
const showScrollToTop = ref(false)

const observer = ref<IntersectionObserver | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

const items = ref<CommentResource[]>([])

const fetchRandomData = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const temp = generateTempData()
    items.value.push(...temp)
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

function getRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const observerCallback = async (entries: IntersectionObserverEntry[]) => {
  console.log(entries)
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

const throttleWait: number = 100
const handleScroll = throttle(() => {
  if (scrollContainer.value) {
    showScrollToTop.value = scrollContainer.value.scrollTop > 200
  }
}, throttleWait)

// banAuthor과 deleteComment는 서로 다른 영역
const banAuthor = new Set()
const deleteComment = new Set()
const toggleCheckInputBtn = (idx, commentId, target) => {
  const checkbox = target as HTMLInputElement
  if (checkbox.id.startsWith('ban')) {
    if (checkbox.checked === true) {
      const otherBox = document.getElementById(`delete-${idx}`) as HTMLInputElement
      otherBox.checked = true
      deleteComment.add(commentId)
      banAuthor.add(commentId)
    } else {
      banAuthor.delete(commentId)
    }
  } else {
    if (checkbox.checked === true) {
      deleteComment.add(commentId)
    } else {
      const otherBox = document.getElementById(`ban-${idx}`) as HTMLInputElement
      otherBox.checked = false
      deleteComment.delete(commentId)
      banAuthor.delete(commentId)
    }
  }
  console.log(deleteComment, banAuthor)
}

const toServer = () => {
  const banAuthorDto = [...banAuthor]
  const deleteCommentDto = [...deleteComment].filter((data) => !banAuthorDto.includes(data))

  console.log(deleteCommentDto, banAuthorDto)
}

const generateTempData = (): CommentResource[] => {
  const temp: CommentResource[] = []
  for (let i = 0; i < 100; i++) {
    temp.push({
      id: getRandomString(10),
      textOriginal: getRandomString(20),
      authorNickname: getRandomString(6),
    })
  }
  return temp
}

onMounted(async () => {
  observer.value = new IntersectionObserver(observerCallback, {
    root: scrollContainer.value,
    rootMargin: '0px',
    threshold: 1.0,
  })

  const temp = generateTempData()
  items.value.push(...temp)

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
.inf-scroll-root {
  display: flex;
  width: 100%;
}

.inf-scroll-root > div:first-child {
  flex: 1;
}
.inf-scroll-root > div:last-child {
  flex: 2;
}

.top-section {
  background: #ddd;
  position: sticky;
  top: 0;
}

.scroll-section {
  padding: 10px;
  padding-top: 0px;
  flex-grow: 1;
}
.scroll-container {
  display: flex;
  border: 1px solid #ddd;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
}
.item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  justify-content: space-between;
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

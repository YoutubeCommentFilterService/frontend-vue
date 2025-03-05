<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { tokenAxiosInstance } from '@/utils';
import type { CommentResource, CommentResponseData, PredictCategory } from "@/types/comment-interface";
import type { InterVideoListNComment } from "@/types/video-interface";
import InfiniteScroll from '@/components/InfiniteScroll.vue';

const state = history.state as InterVideoListNComment;
const authStore = useAuthStore();

const items = ref<CommentResource[]>([]);
const filteredItems = ref<CommentResource[]>([]);
const isLast = ref<boolean>(false);
const nicknameCategories = ref<string[]>([]);
const commentCategories = ref<string[]>([]);
const pageNum = ref<number>(1);
const selectedCategories = ref<{
    nickname: string[],
    comment: string[]
}>({ nickname: [], comment: []});

const generatePTageTitle = (category: string[], prob: number[]): string => {
    return category.map((cat, idx) => `${cat}: ${String(Math.round(prob[idx] * 100)).padStart(3, ' ')}%`).join(',')
}

const fetchComments = async (page: number, take: number = 100) => {
    if (!isLast.value) {
        const response = await tokenAxiosInstance.get<CommentResponseData>(`/api/youtube/videos/${state.video.id}`, {
            params: {
                page, take
            }
        })
        return response.data
    }
    return
}

const maxFetchNum = 100;
const loadMoreItem = async () => {
    try {
        const data = await fetchComments(pageNum.value, maxFetchNum)

        if (data) {
            isLast.value = data.isLast === 'Y' ? true : false;
            items.value = [...items.value, ...data.items];
            pageNum.value += 1
            filteredItems.value = items.value
            return true;
        }
        return false
    } catch (err) {
        console.error(err)
        return false;
    }
}

const toggleCategory = (type: 'comment' | 'nickname', category: string) => {
    const selected = selectedCategories.value[type];
    const index = selected.indexOf(category);

    if (index === -1) selected.push(category)
    else selected.splice(index, 1);

    filterDatas();
}

const filterDatas = () => {
    const categories = selectedCategories.value
    const isEmptyFilter: boolean = categories['comment'].length === 0 && categories['comment'].length === 0
    if (isEmptyFilter) {
        filteredItems.value = items.value
    }
    else {
        filteredItems.value = items.value.filter(data => {
            return isEmptyFilter || (
                categories['comment'].includes(data.commentPredict) || 
                categories['nickname'].includes(data.nicknamePredict)
            )
        })
    }

}

const isCategorySelected = (type: 'comment' | 'nickname', category: string): boolean => {
    return selectedCategories.value[type].includes(category);
}

onMounted(async () => {
    // if (!authStore.isLoggedIn) {
    //     alert("로그인을 먼저 해주세요")
    //     router.replace("/");
    // }

    const response = await tokenAxiosInstance.get<PredictCategory>('/api/metadata/predict-class')
    const categories = response.data

    nicknameCategories.value = categories.nicknameCategories.slice(1)
    commentCategories.value = categories.commentCategories.slice(1)
})

</script>

<template>
    <div class="comment-root-page">
        <div class="video-info">
            <img :src="state.video.thumbnail" class="video-thumbnail">
            <div class="video-details">
                <div class="video-detail-item">
                    <p class="label">동영상 제목</p>
                    <p class="content">{{ state.video.title }}</p>
                </div>
                <div class="video-detail-item">
                    <p class="label">동영상 설명</p>
                    <p class="content">{{ state.video.description }}</p>
                </div>
                <div class="video-detail-item">
                    <p class="label">업로드 일자</p>
                    <p class="content">{{ state.video.publishedAt }}</p>
                </div>
            </div>
        </div>
        <InfiniteScroll
            :is-last="isLast"
            :load-more-item="loadMoreItem"
            :refresh-item="() => {}"
            spinner-text="댓글 목록을 불러오는 중입니다!!"
        >
            <div class="scroll-top-section">
                <div v-if="nicknameCategories.length">
                    <span>닉네임</span>
                    <button 
                        v-for="(category, idx) in nicknameCategories" 
                        :key="idx"
                        @click="toggleCategory('nickname', category)"
                        :class="{ active: isCategorySelected('nickname', category)}"
                    >
                        {{ category }}
                    </button>
                </div>
                <div v-if="commentCategories.length">
                    <span>댓글</span>
                    <button 
                        v-for="(category, idx) in commentCategories" 
                        :key="idx"
                        @click="toggleCategory('comment', category)"
                        :class="{ active: isCategorySelected('comment', category)}"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>
            <div v-if="filteredItems.length > 0">
                <div v-for="(item, index) in filteredItems" :key="index" class="item">
                    <p> comment id: {{ item.id }}</p>
                    <p :title="generatePTageTitle(nicknameCategories, item.nicknameProb)"> {{ item.nickname }}({{ item.nicknamePredict }})</p>
                    <p :title="generatePTageTitle(commentCategories, item.commentProb)" class="meta"> {{ item.comment }}({{ item.commentPredict }})</p>
                </div>
            </div>
        </InfiniteScroll>
    </div>
</template>

<style scoped>
.comment-root-page {
    display: flex; 
    width: 100%;
    flex-direction: column;
}

.video-info {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
}

.video-thumbnail {
    display: flex;
    width: 320px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
}

.video-details {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
}

.video-detail-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.content {
  color: #555;
  margin: 0;
  word-wrap: break-word; /* 긴 텍스트를 부모 요소 안에서 줄 바꿈 */
  overflow: hidden;      /* 텍스트가 부모 요소를 넘지 않도록 숨기기 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 '...' 표시 */
}

@media (min-width: 1000px) {
    .comment-root-page {
        flex-direction: row;
    }

    .video-info {
        flex-direction: column;
        width: 400px;
        flex-shrink: 0;
        align-items: center;
        text-align: left;
    }
}

button {
  margin: 5px;
}

button.active {
  background-color: #007bff;
  color: white;
}

.item {
    position: relative;
    border: 1px solid #ff0000
}

ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }
li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
}

.trash-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  fill: #ff0000;
}

.trash-icon:hover {
    cursor: pointer;
}

.scroll-top-section {
    position: sticky; 
    top: 0; background-color: white; 
    z-index: 10;
}

.scroll-top-section > div {
    margin: 0;
    padding: 3px;
}

.scroll-top-section > div > span:first-child {
    display: inline-block;
    width: 60px;
}

.no-results {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    height: 100%;
    color: #7f8c8d;
    background-color: #ecf0f1;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
}

.no-results p {
    margin: 0;
    font-weight: bold;
    color: #bdc3c7;
}
</style>
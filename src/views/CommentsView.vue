<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted, ref } from 'vue';
import { tokenAxiosInstance } from '@/utils';
import type { CommentDeleteRequestData, CommentResource, CommentResponseData, PredictCategory } from "@/types/comment-interface";
import type { InterVideoListNComment } from "@/types/video-interface";
import InfiniteScroll from '@/components/InfiniteScroll.vue';

const state = history.state as InterVideoListNComment;
const authStore = useAuthStore();

const commentItems = ref<CommentResource[]>([]);
const filteredItems = ref<CommentResource[]>([]);
const isLast = ref<boolean>(false);
const nicknameCategories = ref<string[]>([]);
const commentCategories = ref<string[]>([]);
const pageNum = ref<number>(1);
const selectedCategories = ref<{
    nickname: string[],
    comment: string[]
}>({ nickname: [], comment: []});
const selectedCommentIds = ref<string[]>([]);
const selectedCommentCount = computed(() => selectedCommentIds.value.length)
const hasSelectedComments = computed(() => selectedCommentCount.value > 0)

const generatePTageTitle = (category: string[], prob: number[]): string => {
    return category.map((cat, idx) => `${cat}: ${String(Math.round(prob[idx] * 100)).padStart(3, ' ')}%`).join(',')
}

const fetchComments = async (page: number, take: number = 100, isLast: boolean = false) => {
    if (!isLast) {
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
        const data = await fetchComments(pageNum.value, maxFetchNum, isLast.value)

        if (data) {
            isLast.value = data.isLast === 'Y' ? true : false;
            commentItems.value = [...commentItems.value, ...data.items];
            pageNum.value += 1
            filteredItems.value = commentItems.value
            return true;
        }
        return false
    } catch (err) {
        console.error(err)
        return false;
    }
}

const refreshItem = async () => {
    try {
        const data = await fetchComments(1, maxFetchNum, false);
        if (data) {
            isLast.value = data.isLast === 'Y' ? true : false;
            commentItems.value = [...data.items];
            pageNum.value = 2;
            filteredItems.value = commentItems.value;
        }
    } catch (err) {
        console.error(err)
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
    const isEmptyFilter: boolean = categories['nickname'].length === 0 && categories['comment'].length === 0
    if (isEmptyFilter) {
        filteredItems.value = commentItems.value
    }
    else {
        filteredItems.value = commentItems.value.filter(data => {
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

const toggleItemSelection = (itemId: string) => {
    const index = selectedCommentIds.value.indexOf(itemId);
    if (index === -1) selectedCommentIds.value.push(itemId);
    else selectedCommentIds.value.splice(index, 1);
}

const selectAllItems = () => {
    filteredItems.value.forEach(item => {
        if (!selectedCommentIds.value.includes(item.id)) selectedCommentIds.value.push(item.id)
    })
}

const deselectAllItems = () => {
    selectedCommentIds.value = []
}

const deleteSelectedItems = async () => {
    selectedCommentIds.value.sort((a, b) => a.length - b.length)
    const [topLevelComments, replyComments] = selectedCommentIds.value.reduce(([top, reply], id) => {
        (id.length === 26 ? top : reply).push(id);
        return [top, reply];
    }, [[], []] as [string[], string[]]);

    const deleteTargetCommentIdsMap: Map<string, boolean> = new Map(topLevelComments.map(id => [id, true]));
    const re_replyComments = replyComments.filter(replyId => {
        const rootId = replyId.split(".")[0];
        return !deleteTargetCommentIdsMap.get(rootId)
    })
    re_replyComments.forEach(id => deleteTargetCommentIdsMap.set(id, true));

    const deleteCommentIds = [...topLevelComments, ...re_replyComments];
    await Promise.all(
        Array.from({ length: Math.ceil(deleteCommentIds.length / 50) }, (_, idx) => {
            const deleteCommentIdsArg = deleteCommentIds.slice(idx * 50, (idx + 1) * 50).join(',');
            return tokenAxiosInstance.delete('/api/youtube', {
                data: {
                    justDeleteComments: deleteCommentIdsArg,
                } as CommentDeleteRequestData
            })
        })
    )

    const filterItems = (items: CommentResource[]) => {
        return items.filter(item => {
            if (item.id.length === 26) {
                return !deleteTargetCommentIdsMap.get(item.id);
            } else {
                const rootId = item.id.split(".")[0];
                return !(deleteTargetCommentIdsMap.get(item.id) || deleteTargetCommentIdsMap.get(rootId));
            }
        })
    }

    commentItems.value = filterItems(commentItems.value);
    filteredItems.value = filterItems(filteredItems.value);
    selectedCommentIds.value = [];
}

onMounted(async () => {
    // if (!authStore.isLoggedIn) {
    //     alert("로그인을 먼저 해주세요")
    //     router.replace("/");
    // }

    const response = await tokenAxiosInstance.get<PredictCategory>('/api/metadata/predict-class')
    const categories = response.data

    nicknameCategories.value = categories.nicknameCategories
    commentCategories.value = categories.commentCategories
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
            :refresh-item="refreshItem"
            spinner-text="댓글 목록을 불러오는 중입니다!!"
        >
            <div class="scroll-top-section">
                <div class="categories-container">
                    <div v-if="nicknameCategories.length" class="category-section">
                        <div class="category-label">닉네임</div>
                        <div class="category-buttons">
                            <button 
                                v-for="(category, idx) in nicknameCategories.slice(1)" 
                                :key="idx"
                                @click="toggleCategory('nickname', category)"
                                :class="{ active: isCategorySelected('nickname', category)}"
                            >
                                {{ category }}
                            </button>
                        </div>
                    </div>
                    <div class="category-section-spacer"></div>
                    <div v-if="commentCategories.length" class="category-section">
                        <div class="category-label">댓글</div>
                        <div class="category-buttons">
                            <button 
                                v-for="(category, idx) in commentCategories.slice(1)" 
                                :key="idx"
                                @click="toggleCategory('comment', category)"
                                :class="{ active: isCategorySelected('comment', category)}"
                            >
                                {{ category }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="selection-controls">
                    <span>선택</span>
                    <button @click="selectAllItems" class="control-button select-all">전체 선택</button>
                    <button @click="deselectAllItems" class="control-button deselect-all">전체 해제</button>
                    <button 
                        @click="deleteSelectedItems" 
                        class="control-button delete"
                        :disabled="!hasSelectedComments"
                    >
                        선택 항목 삭제
                    </button>
                    <span v-if="selectedCommentCount > 0" class="selection-count">
                        {{ selectedCommentCount }}개 항목 선택됨
                    </span>
                </div>
            </div>
            <div v-if="filteredItems.length > 0">
                <div v-for="item in filteredItems" 
                    :key="item.id" 
                    class="item"
                    :class="{ 'item-selected': selectedCommentIds.includes(item.id), 'reply-comment': !item.isTopLevel }"
                    @click="toggleItemSelection(item.id)"
                >
                    <img :src="item.profileImage" width="75px" height="75px">
                    <div class="text-container">
                        <p :title="generatePTageTitle(nicknameCategories, item.nicknameProb)" class="tooltip-container"> {{ item.nickname }}({{ item.nicknamePredict }})</p>
                        <p :title="generatePTageTitle(commentCategories, item.commentProb)" class="tooltip-container meta"> {{ item.comment }}({{ item.commentPredict }})</p>
                    </div>
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
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #eeeeee;
}

.reply-comment {
    margin-left: 20px;
}

.item-selected {
    background-color: #f0f7ff;
    border-left: 3px solid #3b82f6;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #dddddd;
}

.item > .text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}

.item > img {
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #f3f3f3;
}

.text-container p {
    margin: 3px 0;
    cursor: default;
}

.tooltip-container::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 200px;
    padding: 10px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    white-space: pre-wrap;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.tooltip-container:hover::after {
    opacity: 1;
    visibility: visible;
}

.text-container p:first-child {
    font-weight: 600;
    font-size: 16px;
    color: #333;
}

.text-container .meta {
    font-size: 14px;
    color: #666;
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
    top: 0;
    background-color: white;
    z-index: 10;
    padding: 12px 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border-radius: 0 0 8px 8px;
}

.scroll-top-section > div {
    margin: 8px 0;
    padding: 5px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.scroll-top-section > div > span:first-child {
    display: inline-block;
    width: 60px;
    font-weight: 600;
    color: #333;
}

.scroll-top-section button {
    padding: 6px 12px;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #555;
}

.scroll-top-section button:hover {
    background-color: #eaeaea;
}

.scroll-top-section button.active {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.categories-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */
  scrollbar-width: thin; /* Firefox를 위한 설정 */
}

.category-section-spacer {
    display: flex;
    width: 20px;

}

.category-section {
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.category-buttons {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
}

.category-buttons::-webkit-scrollbar {
  display: none; /* Chrome, Safari에서 스크롤바 숨김 */
}

.category-buttons button {
  white-space: nowrap;
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

.selection-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    border-top: 1px solid #eee;
    margin-top: 8px;
}

.control-button {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.select-all, .deselect-all {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    color: #333;
}

.select-all:hover, .deselect-all:hover {
    background-color: #e9e9e9;
}

.delete {
    background-color: #f44336;
    color: white;
    border: 1px solid #f44336;
}

.delete:hover {
    background-color: #d32f2f;
}

.delete:disabled {
    background-color: #ffcdd2;
    border-color: #ffcdd2;
    cursor: not-allowed;
    opacity: 0.7;
}

.selection-count {
    margin-left: auto;
    font-size: 14px;
    color: #555;
    font-weight: 500;
}
</style>
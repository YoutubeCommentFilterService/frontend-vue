<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { tokenAxiosInstance } from '@/utils'
import type {
  CommentDeleteRequestData,
  CommentResource,
  CommentResponseData,
  DeleteCommentObject,
  PredictCategory,
} from '@/types/comment-interface'
import type { InterVideoListNComment } from '@/types/video-interface'
import InfiniteScroll from '@/components/InfiniteScroll.vue'
import CategorySelector from '@/components/comments-view/CategorySelector.vue'
import CommentSelectorBtn from '@/components/comments-view/CommentSelectorBtn.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useRouter } from 'vue-router'

const state = history.state as InterVideoListNComment
const authStore = useAuthStore()

const commentItems = ref<CommentResource[]>([])
const topLevelCommentIds = ref<Set<string>>(new Set<string>([]))
const filteredItems = ref<CommentResource[]>([])
const isLast = ref<boolean>(false)
const nicknameCategories = ref<string[]>([])
const commentCategories = ref<string[]>([])
const pageNum = ref<number>(1)
const isLoading = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const showWithdrawModal = ref<boolean>(false)
const selectedCategories = ref<{
  nickname: string[]
  comment: string[]
}>({ nickname: [], comment: [] })
const selectedCommentDict = ref<Record<string, string>>({})
const selectedCommentIds = computed(() => Object.keys(selectedCommentDict.value))
const selectedCommentCount = computed(() => selectedCommentIds.value.length)
const hasSelectedComments = computed(() => selectedCommentCount.value > 0)

const generatePTageTitle = (category: string[], prob: number[]): string => {
  return category
    .map((cat, idx) => `${cat}: ${String(Math.round(prob[idx] * 100)).padStart(3, ' ')}%`)
    .join(',')
}

const fetchComments = async (page: number, take: number = 100, isLast: boolean = false) => {
  isLoading.value = true
  if (!isLast) {
    const response = await tokenAxiosInstance.get<CommentResponseData>(
      `/api/youtube/videos/${state.video.id}`,
      {
        params: {
          page,
          take,
        },
      },
    )
    isLoading.value = false
    return response.data
  }
  isLoading.value = false
  return
}

const maxFetchNum = 100
const loadMoreItem = async () => {
  try {
    const data = await fetchComments(pageNum.value, maxFetchNum, isLast.value)

    if (data) {
      if (data.predictCommonResponse.code < 400) {
        isLast.value = data.isLast === 'Y' ? true : false
        commentItems.value = [...commentItems.value, ...data.items]
        pageNum.value += 1
        filteredItems.value = commentItems.value
        topLevelCommentIds.value = new Set([
          ...topLevelCommentIds.value, 
          ...data.items
            .filter(item => item.id.length === 26)
            .map(item => item.id)
        ])
        return true
      } else {
        isLast.value = true
        return true
      }
    }
    return false
  } catch (err) {
    console.error(err)
    return false
  }
}

const refreshItem = async () => {
  try {
    commentItems.value = filteredItems.value = []
    selectedCommentDict.value = {}
    const data = await fetchComments(1, maxFetchNum, false)
    if (data) {
      isLast.value = data.isLast === 'Y' ? true : false
      commentItems.value = [...data.items]
      pageNum.value = 2
      filteredItems.value = commentItems.value
    }
  } catch (err) {
    console.error(err)
  }
}

const toggleCategory = (type: 'comment' | 'nickname', category: string) => {
  const selected = selectedCategories.value[type]
  const index = selected.indexOf(category)

  if (index === -1) selected.push(category)
  else selected.splice(index, 1)

  filterDatas()
}

const filterDatas = () => {
  const categories = selectedCategories.value
  const isEmptyFilter: boolean =
    categories['nickname'].length === 0 && categories['comment'].length === 0
  if (isEmptyFilter) {
    filteredItems.value = commentItems.value
  } else {
    filteredItems.value = commentItems.value.filter((data) => {
      return (
        isEmptyFilter ||
        categories['comment'].includes(data.commentPredict) ||
        categories['nickname'].includes(data.nicknamePredict)
      )
    })
  }
}

const isCategorySelected = (type: 'comment' | 'nickname', category: string): boolean => {
  return selectedCategories.value[type].includes(category)
}

// TODO: 하위가 선택된 상태라도 상위를 선택 해제하면 전부 해제하게 해야 하는가?
// 이건 좀 고민해볼만 하다
const toggleItemSelection = (itemId: string, channelId: string) => {
  const id = selectedCommentDict.value[itemId]
  if (id) delete selectedCommentDict.value[itemId]
  else {
    const updateDict: Record<string, string> = {}
    updateDict[itemId] = channelId
    if (itemId.length === 26) {
      const filtered = commentItems.value.filter(x => x.id.startsWith(itemId))
      filtered.forEach(item => updateDict[item.id] = item.channelId)
    }
    selectedCommentDict.value = {
      ...selectedCommentDict.value,
      ...updateDict
    }
  }
}

const selectAllItems = () => {
  filteredItems.value.forEach((item) => {
    selectedCommentDict.value[item.id] = item.channelId
  })
}

const deselectAllItems = () => {
  selectedCommentDict.value = {}
}

const deleteSelectedItems = async () => {
  isDeleting.value = true
  const deleteTargetComments: DeleteCommentObject[] = []
  const [topLevelComments, replyComments] = selectedCommentIds.value.reduce(
    ([top, reply], id) => {
      ;(id.length === 26 ? top : reply).push(id)
      return [top, reply]
    },
    [[], []] as [string[], string[]],
  )

  const deleteTargetCommentIdsSet: Set<string> = new Set(topLevelComments)
  replyComments
    .filter((replyId) => {
      const rootId = replyId.split('.')[0]
      return !deleteTargetCommentIdsSet.has(rootId)
    })
    .forEach((id) => deleteTargetCommentIdsSet.add(id))

  deleteTargetCommentIdsSet.forEach((id) => {
    deleteTargetComments.push({
      commentId: id,
      channelId: selectedCommentDict.value[id],
    })
  })

  await Promise.all(
    Array.from({ length: Math.ceil(deleteTargetComments.length / 50) }, (_, idx) => {
      const deleteCommentsDto = deleteTargetComments.slice(idx * 50, (idx + 1) * 50)
      return tokenAxiosInstance.delete('/api/youtube', {
        data: {
          videoId: state.video.id,
          justDeleteComments: deleteCommentsDto,
        } as CommentDeleteRequestData,
      })
    }),
  )

  const filterItems = (items: CommentResource[]) => {
    return items.filter((item) => {
      if (item.id.length === 26) {
        return !deleteTargetCommentIdsSet.has(item.id)
      } else {
        const rootId = item.id.split('.')[0]
        return !(deleteTargetCommentIdsSet.has(item.id) || deleteTargetCommentIdsSet.has(rootId))
      }
    })
  }

  commentItems.value = filterItems(commentItems.value)
  filteredItems.value = filterItems(filteredItems.value)
  selectedCommentDict.value = {}
  isDeleting.value = false
}

const getLabel = (key: string) => {
  switch (key) {
    case 'title':
      return '동영상 제목'
    case 'description':
      return '동영상 설명'
    case 'publishedAt':
      return '업로드 일자'
    default:
      return 'default...'
  }
}

const { id, title, description, publishedAt } = state.video
const videoDetails = {
  title,
  publishedAt,
  // description,
}

const moveToYoutube = (baseUrl: string) => {
  window.open(`${baseUrl}/${id}`, '_blank', 'noopener,noreferrer')
}

const router = useRouter()
onMounted(async () => {
  if (!authStore.isLoggedIn) {
    alert('로그인을 먼저 해주세요')
    router.replace('/')
  }

  const response = await tokenAxiosInstance.get<PredictCategory>('/api/metadata/predict-class')
  const categories = response.data

  nicknameCategories.value = categories.nicknameCategories
  commentCategories.value = categories.commentCategories
})
</script>

<template>
  <div class="flex flex-col w-full md:flex-row">
    <div
      class="flex flex-row gap-5 p-5 pb-0 md:pb-3 justify-center md:flex-col md:w-[400px] md:flex-shrink-0 md:items-center md:text-left"
    >
      <!-- 스튜디오, 영상 각 각 이동 -->
      <div
        class="flex flex-row md:flex-col justify-around w-full text-white font-bold gap-2 md:gap-2"
      >
        <div class="relative flex items-center justify-center">
          <img :src="state.video.thumbnail" class="w-full h-auto object-cover rounded-lg" />
          <div class="absolute inset-0 flex items-start justify-end p-2">
            <img
              src="/imgs/youtube-studio-icon.svg"
              @click="() => moveToYoutube('https://studio.youtube.com/video')"
              class=".svg w-10 cursor-pointer"
              title="유튜브 스튜디오. 본인이 아니면 못들어가요!"
              alt="유튜브 스튜디오 링크"
            />
          </div>
        </div>
        <div class="flex flex-col overflow-hidden w-full">
          <div v-for="(value, key) in videoDetails" :key="key" class="flex flex-col">
            <p class="label text-base font-bold text-gray-800">{{ getLabel(key) }}</p>
            <p class="text-sm text-gray-600 mb-1 break-words overflow-hidden text-ellipsis">
              {{ value }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full h-full overflow-hidden">
      <div class="sticky top-0 z-10 px-4 shadow-md rounded-b-lg">
        <div class="flex items-center flex-wrap gap-2 my-2 py-1.5 overflow-x-auto">
          <CategorySelector
            :categoryArray="nicknameCategories.slice(1)"
            categoryName="닉네임"
            categoryType="nickname"
            :toggleCategory="toggleCategory"
            :isSelected="isCategorySelected"
          />
          <div class="flex w-5"></div>
          <CategorySelector
            :categoryArray="commentCategories.slice(1)"
            categoryName="댓글"
            categoryType="comment"
            :toggleCategory="toggleCategory"
            :isSelected="isCategorySelected"
          />
        </div>
        <div class="border-t border-[#eee] dark:border-[#999]"></div>
        <div class="flex items-center flex-wrap gap-2 my-2 py-1.5">
          <span class="inline-block w-10 font-semibold text-gray-800">선택</span>
          <div class="flex gap-2">
            <CommentSelectorBtn :onClick="selectAllItems" text="전체 선택" />
            <CommentSelectorBtn :onClick="deselectAllItems" text="전체 해제" />
            <button
              @click="() => (showWithdrawModal = true)"
              class="px-2 py-1 rounded text-sm transition-all duration-200 ease-in-out"
              :disabled="!hasSelectedComments"
              :class="{
                'bg-red-500 text-white border border-red-500 hover:bg-red-600 cursor-pointer ':
                  hasSelectedComments,
                'bg-red-100 border-red-100 cursor-not-allowed opacity-70 text-gray-400':
                  !hasSelectedComments,
              }"
            >
              선택 항목 삭제
            </button>
          </div>

          <span v-if="selectedCommentCount > 0" class="ml-auto text-sm text-gray-500 font-medium">
            {{ selectedCommentCount }}개 항목 선택됨
          </span>
        </div>
      </div>
      <InfiniteScroll
        :is-last="isLast"
        :load-more-item="loadMoreItem"
        :refresh-item="refreshItem"
        spinner-text="댓글 목록을 불러오는 중입니다!!"
      >
        <div class="flex h-full w-full">
          <div v-if="filteredItems.length > 0" class="flex-grow">
            <div
              v-for="item in filteredItems"
              :key="item.id"
              class="flex items-center gap-4 my-2 p-3 rounded-lg shadow-sm transition-all duration-300 ease-in-out border border-gray-200 transform hover:translate-y-[-2px] hover:shadow-lg hover:border-gray-300"
              :class="{
                'bg-blue-50 border-l-2 border-[#3b82f6] shadow-md': selectedCommentIds.includes(
                  item.id,
                ),
                'dark:bg-gray-400': !selectedCommentIds.includes(item.id),
                'ml-5': !item.isTopLevel && topLevelCommentIds.has(item.id.split('.')[0]),
              }"
              @click="toggleItemSelection(item.id, item.channelId)"
            >
              <img
                :src="item.profileImage"
                width="75px"
                height="75px"
                class="flex-shrink-0 rounded-full object-cover border-2 border-[#f3f3f3]"
              />
              <div
                class="flex flex-col justify-center flex-grow text-sm text-gray-800 cursor-default"
              >
                <p
                  :title="generatePTageTitle(nicknameCategories, item.nicknameProb)"
                  class="mb-0.5 font-semibold"
                >
                  {{ item.nickname }}({{ item.nicknamePredict }})
                </p>
                <p :title="generatePTageTitle(commentCategories, item.commentProb)" class="mb-0.5">
                  {{ item.comment }}({{ item.commentPredict }})
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="!isLoading && isLast && filteredItems.length === 0"
            class="flex flex-grow text-xl bg-[#ecf0f1] rounded-lg p-5 justify-center items-center"
          >
            <div class="m-0 font-bold text-[#bdc3c7] select-none">댓글이 존재하지 않습니다</div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
    <ConfirmModal
      v-model="showWithdrawModal"
      title="댓글 삭제"
      message="정말 댓글 삭제를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      confirm-text="삭제"
      @confirm="deleteSelectedItems"
    />
    <div
      v-show="isDeleting"
      class="absolute flex w-full h-full bg-gray-500 opacity-70 z-10 justify-center items-center"
    >
      <span class="text-3xl text-black opacity-100">댓글을 삭제하는 중입니다...</span>
    </div>
  </div>
</template>

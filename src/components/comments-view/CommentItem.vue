<template>
  <div
    class="flex items-center gap-4 my-2 p-3 rounded-lg shadow-sm transition-all duration-300 ease-in-out border border-gray-200 transform hover:translate-y-[-2px] hover:shadow-lg hover:border-gray-300"
    :class="{
      'bg-blue-50 border-l-2 border-[#3b82f6] shadow-md': isSelected,
      'dark:bg-gray-400': !isSelected,
      'ml-5': !item.isTopLevel && isExistTopLevelComment,
    }"
  >
    <img
      :src="item.profileImage"
      width="75px"
      height="75px"
      class="flex-shrink-0 rounded-full object-cover border-2 border-[#f3f3f3]"
    />
    <div class="flex flex-col justify-center flex-grow text-sm text-gray-800 cursor-default">
      <p
        :title="generateHoverTitle(category.nickname, item.nicknameProb)"
        class="mb-0.5 font-semibold"
      >
        {{ item.nickname }}({{ item.nicknamePredict }})
      </p>
      <p :title="generateHoverTitle(category.comment, item.commentProb)" class="mb-0.5">
        {{ item.comment }}({{ item.commentPredict }})
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentResource } from '@/types/comment-interface'
defineProps<{
  item: CommentResource
  isSelected: boolean
  isExistTopLevelComment: boolean
  category: { nickname: string[]; comment: string[] }
}>()

const generateHoverTitle = (category: string[], prob: number[]): string => {
  return category
    .map((cat, idx) => `${cat}: ${String(Math.round(prob[idx] * 100)).padStart(3, ' ')}%`)
    .join(',')
}
</script>

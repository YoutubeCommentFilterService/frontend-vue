<script setup lang="ts">
import { computed, ref } from "vue";

const MAX_LEFT_RIGHT_NUM = 2;

const props = defineProps<{
    totalPages: number,
}>()

const currentPage = ref<number>(0)
const currentPageModel = defineModel('currentPage', { type: Number, default: 1 });

const visiblePages = computed(() => {
    const pages = [];

    if (props.totalPages <= MAX_LEFT_RIGHT_NUM * 2 + 1) {
        for (let i = 1; i <= props.totalPages; i++)
            pages.push(i);
    } else {
        if (currentPage.value <= MAX_LEFT_RIGHT_NUM * 2) {
            for (let i = 1; i <= currentPage.value + MAX_LEFT_RIGHT_NUM; i++)
                pages.push(i)
            pages.push('...', props.totalPages)
        } else if (currentPage.value >= props.totalPages - (MAX_LEFT_RIGHT_NUM * 2 - 1 )) {
            pages.push(1, '...')
            for (let i = currentPage.value - MAX_LEFT_RIGHT_NUM; i <= props.totalPages; i++)
                pages.push(i)
        } else {
            pages.push(1, '...')
            for (let i = currentPage.value - MAX_LEFT_RIGHT_NUM; i <= currentPage.value + MAX_LEFT_RIGHT_NUM; i++)
                pages.push(i)
            pages.push('...', props.totalPages)
        }
    }
    return pages;
})

const gotoPage = (page: number | string) => {
    if (typeof page === 'string') return;
    if (page <= 0 || page > props.totalPages) return
    currentPage.value = page
    currentPageModel.value = page
}

</script>

<template>
<div class="select-none">
    <button 
        @click="gotoPage(1)" 
        :disabled="currentPage <= 1 " 
        :class="{ 'cursor-pointer': currentPage > 1}"
        class="w-[20px] h-[40px]"
    >
        «
    </button>
    <button 
        @click="gotoPage(currentPage-1)" 
        :disabled="currentPage <= 1" 
        :class="{ 'cursor-pointer': currentPage > 1}"
        class="w-[20px] h-[40px]"
    >
        ‹
    </button>

    <span v-for="page in visiblePages" :key="page">
        <button
            v-if="page !== '...'"
            @click="gotoPage(page)"
            :disabled="page === currentPage"
            :class="{ 'bg-gray-100': page === currentPage, 'cursor-pointer': currentPage !== page }"
            class="mx-1 w-[40px] h-[40px] rounded-full"
        > {{ page }}</button>
        <span v-else class="mx-1 w-[40px] h-[40px]">...</span>
    </span>

    <button 
        @click="gotoPage(currentPage+1)" 
        :disabled="currentPage === totalPages || currentPage === 0" 
        :class="{ 'cursor-pointer': currentPage < totalPages}"
        class="w-[20px] h-[40px]"
    >
        ›
    </button>
    <button 
        @click="gotoPage(totalPages)" 
        :disabled="currentPage === totalPages || currentPage === 0" 
        :class="{ 'cursor-pointer': currentPage < totalPages}"
        class="w-[20px] h-[40px]"
    >
        »
    </button>
</div>
</template>
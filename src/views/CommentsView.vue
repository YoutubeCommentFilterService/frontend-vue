<script setup lang="ts">
import Comment from '@/components/Comment.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const params = history.state;
const videoId: string = params.videoId as string;
const authStore = useAuthStore();

const generateFilterData = (value: string): string => {
    const filterData = [{
        name: "CONTENT",
        value: {
            name: "FOR",
            value,
        }
    }];
    return `filter=${encodeURIComponent(JSON.stringify(filterData))}`;
}

const onCommentClick = (videoId: string, value: string) => {
    const queryData = generateFilterData(value);
    const uri = `https://studio.youtube.com/video/${videoId}/comments/inbox?${queryData}`;

    window.open(uri, '_blank');
}

onMounted(() => {
    if (!authStore.isLoggedIn) {
        alert("로그인을 먼저 해주세요")
        router.replace("/");
    }
})

</script>

<template>
    <Comment :videoId="videoId">
        <template #item="{authorNickname, textOriginal}">
            <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="trash-icon" @click="() => onCommentClick(videoId, textOriginal)">
                    <path d="M3 6L5 6L21 6L21 8L5 8L5 20C5 20.55 5.45 21 6 21H18C18.55 21 19 20.55 19 20V8L21 8L21 6L3 6Z"/>
                </svg>
                <p> {{ authorNickname }}</p>
                <p class="meta"> {{ textOriginal }}</p>
            </div>
        </template>
    </Comment>
</template>

<style scoped>
.item {
    position: relative;
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
</style>
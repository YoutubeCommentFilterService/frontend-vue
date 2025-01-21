<script setup lang="ts">
import type { CommentResource, CommentResponseData } from "@/types/comment-interface";
import axios from "axios";
import { onMounted, ref } from "vue";

const props = defineProps<{
    videoId: string;
}>()

const items = ref<CommentResource[]>([]);
const isLast = ref<boolean>(false);

const fetchComments = async (): Promise<CommentResponseData> => {
    const response = await axios.get<CommentResponseData>(`http://localhost:8080/api/youtube/${props.videoId}`, {
        withCredentials: true,
        params: {
            page: 1,
            take: 100,
        }
    })
    return response.data;
}


onMounted(() => {
    fetchComments()
        .then((data) => {
            isLast.value = data.isLast;
            items.value = [...items.value, ...data.items];
        })
        .catch((err) => console.log(err));
})

</script>

<template>
    <ul>
        <li v-if="!items.length">
            Loading..
        </li>
        <li v-for="(item, idx) in items" :key="idx">
            <slot name="item" v-bind="item" />
        </li>
    </ul>
</template>
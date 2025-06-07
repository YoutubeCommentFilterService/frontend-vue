<script setup lang="ts">
import { ref } from 'vue';
import { UserInfo } from '@/types/user-info-interface.ts';
import HandleUserModal from '@/components/admin/HandleUserModal.vue'

interface CustomProp extends UserInfo {
    activeId: string
}

const props = defineProps<CustomProp>()
</script>

<template>
    <tr class="border-solid border-b-1">
        <!-- Profile Image -->
        <td class="py-2">
            <div class="flex items-center justify-center">
                <img :src="props.imageUrl" class="rounded-full size-10 text-center">
            </div>
        </td>

        <!-- Nickname Handler -->
        <td class="content-center py-2">
            <p class="w-60 text-center">{{ props.channelName }} || {{ props.handler }}</p>
        </td>

        <!-- Email -->
        <td class="content-center py-2">
            <p class="w-80 text-center">{{ props.email }}</p>
        </td>

        <!-- User Handle Button -->
        <td class="content-center py-2">
            <div class="flex items-center justify-center relative">
                <button data-btn class="cursor-pointer" :id="props.channelId">
                    {{ props.role }}
                </button>
                <!-- <HandleUserModal :id="props.channelId" v-if="isClicked"/> -->
            </div>
        </td>
    </tr>
</template>
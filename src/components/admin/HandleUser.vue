<script setup lang="ts">
import type { UserInfo } from '@/types/user-info-interface';

defineProps<UserInfo>()
</script>

<template>
    <tr class="border-solid border-b-1">
        <!-- Profile Image -->
        <td class="py-2">
            <div class="flex items-center justify-center">
                <img :src="imageUrl" class="rounded-full size-10 text-center">
            </div>
        </td>

        <!-- Nickname Handler -->
        <td class="content-center py-2">
            <p class="w-60 text-center">{{ channelName }} / {{ handler || 'NO_HANDLER' }}</p>
        </td>

        <!-- Email -->
        <td class="content-center py-2">
            <p class="w-80 text-center">{{ email }}</p>
        </td>

        <!-- User Handle Button -->
        <td class="content-center py-2">
            <div class="flex items-center justify-center relative">
                <button data-btn class="cursor-pointer" :id="`${userId},${channelId || ''}`">
                    {{ role }}
                </button>
            </div>
        </td>
    </tr>
</template>
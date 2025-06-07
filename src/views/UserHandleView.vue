<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import HandleUser from '@/components/admin/HandleUser.vue';
import PageNavigator from '@/components/Commons/PageNavigator.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { UserInfo, UserInfoResponseData } from '@/types/user-info-interface';
import { tokenAxiosInstance } from '@/utils';

const authStore = useAuthStore()

if (!authStore.isLoggedIn || "ADMIN" != authStore.profile.role) {
    console.log('not logged in or authenticated: ', authStore.profile.role)
}

const currentPage = ref<number>(1)
const totalPage = ref<number>(1)
const totalMembers = ref<number>(1)
const popupModalId = ref<string>('')
const popupPosition = ref({x: 0, y: 0})
const showWithdrawModal = ref<boolean>(false)

const items = ref<UserInfo[]>([])

const fetchUserData = async () => {
    const data = (
            await tokenAxiosInstance.get<UserInfoResponseData>('/api/admin/users', {
            params: {
                page: currentPage.value,
                take: 10,
            }
        })
    ).data;

    console.log(data)

    totalPage.value = data.totalPages;
    totalMembers.value = data.totalMembers;

    items.value = data.members;
}

const handleClickOutside = (event: MouseEvent) => {
    event.stopPropagation()

    const target = (event.target as HTMLElement).closest('[data-popup]')
    if (!target) {
        popupModalId.value = '';
    }
}

const handleClickHandlerButton = (event: MouseEvent) => {
    event.stopPropagation()

    const target = event.target as HTMLElement
    const targetParentBtn = target.closest('[data-btn]')
    if (targetParentBtn) {
        const rect = targetParentBtn.getBoundingClientRect()
        popupModalId.value = targetParentBtn.id;
        popupPosition.value = {
            x: rect.right - 2,
            y: rect.top + 10
        }
    }
}


const confirmWithdraw = async () => {
    await tokenAxiosInstance.delete('/api/admin', {
        params: {
            channelId: popupModalId.value
        }
    })
    
    fetchUserData();
}
const temp = () => {
    console.log(popupModalId.value)
    window.open(`https://youtube.com/channel/${popupModalId.value}`, 'popupWindow')
}

onMounted(() => {
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('click', handleClickHandlerButton)
    fetchUserData();
})

onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('click', handleClickHandlerButton)
})

</script>

<template>
    <div class="flex overflow-y-auto flex-1 flex-col items-center">
        <div class="py-2 flex-1">
            <table
                class="text-sm select-none"
                :class="{'h-full': items.length === 0}"
            >
                <thead class="border-solid border-b-2">
                    <tr>
                        <th class="px-6 py-2">프로필</th>
                        <th class="px-6 py-2 w-60">이름 / 핸들러</th>
                        <th class="px-6 py-2 w-80">이메일</th>
                        <th class="px-6 py-2">행동</th>
                    </tr>
                </thead>
                <tbody v-if="items.length > 0">
                    <HandleUser 
                        v-for="(item, idx) in items" 
                        :key="idx" 
                        v-bind="item" 
                        :active-id="popupModalId"
                    />
                </tbody>
                <tbody v-else class="flex-1">
                    <tr>
                        <td colspan="4" class="text-center h-full">
                            데이터가 없습니다.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="py-2">
            <PageNavigator 
                :total-pages="totalPage"
                v-model:current-page="currentPage"
            />
        </div>

        <div 
            class="fixed left-full top-1/2 -translate-y-1/2 ml-2 w-32 bg-amber-950 text-white rounded shadow z-50" 
            :style="`top: ${popupPosition.y}px; left: ${popupPosition.x}px`"
            data-popup
            v-if="popupModalId !== ''"
        >
            <ul class="select-none">
                <li @click="temp" class="py-2 cursor-pointer">
                    채널로
                </li>
                <li @click="() => {showWithdrawModal = true}" class="py-2 cursor-pointer">
                    회원탈퇴
                </li>
            </ul>
        </div>

        <ConfirmModal 
            title='유저 삭제'
            message='유저를 삭제하겠습니까?'
            @confirm="confirmWithdraw"
            v-model="showWithdrawModal"
            id="admin-member-withdraw"
        />
    </div>
</template>
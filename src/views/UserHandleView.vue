<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import HandleUser from '@/components/admin/HandleUser.vue'
import PageNavigator from '@/components/Commons/PageNavigator.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { UserInfo, UserInfoResponseData } from '@/types/user-info-interface'
import { tokenAxiosInstance } from '@/utils/axios-instance'
import { debounce } from 'lodash'
import type { AvailableRoles } from '@/types/available-roles-interface'

interface updateTarget {
  channelId: string
  userId: string
  role: string
}

const authStore = useAuthStore()

if (!authStore.isLoggedIn || 'ADMIN' != authStore.profile.role) {
  console.log('not logged in or authenticated: ', authStore.profile.role)
}

const currentPage = ref<number>(1)
const totalPaged = ref({
  totalPages: 1,
  totalMembers: 1,
})
const updateTarget = ref<updateTarget | null>(null)
const popupPosition = ref({ x: 0, y: 0 })
const showWithdrawModal = ref<boolean>(false)
const items = ref<UserInfo[]>([])
const searchChannelName = ref<string>('')
const availableRoles = ref<string[]>()

const fetchUserData = async () => {
  const { data } = await tokenAxiosInstance.get<UserInfoResponseData>('/api/admin/users', {
    params: {
      page: currentPage.value,
      take: 10,
      channelName: searchChannelName.value,
    },
  })

  totalPaged.value = {
    totalPages: data.totalPages,
    totalMembers: data.totalMembers,
  }
  items.value = data.members
}

const fetchAvailableRoles = async () => {
  const { data } = await tokenAxiosInstance.get<AvailableRoles>('/api/admin/roles')
  availableRoles.value = data.availableRoles
}

const handleClickOutside = (event: MouseEvent) => {
  // event.stopPropagation()

  const target = (event.target as HTMLElement).closest('[data-popup]')
  if (!target) {
    updateTarget.value = null
  }
}

const handleClickHandlerButton = (event: MouseEvent) => {
  // event.stopPropagation()

  const targetParentBtn = (event.target as HTMLElement).closest('[data-btn]')
  if (targetParentBtn) {
    const rect = targetParentBtn.getBoundingClientRect()
    const [userId, channelId] = targetParentBtn.id.split(',')
    updateTarget.value = {
      channelId,
      userId,
      role: targetParentBtn.innerHTML,
    }

    popupPosition.value = {
      x: rect.right - 2,
      y: rect.top + 10,
    }
  }
}

const handleUpdateRole = async (event: MouseEvent) => {
  const targetBtn = event.target as HTMLElement
  const role = targetBtn.innerText

  if (updateTarget.value == null) return

  try {
    const response = await tokenAxiosInstance.patch('/api/admin/member/role', {
      userId: updateTarget.value.userId,
      role: role,
    })

    if (response.status === 200) {
      items.value = items.value.map((item) => {
        if (item.userId !== updateTarget.value!.userId) return item
        item.role = role
        return item
      })
      updateTarget.value.role = role
    }
  } catch (err) {
    if (import.meta.env.VITE_IS_DEV === 't') console.error(err)
  }
}

const confirmWithdraw = async () => {
  await tokenAxiosInstance.delete('/api/admin/member', {
    params: updateTarget.value,
  })

  fetchUserData()
  updateTarget.value = null
}

const redirectToChannel = () => {
  if (!updateTarget.value?.channelId) return
  window.open(`https://youtube.com/channel/${updateTarget.value.channelId}`, 'popupWindow')
}

const searchWithChangedTargetChannelName = debounce((val) => {
  currentPage.value = 1
  searchChannelName.value = val
  fetchUserData()
}, 1000)

watch(currentPage, () => {
  fetchUserData()
})
watch(searchChannelName, (newVal) => {
  searchWithChangedTargetChannelName(newVal)
})

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('click', handleClickHandlerButton)
  fetchAvailableRoles()
  fetchUserData()
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('click', handleClickHandlerButton)
})
</script>

<template>
  <div class="flex overflow-y-auto flex-1 flex-col items-center">
    <div class="mt-3">
      <label for="search-nickname" class="font-medium text-gray-900 dark:text-whit select-none"
        >검색:
      </label>
      <input
        v-model="searchChannelName"
        type="text"
        id="search-nickname-field"
        autocomplete="false"
        class="p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="py-2 flex-1">
      <table class="text-sm select-none" :class="{ 'h-full': items.length === 0 }">
        <thead class="border-solid border-b-2">
          <tr>
            <th class="px-6 py-2">프로필</th>
            <th class="px-6 py-2 w-60">이름 / 핸들러</th>
            <th class="px-6 py-2 w-80">이메일</th>
            <th class="px-6 py-2">행동</th>
          </tr>
        </thead>
        <tbody v-if="items.length > 0">
          <HandleUser v-for="item in items" :key="item.userId" v-bind="item" />
        </tbody>
        <tbody v-else class="flex-1">
          <tr>
            <td colspan="4" class="text-center h-full">데이터가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="py-2">
      <PageNavigator :total-pages="totalPaged.totalPages" v-model:current-page="currentPage" />
    </div>

    <div
      class="fixed left-full top-1/2 -translate-y-1/2 ml-2 w-32 bg-amber-950 text-white rounded shadow z-50"
      :style="`top: ${popupPosition.y}px; left: ${popupPosition.x}px`"
      data-popup
      v-if="updateTarget"
    >
      <ul class="select-none">
        <li @click="redirectToChannel" class="py-2 cursor-pointer">채널로</li>
        <li
          @click="
            () => {
              showWithdrawModal = true
            }
          "
          class="py-2 cursor-pointer"
        >
          회원탈퇴
        </li>
        <li class="py-2" v-if="updateTarget.role != 'UNLINKED'">
          권한 변경
          <div class="bg-gray-500 py-0.5 divide-y grid grid-cols-1 content-center">
            <button
              v-for="role in availableRoles?.filter((role) => role != updateTarget?.role)"
              :key="role"
              class="text-black block cursor-pointer text-center"
              @click="handleUpdateRole"
            >
              {{ role }}
            </button>
          </div>
        </li>
      </ul>
    </div>

    <ConfirmModal
      title="유저 삭제"
      message="유저를 삭제하겠습니까?"
      @confirm="confirmWithdraw"
      v-model="showWithdrawModal"
      id="admin-member-withdraw"
    />
  </div>
</template>

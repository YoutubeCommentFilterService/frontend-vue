interface UserInfo {
    handler?: string | null;
    channelId?: string | null;
    email: string;
    imageUrl: string;
    channelName?: string | null;
    role: string;
    userId: string;
}

interface UserInfoResponseData {
    totalPages: number;
    totalMembers: number;
    members: UserInfo[];
}

export type { UserInfo, UserInfoResponseData }
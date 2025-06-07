interface UserInfo {
    handler: string;
    channelId: string;
    email: string;
    imageUrl: string;
    channelName: string;
    role: string;
}

interface UserInfoResponseData {
    totalPages: number;
    totalMembers: number;
    members: UserInfo[];
}

export type { UserInfo, UserInfoResponseData }
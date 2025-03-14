interface AfterLoginDto extends UserProfile {
    refreshToken: string;
}

interface UserProfile {
    nickname: string;
    profileImage: string;
}

export type { AfterLoginDto, UserProfile };
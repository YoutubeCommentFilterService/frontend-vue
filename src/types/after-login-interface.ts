interface AfterLoginDto extends UserProfile {
    refreshToken: string;
}

interface UserProfile {
    nickname: string;
    profileImage: string;
    hasYoutubeAccess: boolean;
}

interface IsNewMember {
    isNewMember: boolean;
}

export type { AfterLoginDto, UserProfile, IsNewMember };
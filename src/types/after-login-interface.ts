interface AfterLoginDto extends UserProfile {
    refreshToken: string;
}

interface UserProfile {
    nickname: string;
    profileImage: string;
}

interface IsNewMember {
    isNewMember: boolean;
}

export type { AfterLoginDto, UserProfile, IsNewMember };
interface AfterLoginDto extends UserProfile {
  refreshToken: string
}

interface UserProfile {
  nickname: string
  profileImage: string
  hasYoutubeAccess: boolean
  role: string
  refreshToken: string
}

interface IsNewMember {
  isNewMember: boolean
}

export type { AfterLoginDto, UserProfile, IsNewMember }

interface HotVideoData {
  videoId: string
  title: string
  description: string
  tags: string[]
  publishedAt: string
  thumbnailUrl: string
  viewCount: string

  channelId: string
  channelTitle: string
  channelHandler: string
  channelThumbnailUrl: string
  subscriberCount: string
}

interface HotVideoDisplayResource {
  [key: string]: {
    items: HotVideoData[]
    key: number
  }
}

interface HotVideosResponse {
  baseTime: string
  itemMap: HotVideoDisplayResource
}

export type { HotVideoData, HotVideoDisplayResource as CommentDisplayResource, HotVideosResponse }

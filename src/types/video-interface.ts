interface VideoResource {
    videoId: string;
    videoTitle: string;
    videoThumb: string;
    publishedAt: string;
}

interface VideoResponseData {
    isLast: boolean;
    totalResoult: number;
    videoResources: VideoResource[];
}

export type { VideoResource, VideoResponseData };
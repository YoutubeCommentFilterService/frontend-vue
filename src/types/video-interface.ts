interface VideoResource {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    description: string;
}

interface VideoResponseData {
    isLast: string;
    items: VideoResource[];
}

interface InterVideoListNComment {
    video: {
        id: string;
        title: string;
        thumbnail: string;
        description: string;
        publishedAt: string;
    }
}

export type { VideoResource, VideoResponseData, InterVideoListNComment };
interface VideoResource {
    id: string;
    title: string;
    thumbnail: string;
    // JAVA에 ObjectMapper 변경으로 LocalDateTime이 배열로 넘어오게 되었다
    publishedAt: string[];
    description: string;
    privacy: string;
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
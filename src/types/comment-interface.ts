interface CommentResource {
    id: string;
    comment: string;
    nickname: string;
    commentPredict: string;
    nicknamePredict: string;
}

interface CommentResponseData {
    isLast: boolean;
    items: CommentResource[];
}

export type { CommentResource, CommentResponseData };
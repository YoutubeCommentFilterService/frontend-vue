interface CommentResource {
    id: string;
    textOriginal: string;
    authorNickname: string;
}

interface CommentResponseData {
    isLast: boolean;
    items: CommentResource[];
}

export type { CommentResource, CommentResponseData };
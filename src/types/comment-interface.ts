interface CommentResource {
    id: string;
    profileImage: string;
    comment: string;
    nickname: string;
    isTopLevel: boolean;
    commentPredict: string;
    nicknamePredict: string;
    nicknameProb: number[];
    commentProb: number[];
}

interface PredictCategory {
    commentCategories: string[];
    nicknameCategories: string[];
}

interface CommentResponseData {
    isLast: string;
    items: CommentResource[];
}

interface CommentDeleteRequestData {
    justDeleteComments?: string;
    authorBanComments?: string;
}

export type { CommentResource, CommentResponseData, PredictCategory, CommentDeleteRequestData };
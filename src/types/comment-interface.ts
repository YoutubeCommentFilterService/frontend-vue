interface CommentResource {
    id: string;
    comment: string;
    nickname: string;
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

export type { CommentResource, CommentResponseData, PredictCategory };
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
    commentPredictCategory: string[];
    nicknamePredictCategory: string[];
}

interface CommentResponseData {
    isLast: boolean;
    items: CommentResource[];
    predictCategory: PredictCategory;
}

export type { CommentResource, CommentResponseData, PredictCategory };